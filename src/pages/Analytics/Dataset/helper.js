import mapValues from 'lodash/mapValues'
import { validateObjectByProperty } from '../../../utils/validators'

export const createInitialValues = initialValues => ({
    id: initialValues.id || '',
    dataset: initialValues.dataset || '',
    visualization: initialValues.visualization || '',
    name: initialValues.name || '',
    group: initialValues.group || {
        name: '',
        id: '',
    },
})

export const validMandatoryFields = settings => {
    return !validateObjectByProperty(['dataset', 'visualization'], settings)
}

export const createVisualizationValues = (value, id) => ({
    id: id || value.id,
    name: value.name || value.visualizationName,
    timestamp: value.timestamp || new Date().toJSON(),
    dataset: value.dataset,
    datasetName: value.datasetName,
    group: {
        id: value.group.id,
        name: value.group.name,
    },
})

export const updateRows = (current, rows) => {
    const updatedRow = Object.assign({}, rows)
    const datasetFound = Object.keys(updatedRow).find(
        dataset => dataset === current.dataset
    )

    if (datasetFound) {
        const groupFound = Object.keys(updatedRow[datasetFound].groups).find(
            group => group === current.group.id
        )

        if (groupFound) {
            updatedRow[datasetFound] = {
                ...updatedRow[datasetFound],
                groups: {
                    ...updatedRow[datasetFound].groups,
                    [groupFound]: [
                        ...updatedRow[datasetFound].groups[groupFound],
                        current,
                    ],
                },
            }
        } else {
            updatedRow[datasetFound] = {
                ...updatedRow[datasetFound],
                groups: {
                    ...updatedRow[datasetFound].groups,
                    [current.group.id]: [current],
                },
            }
        }
    } else {
        updatedRow[current.dataset] = {
            datasetName: current.datasetName,
            groups: {
                [current.group.id]: [current],
            },
        }
    }

    return updatedRow
}

export const prepareRows = (visualizations, datasetList) => {
    const rows = {}
    mapValues(visualizations, (dataset, i) => {
        let groups = {}
        dataset.map(group => {
            const visual = []
            const foundDataset = datasetList.find(p => p.id === i)
            group.dataset = i
            group.datasetName = dataset.datasetName || foundDataset.name
            group.visualizations.map(visualization => {
                const vis = {
                    ...visualization,
                    timestamp: visualization.timestamp || new Date().toJSON(),
                    dataset: i,
                    datasetName: dataset.datasetName || foundDataset.name,
                    group: {
                        id: group.id,
                        name: group.name,
                    },
                }
                visual.push(vis)
                groups = {
                    ...groups,
                    [group.id]: visual,
                }
                rows[i] = {
                    datasetName: dataset.datasetName || foundDataset.name,
                    groups: { ...groups },
                }
            })
        })
    })

    return {
        visualizationsByDatasets: rows,
        groupList: getGroupList(rows),
    }
}

export const getGroupList = visualizations => {
    const groupList = {}

    mapValues(visualizations, (dataset, i) => {
        const datasetGroup = []
        mapValues(dataset.groups, group => {
            datasetGroup.push({
                id: group[0].group.id,
                name: group[0].group.name,
                dataset: i,
                datasetName: dataset.datasetName,
            })
            groupList[i] = datasetGroup
        })
    })

    return groupList
}

export const rowsToDataStore = rows => {
    const updatedRows = {}

    mapValues(rows, (dataset, i) => {
        const groups = []
        mapValues(dataset.groups, group => {
            const visualizations = []
            let groupUpdated = {}
            group.map(visualization => {
                visualizations.push({
                    id: visualization.id,
                    name: visualization.name,
                    timestamp: visualization.timestamp,
                })
                groupUpdated = {
                    id: visualization.group.id,
                    name: visualization.group.name,
                    visualizations: visualizations,
                }
            })
            groups.push(groupUpdated)
            updatedRows[i] = groups
        })
    })
    return updatedRows
}

export const createGroup = group => ({
    id: group.id,
    name: group.name,
    visualizations: group.visualizations,
})

export const createDataStoreGroupRows = datastore => {
    const dataStoreGroups = Object.assign({}, datastore)
    const result = {}
    mapValues(dataStoreGroups, (dataset, i) => {
        const groups = []
        dataset.map(group => groups.push(createGroup(group)))
        result[i] = groups
    })

    return result
}
