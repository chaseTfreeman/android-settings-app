import fetchAttributes from '../../utils/fetchAttribute'
import { prepareMetadataRequest } from './prepareMetadataSizeRequest'
import getMetadataDownloadSize from './getMetadataSize'
import { prepareDataSizeRequest } from './prepareDataSizeRequest'

const getOrganisationUnits = async (organisationUnitIdList, request) => {
    const promisesOrganisationUnit = []
    const organisationUnitCollection = []
    const organisationUnitIds = []
    if (organisationUnitIdList.length > 0) {
        organisationUnitIdList.forEach(orgUnit => {
            const orgUnitRequest = request(orgUnit)
            promisesOrganisationUnit.push(fetchAttributes(orgUnitRequest))
        })

        await Promise.all(promisesOrganisationUnit).then(result => {
            if (result.length > 0) {
                result.forEach(orgUnit => {
                    organisationUnitCollection.push(...orgUnit)
                })
            }
        })

        organisationUnitCollection.forEach(orgUnit => {
            organisationUnitIds.push(orgUnit.id)
        })
    }
    return {
        orgUnitLength: organisationUnitCollection.length,
        orgUnitCollection: organisationUnitCollection,
        orgUnitIds: organisationUnitIds,
    }
}

const getProgramRules = async (programList, request) => {
    let programRules = 0
    const programRuleRequest = request(programList)
    await fetchAttributes(programRuleRequest).then(data => {
        programRules = data
    })
    return programRules.length
}

const getUserDataSyncTest = async ({
    userSelected,
    baseUrl,
    globalSettings,
    specificSettings,
}) => {
    const organisationUnits = userSelected.organisationUnits
    const organisationUnitSearch = userSelected.teiSearchOrganisationUnits

    const organisationUnitList = []
    const organisationUnitSearchList = []

    organisationUnits.forEach(orgUnit => {
        organisationUnitList.push(orgUnit.id)
    })

    organisationUnitSearch.forEach(orgUnit => {
        organisationUnitSearchList.push(orgUnit.id)
    })

    const orgUnitSearchRequest = orgUnit => {
        return {
            attribute: 'organisationUnits',
            url: `${baseUrl}/api/organisationUnits`,
            field: '',
            filter: `path:like:${orgUnit}`,
        }
    }

    const orgUnitCaptureRequest = orgUnit => {
        return {
            attribute: 'organisationUnits',
            url: `${baseUrl}/api/organisationUnits`,
            field:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,parent[id],programs[id,name,publicAccess,userAccesses,userGroupAccesses,trackedEntityType[id],programTrackedEntityAttributes[trackedEntityAttribute[optionSet[id]]]],dataSets[id,categoryCombo[id,categories[id]],publicAccess,userAccesses,userGroupAccesses,indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
            filter: `path:like:${orgUnit}`,
        }
    }

    const programRulesRequest = programsList => {
        return {
            attribute: 'programRules',
            url: `${baseUrl}/api/programRules`,
            field:
                'id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]',
            filter: `program.id:in:[${programsList}]`,
        }
    }

    const {
        orgUnitLength: organisationUnitSearchSize,
    } = await getOrganisationUnits(
        organisationUnitSearchList,
        orgUnitSearchRequest
    )
    const {
        orgUnitLength: organisationUnitCaptureSize,
        orgUnitCollection: organisationUnitCaptureCollection,
        orgUnitIds,
    } = await getOrganisationUnits(organisationUnitList, orgUnitCaptureRequest)

    const {
        datasetIdList,
        programIdList,
        trackedEntityTypeIdList,
        optionSetIdList,
        dataElementIdList,
        indicatorIdList,
        indicatorTypeIdList,
        categoryComboIdList,
        categoryIdList,
    } = prepareMetadataRequest(organisationUnitCaptureCollection)

    const programRulesLength = await getProgramRules(
        programIdList,
        programRulesRequest
    )

    const metadataSize = await getMetadataDownloadSize({
        baseUrl,
        datasetList: datasetIdList,
        programList: programIdList,
        dataElementListId: dataElementIdList,
        trackedEntityTypeIdList,
        optionSetIdList,
        indicatorIdList,
        indicatorTypeIdList,
        categoryComboIdList,
        categoryIdList,
    })

    const dataSize = await prepareDataSizeRequest({
        orgUnitParent: organisationUnitList,
        orgUnitCompleteList: orgUnitIds,
        programIdList,
        globalSettings,
        specificSettings,
        baseUrl,
    })

    return {
        orgUnitCaptureSize: organisationUnitCaptureSize,
        orgUnitSearchSize: organisationUnitSearchSize,
        datasetSize: datasetIdList.length,
        programSize: programIdList.length,
        programRulesSize: programRulesLength,
        metadataSize: metadataSize,
        dataSize: dataSize,
    }
}

export default getUserDataSyncTest
