import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import without from 'lodash/without'
import {
    apiFetchOU,
    apiFetchOUSearch,
    apiFetchProgramRulesBasic,
} from './syncQueries'
import { getMetadataSize } from './getMetadata'

export const runUserTest = async (user, dataEngine) => {
    /*
     * get org unit search
     * get org unit capture
     * get programs -->
     * using program query: trackedEntityType (get: TrackedEntityAttribute),
     * using programId = programRules, programStages (get: DataElements (optionSet --> oprion --> optionGroup), TrackedEntityInstanceAttributes), TrackedEntityInstanceFilters, EventFilters
     * get program rules
     * get data sets (DataSetElement --> dataElement --> optionSet --> option
     * categoryCombo --> category --> categoryOptions
     * using dataset id: validationRules
     * get reserved values
     *
     * get metadata size
     * get data size
     * **/

    let orgUnitSearch = 0
    let orgUnit = {}
    let programs = {}
    let dataSets = {}
    let programRules = {}

    await getTestElements(user, dataEngine).then(result => {
        console.log('result after then', { result })
        orgUnitSearch = result.orgUnitSearch
        orgUnit = result.orgUnit
        programs = result.program
        dataSets = result.dataSet
        programRules = result.programRule
    })

    await getMetadataSize({
        dataEngine,
        orgUnitList: orgUnit.idList,
        programList: programs.idList,
        trackedEntityTypeList: programs.trackedEntityTypeList,
        teaList: programs.trackedEntityAttribute,
        optionSetList: programs.optionSet,
    })

    return {
        orgUnitSearch,
        orgUnitCapture: orgUnit.total,
        programs: programs.total,
        dataSets: dataSets.total,
        programRules: programRules.total,

        metadata: '',
        data: '',
    }
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
        const optionSetId = []
        const trackedEntityTypeId = []
        const trackedEntityAttributeId = []
        uniqOrgUnit.map(ou => orgUnitId.push(ou.id))

        const programList = []
        uniqOrgUnit.map(ou =>
            ou.programs.map(program => {
                programList.push(program.id)
                trackedEntityTypeId.push(
                    program.trackedEntityType && program.trackedEntityType.id
                )
                if (program.programTrackedEntityAttributes) {
                    program.programTrackedEntityAttributes.map(tea => {
                        trackedEntityAttributeId.push(tea.id)
                        optionSetId.push(
                            tea.trackedEntityAttribute.optionSet &&
                                tea.trackedEntityAttribute.optionSet.id
                        )
                    })
                }
                //console.log({program})
            })
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
                trackedEntityType: uniq(
                    without(trackedEntityTypeId, undefined)
                ),
                trackedEntityAttribute: uniq(
                    without(trackedEntityAttributeId, undefined)
                ),
                optionSet: uniq(without(optionSetId, undefined)),
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

export const getSize = element => Buffer.byteLength(JSON.stringify(element))

const getDataSize = () => {}
