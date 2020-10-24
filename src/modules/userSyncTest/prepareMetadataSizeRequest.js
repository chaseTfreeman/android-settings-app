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
        if (orgUnit.programs.length > 0) {
            orgUnit.programs.forEach(programOU => {
                if (programsIdList.length >= 1) {
                    programsIdList = programsIdList.filter(
                        program => program !== programOU.id
                    )
                    programsIdList.push(programOU.id)
                    programsValuesList = programsValuesList.filter(
                        program => program.id !== programOU.id
                    )
                    programsValuesList.push(programOU)
                } else {
                    programsIdList.push(programOU.id)
                    programsValuesList.push(programOU)
                }
            })
        }

        if (orgUnit.dataSets.length > 0) {
            orgUnit.dataSets.forEach(datasetOU => {
                if (dataSetIdList.length >= 1) {
                    dataSetIdList = dataSetIdList.filter(
                        dataset => dataset !== datasetOU.id
                    )
                    dataSetIdList.push(datasetOU.id)
                    dataSetValuesList = dataSetValuesList.filter(
                        dataset => dataset.id !== datasetOU.id
                    )
                    dataSetValuesList.push(datasetOU)
                } else {
                    dataSetIdList.push(datasetOU.id)
                    dataSetValuesList.push(datasetOU)
                }
            })
        }
    })

    if (dataSetValuesList.length > 0) {
        dataSetValuesList.forEach(value => {
            const dataSetElement = value.dataSetElements
            if (
                //dataSetElement !== undefined &&
                dataSetElement.length > 0
            ) {
                dataSetElement.forEach(value => {
                    if (Object.keys(value.dataElement).length !== 0) {
                        if (dataElementListId.length >= 1) {
                            dataElementListId = dataElementListId.filter(
                                dataElement =>
                                    dataElement !== value.dataElement.id
                            )
                            dataElementListId.push(value.dataElement.id)
                        } else {
                            dataElementListId.push(value.dataElement.id)
                        }
                    }
                })
            }
            const indicators = value.indicators
            if (indicators.length > 0) {
                value.indicators.forEach(indicatorOU => {
                    if (indicatorListId.length >= 1) {
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
                if (categoryComboListId.length >= 1) {
                    categoryComboListId = categoryComboListId.filter(
                        categoryCombo => categoryCombo !== categoryCombos.id
                    )
                    categoryComboListId.push(categoryCombos.id)
                } else {
                    categoryComboListId.push(categoryCombos.id)
                }

                if (value.categoryCombo.categories.length > 0) {
                    value.categoryCombo.categories.forEach(categoryValue => {
                        if (categoryListId.length >= 1) {
                            categoryListId = categoryListId.filter(
                                category => category !== categoryValue.id
                            )
                            categoryListId.push(categoryValue.id)
                        } else {
                            categoryListId.push(categoryValue.id)
                        }
                    })
                }

                if (indicatorValuesList.length > 0) {
                    indicatorValuesList.forEach(value => {
                        if (Object.keys(value.indicatorType).length !== 0) {
                            if (indicatorTypeListId.length >= 1) {
                                indicatorTypeListId = indicatorTypeListId.filter(
                                    indicatorT =>
                                        indicatorT !== value.indicatorType.id
                                )
                                indicatorTypeListId.push(value.indicatorType.id)
                            } else {
                                indicatorTypeListId.push(value.indicatorType.id)
                            }
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
                if (trackedEntityTypeListId.length >= 1) {
                    trackedEntityTypeListId = trackedEntityTypeListId.filter(
                        trackedEntity => trackedEntity !== trackedEntityT.id
                    )
                    trackedEntityTypeListId.push(trackedEntityT.id)
                } else {
                    trackedEntityTypeListId.push(trackedEntityT.id)
                }
            }

            const programTEA = program.programTrackedEntityAttributes
            if (
                //programTEA !== undefined &&
                programTEA.length > 0
            ) {
                programTEA.forEach(value => {
                    if (
                        Object.keys(value.trackedEntityAttribute).length !== 0
                    ) {
                        if (optionSetListId.length >= 1) {
                            optionSetListId = optionSetListId.filter(
                                optionSet =>
                                    optionSet !==
                                    value.trackedEntityAttribute.optionSet.id
                            )
                            optionSetListId.push(
                                value.trackedEntityAttribute.optionSet.id
                            )
                        } else {
                            optionSetListId.push(
                                value.trackedEntityAttribute.optionSet.id
                            )
                        }
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
