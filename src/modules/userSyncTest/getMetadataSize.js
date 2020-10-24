import { splitArray } from '../splitArray'
import { getRequestDownloadSize } from '../../utils/getRequestDownloadSize'

const prepareRequestURL = (baseUrl, parameters) => {
    let url = `${baseUrl}/api/${parameters.attribute}.json?paging=false&fields=${parameters.fields}`
    parameters.filters ? (url = url + `&filter=${parameters.filters}`) : url
    return getRequestDownloadSize(url)
}

const getMetadataDownloadSize = async ({
    baseUrl,
    datasetList,
    programList,
    dataElementListId,
    trackedEntityTypeIdList,
    optionSetIdList,
    indicatorIdList,
    indicatorTypeIdList,
    categoryComboIdList,
    categoryIdList,
}) => {
    const dataElementList = []
    let dataElementSize = 0
    let metadataSize = 0

    if (dataElementListId.length > 100) {
        const dataElementCollection = dataElementListId.slice()
        const splitCollection = splitArray(dataElementCollection, 100)
        const fields =
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]'

        splitCollection.forEach(dataElementSplitCollection => {
            dataElementSplitCollection.forEach(dataElement => {
                const filters = `id:in:[${dataElement}]`
                const url = `${baseUrl}/api/dataElements.json?paging=false&fields=${fields}&filter=${filters}`
                dataElementList.push(getRequestDownloadSize(url))
            })
        })

        await Promise.all(dataElementList).then(data => {
            dataElementSize = data.reduce((total, num) => total + num, 0)
            return dataElementSize
        })
    }

    const datasetParameters = {
        attribute: 'dataSets',
        filters: `id:in:[${datasetList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,periodType,categoryCombo[id],mobile,version,expiryDays,timelyDays,notifyCompletingUser,openFuturePeriods,fieldCombinationRequired,validCompleteOnly,noValueRequiresComment,skipOffline,dataElementDecoration,renderAsTabs,renderHorizontally,workflow[id],dataSetElements[dataSet[id],dataElement[id],categoryCombo[id]],indicators[id],sections[id,code,name,displayName,created,lastUpdated,deleted,description,sortOrder,dataSet[id],showRowTotals,showColumnTotals,dataElements[id],greyedFields[id,deleted,dataElement[id],categoryOptionCombo[id]]],compulsoryDataElementOperands[id,deleted,dataElement[id],categoryOptionCombo[id]],dataInputPeriods[period,openingDate,closingDate],access[data[write]],style[color,icon]',
    }

    const programParameters = {
        attribute: 'programs',
        filters: `id:in:[${programList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,version,onlyEnrollOnce,enrollmentDateLabel,displayIncidentDate,incidentDateLabel,registration,selectEnrollmentDatesInFuture,dataEntryMethod,ignoreOverdueEvents,relationshipFromA,selectIncidentDatesInFuture,captureCoordinates,useFirstStageDuringRegistration,displayFrontPageList,programType,relationshipType[id],relationshipText,programTrackedEntityAttributes[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,mandatory,program[id],allowFutureDate,displayInList,sortOrder,searchable,trackedEntityAttribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,pattern,sortOrderInListNoProgram,valueType,expression,programScope,displayInListNoProgram,generated,displayOnVisitSchedule,orgunitScope,unique,inherit,optionSet[id],style[color,icon],access[read],formName],renderType],relatedProgram[id],trackedEntityType[id],categoryCombo[id],access[data[write]],programIndicators[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,displayInForm,expression,dimensionItem,filter,decimals,aggregationType,program[id],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]]],programStages[id],programRuleVariables[id,code,name,displayName,created,lastUpdated,deleted,useCodeForOptionSet,program[id],programStage[id],dataElement[id],trackedEntityAttribute[id],programRuleVariableSourceType],style[color,icon],expiryDays,completeEventsExpiryDays,expiryPeriodType,minAttributesRequiredToSearch,maxTeiCountToReturn,featureType,programSections[id,code,name,displayName,created,lastUpdated,deleted,description,program[id],programTrackedEntityAttribute[id],sortOrder,description,style[color,icon],formName]',
    }

    const programRulesParameters = {
        attribute: 'programRules',
        filters: `program.id:in:[${programList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]',
    }

    const programStagesParameters = {
        attribute: 'programStages',
        filters: `program.id:in:[${programList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,description,displayDescription,executionDateLabel,allowGenerateNextVisit,validCompleteOnly,reportDateToUse,openAfterEnrollment,repeatable,captureCoordinates,featureType,formType,displayGenerateEventBox,generatedByEnrollmentDate,autoGenerateEvent,sortOrder,hideDueDate,blockEntryForm,minDaysFromStart,standardInterval,programStageSections[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,programIndicators[id,program[id]],dataElements[id],renderType],programStageDataElements[id,code,name,displayName,created,lastUpdated,deleted,displayInReports,dataElement[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]],compulsory,allowProvidedElsewhere,sortOrder,allowFutureDate,renderType,programStage[id]],style[color,icon],periodType,program,access[data[write]],remindCompleted',
    }

    const trackedEntityTypesParameters = {
        attribute: 'trackedEntityTypes',
        filters: `id:in:[${trackedEntityTypeIdList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,trackedEntityTypeAttributes[trackedEntityType[id],trackedEntityAttribute[id],displayInList,mandatory,searchable],style[color,icon]',
    }

    const relationshipTypesParameters = {
        attribute: 'relationshipTypes',
        filters: false,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,bIsToA,aIsToB,fromConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],toConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]]',
    }

    const optionSetsParameters = {
        attribute: 'optionSets',
        filters: `id:in:[${optionSetIdList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,version,valueType,options[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,optionSet[id],style[color,icon]]',
    }

    const optionGroupParameters = {
        attribute: 'optionGroups',
        filters: `optionSet.id:in:[${optionSetIdList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,optionSet[id],options[id]',
    }

    const indicatorsParameters = {
        attribute: 'indicators',
        filters: `id:in:[${indicatorIdList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,annualized,indicatorType[id],numerator,numeratorDescription,denominator,denominatorDescription,url',
    }

    const indicatorTypesParameters = {
        attribute: 'indicatorTypes',
        filters: `id:in:[${indicatorTypeIdList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,number,factor',
    }

    const categoryCombosParameters = {
        attribute: 'categoryCombos',
        filters: `id:in:[${categoryComboIdList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,isDefault,categories[id],categoryOptionCombos[id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id]]',
    }

    const categoriesParameters = {
        attribute: 'categories',
        filters: `id:in:[${categoryIdList}]`,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,startDate,endDate,access[data[read,write]]],dataDimensionType',
    }

    const datasetRequest = prepareRequestURL(baseUrl, datasetParameters)
    const programRequest = prepareRequestURL(baseUrl, programParameters)
    const programRulesRequest = prepareRequestURL(
        baseUrl,
        programRulesParameters
    )
    const programStagesRequest = prepareRequestURL(
        baseUrl,
        programStagesParameters
    )
    const trackedEntityTypesRequest = prepareRequestURL(
        baseUrl,
        trackedEntityTypesParameters
    )
    const relationshipTypesRequest = prepareRequestURL(
        baseUrl,
        relationshipTypesParameters
    )
    const optionSetsRequest = prepareRequestURL(baseUrl, optionSetsParameters)
    const optionGroupsRequest = prepareRequestURL(
        baseUrl,
        optionGroupParameters
    )
    const indicatorsRequest = prepareRequestURL(baseUrl, indicatorsParameters)
    const indicatorTypesRequest = prepareRequestURL(
        baseUrl,
        indicatorTypesParameters
    )
    const categoryCombosRequest = prepareRequestURL(
        baseUrl,
        categoryCombosParameters
    )
    const categoriesRequest = prepareRequestURL(baseUrl, categoriesParameters)

    await Promise.all([
        datasetRequest,
        programRequest,
        programRulesRequest,
        programStagesRequest,
        trackedEntityTypesRequest,
        relationshipTypesRequest,
        indicatorsRequest,
        indicatorTypesRequest,
        categoryCombosRequest,
        categoriesRequest,
        optionSetsRequest,
        optionGroupsRequest,
    ]).then(metadata => {
        metadataSize = metadata.reduce((total, num) => total + num, 0)
        return metadataSize
    })

    metadataSize = metadataSize + dataElementSize
    metadataSize = Math.round(metadataSize / 1024)

    return metadataSize
}

export default getMetadataDownloadSize
