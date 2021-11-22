/**
 * Query to get programs and dataset related to org unit
 * */

/*const getUsersQuery = {
    users: {
        resource: 'users',
        id: ({ userId }) => `${userId}`,
        params: {
            fields: [
                'id',
                'name',
                'userCredentials',
                'userGroups',
                'organisationUnits',
                'teiSearchOrganisationUnits',
            ],
            order: 'name:asc',
            pager: false,
        },
    },
}

export const useReadUser = ({ userId }) =>
    useDataQuery(getUsersQuery, {
        variables: { userId },
        lazy: true,
    })*/

const userGroup = {
    userGroup: {
        resource: 'userGroups',
        params: {
            fields: ['id', 'name', 'publicAccess'],
            id: ({ user }) => `${user}`,
            pager: false,
        },
    },
}

const organisationUnit = {
    orgUnit: {
        resource: 'organisationUnits',
        params: {
            fields: [
                'id',
                'code',
                'name',
                'displayName',
                'created',
                'lastUpdated',
                'deleted',
                'shortName',
                'displayShortName',
                'description',
                'displayDescription',
                'path',
                'openingDate',
                'closedDate',
                'level',
                'parent[id]',
                'programs[id,name,publicAccess,userAccesses,userGroupAccesses,trackedEntityType[id],programTrackedEntityAttributes[trackedEntityAttribute[optionSet[id]]]]',
                'dataSets[id,categoryCombo[id,categories[id]],publicAccess,userAccesses,userGroupAccesses,indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]]',
                'ancestors[id,displayName]',
                'organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
            ],
            filter: ({ orgUnit }) => `path:like:${orgUnit}`,
            pager: false,
        },
    },
}

/**
 * api/organisationUnitLevels?fields=id,code,name,displayName,created,lastUpdated,deleted,level&paging=false
 * */

const orgUnitLevelQuery = () => ({
    resource: 'organisationUnitLevels',
    params: {
        fields: 'id,code,name,displayName,created,lastUpdated,deleted,level',
        paging: false,
    },
})

export const apiFetchOULevel = async dataEngine => {
    try {
        const ouData = await dataEngine.query({
            ou: orgUnitLevelQuery(),
        })
        return ouData.ou.organisationUnitLevels
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/organisationUnits?fields=id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,featureType,parent[id],programs[id],dataSets[id],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]&filter=path:like:YuQRtpLP10I&order=id:asc&paging=true&pageSize=500&page=1
 * order=id:asc&paging=true&pageSize=500&page=1
 * */

const orgUnitQuery = query => ({
    resource: 'organisationUnits',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,featureType,parent[id],programs[id],dataSets[id],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
        filter: `path:like:${query}`,
        order: 'id:asc',
        paging: false,
    },
})

export const apiFetchOrgUnit = async (dataEngine, ou) => {
    try {
        const ouData = await dataEngine.query({
            ou: orgUnitQuery(ou),
        })
        return ouData.ou.organisationUnits
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/programs?fields=id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,version,onlyEnrollOnce,enrollmentDateLabel,displayIncidentDate,incidentDateLabel,registration,selectEnrollmentDatesInFuture,dataEntryMethod,ignoreOverdueEvents,selectIncidentDatesInFuture,captureCoordinates,useFirstStageDuringRegistration,displayFrontPageList,programType,programTrackedEntityAttributes[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,mandatory,program[id],allowFutureDate,displayInList,sortOrder,searchable,trackedEntityAttribute[id],renderType],relatedProgram[id],trackedEntityType[id],categoryCombo[id],access[data[write]],programIndicators[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,displayInForm,expression,dimensionItem,filter,decimals,aggregationType,program[id],analyticsType,analyticsPeriodBoundaries[boundaryTarget,analyticsPeriodBoundaryType,offsetPeriods,offsetPeriodType],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]]],programRuleVariables[id,code,name,displayName,created,lastUpdated,deleted,useCodeForOptionSet,program[id],programStage[id],dataElement[id],trackedEntityAttribute[id],programRuleVariableSourceType],style[color,icon],expiryDays,completeEventsExpiryDays,expiryPeriodType,minAttributesRequiredToSearch,maxTeiCountToReturn,featureType,accessLevel,programSections[id,code,name,displayName,created,lastUpdated,deleted,description,program[id],programTrackedEntityAttribute[id],trackedEntityAttributes[id],sortOrder,style[color,icon],formName],attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]&filter=id:in:[]&filter=access.data.read:eq:true&paging=false
 * */

const programQuery = query => ({
    resource: 'programs',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,version,onlyEnrollOnce,enrollmentDateLabel,displayIncidentDate,incidentDateLabel,registration,selectEnrollmentDatesInFuture,dataEntryMethod,ignoreOverdueEvents,selectIncidentDatesInFuture,captureCoordinates,useFirstStageDuringRegistration,displayFrontPageList,programType,programTrackedEntityAttributes[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,mandatory,program[id],allowFutureDate,displayInList,sortOrder,searchable,trackedEntityAttribute[id],renderType],relatedProgram[id],trackedEntityType[id],categoryCombo[id],access[data[write]],programIndicators[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,displayInForm,expression,dimensionItem,filter,decimals,aggregationType,program[id],analyticsType,analyticsPeriodBoundaries[boundaryTarget,analyticsPeriodBoundaryType,offsetPeriods,offsetPeriodType],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]]],programRuleVariables[id,code,name,displayName,created,lastUpdated,deleted,useCodeForOptionSet,program[id],programStage[id],dataElement[id],trackedEntityAttribute[id],programRuleVariableSourceType],style[color,icon],expiryDays,completeEventsExpiryDays,expiryPeriodType,minAttributesRequiredToSearch,maxTeiCountToReturn,featureType,accessLevel,programSections[id,code,name,displayName,created,lastUpdated,deleted,description,program[id],programTrackedEntityAttribute[id],trackedEntityAttributes[id],sortOrder,style[color,icon],formName],attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchProgram = async (dataEngine, program) => {
    try {
        const programData = await dataEngine.query({
            program: programQuery(program),
        })
        return programData.program.programs
    } catch (error) {
        console.log('Error: ', error)
    }
}

/*
 * api/programStages?fields=id,code,name,displayName,created,lastUpdated,deleted,description,displayDescription,executionDateLabel,dueDateLabel,allowGenerateNextVisit,validCompleteOnly,reportDateToUse,openAfterEnrollment,repeatable,captureCoordinates,featureType,formType,displayGenerateEventBox,generatedByEnrollmentDate,autoGenerateEvent,sortOrder,hideDueDate,blockEntryForm,minDaysFromStart,standardInterval,programStageSections[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,programIndicators[id],dataElements[id],renderType],programStageDataElements[id,code,name,displayName,created,lastUpdated,deleted,displayInReports,dataElement[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],fieldMask,style[color,icon],access[read],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]],attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]],compulsory,allowProvidedElsewhere,sortOrder,allowFutureDate,renderType,programStage[id]],style[color,icon],periodType,program,access[data[write]],remindCompleted,enableUserAssignment,attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]&filter=program.id:in:[]&filter=access.data.read:eq:true&paging=false
 * */

const programStageQuery = query => ({
    resource: 'programStages',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,description,displayDescription,executionDateLabel,dueDateLabel,allowGenerateNextVisit,validCompleteOnly,reportDateToUse,openAfterEnrollment,repeatable,captureCoordinates,featureType,formType,displayGenerateEventBox,generatedByEnrollmentDate,autoGenerateEvent,sortOrder,hideDueDate,blockEntryForm,minDaysFromStart,standardInterval,programStageSections[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,programIndicators[id],dataElements[id],renderType],programStageDataElements[id,code,name,displayName,created,lastUpdated,deleted,displayInReports,dataElement[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],fieldMask,style[color,icon],access[read],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]],attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]],compulsory,allowProvidedElsewhere,sortOrder,allowFutureDate,renderType,programStage[id]],style[color,icon],periodType,program,access[data[write]],remindCompleted,enableUserAssignment,attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]',
        filter: `program.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchProgramStage = async (dataEngine, program) => {
    try {
        const programData = await dataEngine.query({
            programStage: programStageQuery(program),
        })
        return programData.programStage.programStages
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 *
 * api/trackedEntityTypes?fields=id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,trackedEntityTypeAttributes[trackedEntityType[id],trackedEntityAttribute[id],displayInList,mandatory,searchable],style[color,icon],featureType,access[data[read,write]]&filter=id:in:[]&filter=access.data.read:eq:true&paging=false
 * */

const trackedEntityTypeQuery = query => ({
    resource: 'trackedEntityTypes',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,trackedEntityTypeAttributes[trackedEntityType[id],trackedEntityAttribute[id],displayInList,mandatory,searchable],style[color,icon],featureType,access[data[read,write]]',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchTrackedEntityType = async (dataEngine, trackedEntity) => {
    try {
        const trackedEntityTypeData = await dataEngine.query({
            trackedEntityType: trackedEntityTypeQuery(trackedEntity),
        })
        return trackedEntityTypeData.trackedEntityType.trackedEntityTypes
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/trackedEntityAttributes?fields=id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,pattern,sortOrderInListNoProgram,valueType,expression,programScope,displayInListNoProgram,generated,displayOnVisitSchedule,orgunitScope,unique,inherit,fieldMask,optionSet[id],style[color,icon],access[read],formName,displayFormName&filter=id:in:[]&paging=false
 * */

const trackedEntityAttributesQuery = query => ({
    resource: 'trackedEntityAttributes',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,pattern,sortOrderInListNoProgram,valueType,expression,programScope,displayInListNoProgram,generated,displayOnVisitSchedule,orgunitScope,unique,inherit,fieldMask,optionSet[id],style[color,icon],access[read],formName,displayFormName',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchTrackedEntityAttributes = async (dataEngine, tea) => {
    try {
        const teaData = await dataEngine.query({
            tea: trackedEntityAttributesQuery(tea),
        })
        return teaData.tea.trackedEntityAttributes
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/programRules?fields=id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]&filter=program.id:in:[]&paging=false
 * */

const programRuleQuery = query => ({
    resource: 'programRules',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]',
        filter: `program.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchProgramRule = async (dataEngine, program) => {
    try {
        const programData = await dataEngine.query({
            programRule: programRuleQuery(program),
        })
        return programData.programRule.programRules
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/trackedEntityInstanceFilters?filter=program.id:in:[]&filter=access.read:eq:true&fields=id,code,name,displayName,created,lastUpdated,deleted,program[id],description,sortOrder,enrollmentStatus,followup,enrollmentCreatedPeriod,eventFilters[programStage,eventStatus,eventCreatedPeriod,assignedUserMode]&paging=false
 * */

const trackedEntityInstanceFilterQuery = query => ({
    resource: 'trackedEntityInstanceFilters',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,program[id],description,sortOrder,enrollmentStatus,followup,enrollmentCreatedPeriod,eventFilters[programStage,eventStatus,eventCreatedPeriod,assignedUserMode]',
        filter: `program.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchTrackedEntityInstanceFilter = async (
    dataEngine,
    program
) => {
    try {
        const trackedEntityData = await dataEngine.query({
            trackedEntity: trackedEntityInstanceFilterQuery(program),
        })
        return trackedEntityData.trackedEntity.trackedEntityInstanceFilters
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/eventFilters?filter=program:in:[]&filter=access.read:eq:true&fields=id,code,name,displayName,created,lastUpdated,deleted,program,programStage,description,eventQueryCriteria[followUp,organisationUnit,ouMode,assignedUserMode,order,displayColumnOrder,dataFilters[dataItem,le,ge,gt,lt,eq,in,like,dateFilter],events,eventStatus,eventDate[startBuffer,endBuffer,startDate,endDate,period,type],dueDate[startBuffer,endBuffer,startDate,endDate,period,type],lastUpdatedDate[startBuffer,endBuffer,startDate,endDate,period,type],completedDate[startBuffer,endBuffer,startDate,endDate,period,type]]&paging=false
 * */

const eventFilterQuery = query => ({
    resource: 'eventFilters',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,program,programStage,description,eventQueryCriteria[followUp,organisationUnit,ouMode,assignedUserMode,order,displayColumnOrder,dataFilters[dataItem,le,ge,gt,lt,eq,in,like,dateFilter],events,eventStatus,eventDate[startBuffer,endBuffer,startDate,endDate,period,type],dueDate[startBuffer,endBuffer,startDate,endDate,period,type],lastUpdatedDate[startBuffer,endBuffer,startDate,endDate,period,type],completedDate[startBuffer,endBuffer,startDate,endDate,period,type]]',
        filter: `program:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchEventFilters = async (dataEngine, program) => {
    try {
        const eventFilterData = await dataEngine.query({
            eventFilter: eventFilterQuery(program),
        })
        return eventFilterData.eventFilter.eventFilters
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * --------------
 * api/relationshipTypes?fields=id,code,name,displayName,created,lastUpdated,deleted,bIsToA,aIsToB,fromToName,toFromName,bidirectional,fromConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],toConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],access[data[read,write]]&filter=access.data.read:eq:true&paging=false
 * */

const relationshipTypeQuery = () => ({
    resource: 'relationshipTypes',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,bIsToA,aIsToB,fromToName,toFromName,bidirectional,fromConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],toConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],access[data[read,write]]',
        paging: false,
    },
})

export const apiFetchRelationshipTypes = async dataEngine => {
    try {
        const relationshipTypeData = await dataEngine.query({
            relationshipType: relationshipTypeQuery(),
        })
        return relationshipTypeData.relationshipType.relationshipTypes
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/optionSets?fields=id,code,name,displayName,created,lastUpdated,deleted,version,valueType&filter=id:in:[]&paging=false
 * */

const optionSetQuery = query => ({
    resource: 'optionSets',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,version,valueType',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchOptionSet = async (dataEngine, optionSet) => {
    try {
        const optionSetData = await dataEngine.query({
            optionSet: optionSetQuery(optionSet),
        })
        return optionSetData.optionSet.optionSets
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/options?fields=id,code,name,displayName,created,lastUpdated,deleted,sortOrder,optionSet[id],style[color,icon]&filter=optionSet.id:in:[]&paging=false (recursive)
 * */

const optionsQuery = query => ({
    resource: 'options',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,sortOrder,optionSet[id],style[color,icon]',
        filter: `optionSet.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchOptions = async (dataEngine, optionSet) => {
    try {
        const optionsData = await dataEngine.query({
            option: optionsQuery(optionSet),
        })
        return optionsData.option.options
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * api/optionGroups?fields=id,code,name,displayName,created,lastUpdated,deleted,optionSet[id],options[id]&filter=optionSet.id:in:[}
 * */

const optionGroupQuery = query => ({
    resource: 'optionGroups',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,optionSet[id],options[id]',
        filter: `optionSet.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchOptionGroup = async (dataEngine, optionSet) => {
    try {
        const optionGroupData = await dataEngine.query({
            optionGroup: optionGroupQuery(optionSet),
        })
        return optionGroupData.optionGroup.optionGroups
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 *
 * */
