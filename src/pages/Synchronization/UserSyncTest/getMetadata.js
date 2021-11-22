import {
    apiFetchEventFilters,
    apiFetchOptionGroup,
    apiFetchOptions,
    apiFetchOptionSet,
    apiFetchOrgUnit,
    apiFetchOULevel,
    apiFetchProgram,
    apiFetchProgramRule,
    apiFetchProgramStage,
    apiFetchRelationshipTypes,
    apiFetchTrackedEntityAttributes,
    apiFetchTrackedEntityInstanceFilter,
    apiFetchTrackedEntityType,
} from './metadataQueries'
import { getSize } from './helper'

export const getMetadataSize = async ({
    dataEngine,
    orgUnitList,
    programList,
    trackedEntityTypeList,
    teaList,
    optionSetList,
}) => {
    await apiFetchOULevel(dataEngine).then(r => {
        const size = getSize(r)
        console.log({ size })
    })

    await getOrgUnit(dataEngine, orgUnitList).then(r =>
        console.log('second rsykt', { r })
    )
    await getProgram(dataEngine, programList).then(r =>
        console.log('program', { r })
    )
    await getProgramStage(dataEngine, programList).then(r =>
        console.log('programStage', { r })
    )
    await getTrackedEntityType(dataEngine, trackedEntityTypeList).then(r =>
        console.log('trackedEntityTypeList', { r })
    )
    await getTEA(dataEngine, teaList).then(r => console.log('tea', { r }))
    await getProgramRule(dataEngine, programList).then(r =>
        console.log('programRule', { r })
    )
    await getTEIFilter(dataEngine, programList).then(r =>
        console.log('tei', { r })
    )
    await getEventFilter(dataEngine, programList).then(r =>
        console.log('event', { r })
    )
    await getRelationship(dataEngine).then(r => console.log('relation', { r }))
    await getOptionSet(dataEngine, optionSetList).then(r =>
        console.log('optionset', { r })
    )
    await getOptions(dataEngine, optionSetList).then(r =>
        console.log('options', { r })
    )
    await getOptionGroups(dataEngine, optionSetList).then(r =>
        console.log('option groups', { r })
    )
}

const getOrgUnit = (dataEngine, orgUnitList) => {
    const orgUnitPromises = []
    orgUnitList.map(ou => orgUnitPromises.push(apiFetchOrgUnit(dataEngine, ou)))

    return Promise.all(orgUnitPromises).then(result => getSize(result))
}

const getProgram = (dataEngine, programList) => {
    return apiFetchProgram(dataEngine, programList).then(r => getSize(r))
}

const getProgramStage = (dataEngine, programList) =>
    apiFetchProgramStage(dataEngine, programList).then(r => getSize(r))

const getTrackedEntityType = (dataEngine, trackedEntityTypeList) =>
    apiFetchTrackedEntityType(dataEngine, trackedEntityTypeList).then(r =>
        getSize(r)
    )

const getTEA = (dataEngine, teaList) =>
    apiFetchTrackedEntityAttributes(dataEngine, teaList).then(r => getSize(r))

const getProgramRule = (dataEngine, programList) =>
    apiFetchProgramRule(dataEngine, programList).then(r => getSize(r))

const getTEIFilter = (dataEngine, programList) =>
    apiFetchTrackedEntityInstanceFilter(dataEngine, programList).then(r =>
        getSize(r)
    )

const getEventFilter = (dataEngine, programList) =>
    apiFetchEventFilters(dataEngine, programList).then(r => getSize(r))

const getRelationship = dataEngine =>
    apiFetchRelationshipTypes(dataEngine).then(r => getSize(r))

const getOptionSet = (dataEngine, optionSetList) =>
    apiFetchOptionSet(dataEngine, optionSetList).then(r => getSize(r))

const getOptions = (dataEngine, optionSetList) =>
    apiFetchOptions(dataEngine, optionSetList).then(r => getSize(r))

const getOptionGroups = (dataEngine, optionSetList) =>
    apiFetchOptionGroup(dataEngine, optionSetList).then(r => getSize(r))
