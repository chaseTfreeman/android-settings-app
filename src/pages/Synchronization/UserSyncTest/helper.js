import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import {
    apiFetchOU,
    apiFetchOUSearch,
    apiFetchProgramRulesBasic,
} from './syncQueries'

export const runUserTest = (user, dataEngine) => {
    /*
     * get org unit search
     * get org unit capture
     * get programs
     * get program rules
     * get data sets
     * get reserved values
     *
     * get metadata size
     * get data size
     * **/

    getTestElements(user, dataEngine).then(result => {
        console.log('result after then', { result })
    })

    console.log('result')
}

const getSearchOrgUnit = (orgUnits, dataEngine) => {
    const orgUnitPromises = []
    const orgUnitSearch = []
    orgUnits.map(orgUnit =>
        orgUnitPromises.push(apiFetchOUSearch(dataEngine, orgUnit.id))
    )

    return Promise.all(orgUnitPromises).then(result => {
        result.map(ouList => ouList.map(ou => orgUnitSearch.push(ou)))
        return uniqBy(orgUnitSearch, 'id').length
    })
}

const getOrgUnit = (orgUnits, dataEngine) => {
    const orgUnitPromises = []
    const orgUnitCapture = []
    orgUnits.map(orgUnit =>
        orgUnitPromises.push(apiFetchOU(dataEngine, orgUnit.id))
    )

    return Promise.all(orgUnitPromises).then(result => {
        result.map(ouList => ouList.map(ou => orgUnitCapture.push(ou)))
        const uniqOrgUnit = uniqBy(orgUnitCapture, 'id')
        const orgUnitId = []
        uniqOrgUnit.map(ou => orgUnitId.push(ou.id))

        const programList = []
        uniqOrgUnit.map(ou =>
            ou.programs.map(program => programList.push(program.id))
        )

        const dataSetList = []
        uniqOrgUnit.map(ou =>
            ou.dataSets.map(dataSet => dataSetList.push(dataSet.id))
        )

        return {
            orgUnit: {
                total: uniqOrgUnit.length,
                idList: orgUnitId,
            },
            program: {
                total: uniq(programList).length,
                idList: uniq(programList),
            },
            dataSet: {
                total: uniq(dataSetList).length,
                idList: uniq(dataSetList),
            },
        }
    })
}

const getProgramRules = (programs, dataEngine) => {
    const programRulesPromises = []
    const programRules = []
    programs.map(program =>
        programRulesPromises.push(
            apiFetchProgramRulesBasic(dataEngine, program)
        )
    )

    return Promise.all(programRulesPromises).then(result => {
        result.map(programRuleList =>
            programRuleList.map(programRule =>
                programRules.push(programRule.id)
            )
        )
        return uniq(programRules)
    })
}

const getTestElements = async (user, dataEngine) => {
    const orgUnits = user.organisationUnits
    const orgUnitsSearch = user.teiSearchOrganisationUnits

    let totalSearch = 0
    let orgUnit = {}
    let program = {}
    let dataSet = {}
    let programRule = {}

    await getSearchOrgUnit(orgUnitsSearch, dataEngine).then(result => {
        totalSearch = result
    })

    await getOrgUnit(orgUnits, dataEngine).then(result => {
        orgUnit = { ...result.orgUnit }
        program = { ...result.program }
        dataSet = { ...result.dataSet }
    })

    await getProgramRules(program.idList, dataEngine).then(programRules => {
        programRule = {
            total: programRules.length,
            idList: programRules,
        }
    })

    return {
        orgUnitSearch: totalSearch,
        orgUnit,
        program,
        programRule,
        dataSet,
    }
}

const getMetadataSize = () => {}

const getDataSize = () => {}
