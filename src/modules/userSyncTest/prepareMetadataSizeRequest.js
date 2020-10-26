const getListElement = (orgUnit, elementType) => {
    let idList = [],
        valuesList = []

    if (orgUnit[elementType].length > 0) {
        orgUnit[elementType].forEach(elementOU => {
            if (idList.length > 0) {
                idList = idList.filter(element => element !== elementOU.id)
                idList.push(elementOU.id)
                valuesList = valuesList.filter(
                    element => element.id !== elementOU.id
                )
                valuesList.push(elementOU)
            } else {
                idList.push(elementOU.id)
                valuesList.push(elementOU)
            }
        })
    }

    return { idList, valuesList }
}

const getIdElementList = (idList, elementType) => {
    if (idList.length > 0) {
        idList = idList.filter(element => element !== elementType.id)
        idList.push(elementType.id)
    } else {
        idList.push(elementType.id)
    }

    return idList
}

export const prepareMetadataRequest = orgUnitCollection => {
    let dataSetIdList = [],
        programsIdList = [],
        programsValuesList = [],
        trackedEntityTypeListId = [],
        optionSetListId = [],
        dataSetValuesList = [],
        dataElementListId = [],
        indicatorListId = [],
        indicatorTypeListId = [],
        categoryComboListId = [],
        categoryListId = []
    const indicatorValuesList = []

    orgUnitCollection.forEach(orgUnit => {
        const programResult = getListElement(orgUnit, 'programs')
        const datasetResult = getListElement(orgUnit, 'dataSets')

        programsValuesList = programResult.valuesList
        programsIdList = programResult.idList
        dataSetValuesList = datasetResult.valuesList
        dataSetIdList = datasetResult.idList
    })

    if (dataSetValuesList.length > 0) {
        dataSetValuesList.forEach(value => {
            const dataSetElement = value.dataSetElements
            if (dataSetElement.length > 0) {
                dataSetElement.forEach(value => {
                    if (Object.keys(value.dataElement).length !== 0) {
                        dataElementListId = getIdElementList(
                            dataElementListId,
                            value.dataElement
                        )
                    }
                })
            }
            const indicators = value.indicators
            if (indicators.length > 0) {
                value.indicators.forEach(indicatorOU => {
                    if (indicatorListId.length > 0) {
                        indicatorListId = indicatorListId.filter(
                            indicator => indicator !== indicatorOU.id
                        )
                        indicatorListId.push(indicatorOU.id)
                        indicatorValuesList.push(indicatorOU)
                    } else {
                        indicatorListId.push(indicatorOU)
                        indicatorValuesList.push(indicatorOU)
                    }
                })
            }
            const categoryCombos = value.categoryCombo
            if (categoryCombos !== undefined) {
                categoryComboListId = getIdElementList(
                    categoryComboListId,
                    categoryCombos
                )

                if (value.categoryCombo.categories.length > 0) {
                    value.categoryCombo.categories.forEach(categoryValue => {
                        categoryListId = getIdElementList(
                            categoryListId,
                            categoryValue
                        )
                    })
                }

                if (indicatorValuesList.length > 0) {
                    indicatorValuesList.forEach(value => {
                        if (Object.keys(value.indicatorType).length > 0) {
                            indicatorTypeListId = getIdElementList(
                                indicatorListId,
                                value.indicatorType
                            )
                        }
                    })
                }
            }
        })
    }

    if (programsValuesList.length > 0) {
        programsValuesList.forEach(program => {
            const trackedEntityT = program.trackedEntityType
            if (trackedEntityT !== undefined) {
                trackedEntityTypeListId = getIdElementList(
                    trackedEntityTypeListId,
                    trackedEntityT
                )
            }

            const programTEA = program.programTrackedEntityAttributes
            if (programTEA.length > 0) {
                programTEA.forEach(value => {
                    if (Object.keys(value.trackedEntityAttribute).length > 0) {
                        optionSetListId = getIdElementList(
                            optionSetListId,
                            value.trackedEntityAttribute.optionSet
                        )
                    }
                })
            }
        })
    }

    return {
        datasetIdList: dataSetIdList,
        programIdList: programsIdList,
        trackedEntityTypeIdList: trackedEntityTypeListId,
        optionSetIdList: optionSetListId,
        dataElementIdList: dataElementListId,
        indicatorIdList: indicatorListId,
        indicatorTypeIdList: indicatorTypeListId,
        categoryComboIdList: categoryComboListId,
        categoryIdList: categoryListId,
    }
}
