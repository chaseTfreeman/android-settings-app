import mapValues from 'lodash/mapValues'
import { validateObjectByProperty } from '../../../utils/validators'

export const createInitialValues = initialValues => ({
    id: initialValues.id || '',
    program: initialValues.program || '',
    visualization: initialValues.visualization || '',
    name: initialValues.name || '',
    group: initialValues.group || {
        name: '',
        id: '',
    },
})

export const validMandatoryFields = settings => {
    return !validateObjectByProperty(['program', 'visualization'], settings)
}

export const createVisualizationValues = (value, id) => ({
    id: id || value.id,
    name: value.name || value.visualizationName,
    timestamp: value.timestamp || new Date().toJSON(),
    program: value.program,
    programName: value.programName,
    group: {
        id: value.group.id,
        name: value.group.name,
    },
})

export const updateRows = (current, rows) => {
    const updatedRow = Object.assign({}, rows)
    const programFound = Object.keys(updatedRow).find(
        program => program === current.program
    )

    if (programFound) {
        const groupFound = Object.keys(updatedRow[programFound].groups).find(
            group => group === current.group.id
        )

        if (groupFound) {
            updatedRow[programFound] = {
                ...updatedRow[programFound],
                groups: {
                    ...updatedRow[programFound].groups,
                    [groupFound]: [
                        ...updatedRow[programFound].groups[groupFound],
                        current,
                    ],
                },
            }
        } else {
            updatedRow[programFound] = {
                ...updatedRow[programFound],
                groups: {
                    ...updatedRow[programFound].groups,
                    [current.group.id]: [current],
                },
            }
        }
    } else {
        updatedRow[current.program] = {
            programName: current.programName,
            groups: {
                [current.group.id]: [current],
            },
        }
    }

    return updatedRow
}

export const prepareRows = (visualizations, programList) => {
    const rows = {}
    mapValues(visualizations, (program, i) => {
        let groups = {}
        program.map(group => {
            const visual = []
            const foundProgram = programList.find(p => p.id === i)
            group.program = i
            group.programName = program.programName || foundProgram.name
            group.visualizations.map(visualization => {
                const vis = {
                    ...visualization,
                    timestamp: visualization.timestamp || new Date().toJSON(),
                    program: i,
                    programName: program.programName || foundProgram.name,
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
                    programName: program.programName || foundProgram.name,
                    groups: { ...groups },
                }
            })
        })
    })

    return {
        visualizationsByPrograms: rows,
        groupList: getGroupList(rows),
    }
}

export const getGroupList = visualizations => {
    const groupList = {}

    mapValues(visualizations, (program, i) => {
        const programGroup = []
        mapValues(program.groups, group => {
            programGroup.push({
                id: group[0].group.id,
                name: group[0].group.name,
                program: i,
                programName: program.programName,
            })
            groupList[i] = programGroup
        })
    })

    return groupList
}

export const rowsToDataStore = rows => {
    const updatedRows = {}

    mapValues(rows, (program, i) => {
        const groups = []
        mapValues(program.groups, group => {
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
    mapValues(dataStoreGroups, (program, i) => {
        const groups = []
        program.map(group => groups.push(createGroup(group)))
        result[i] = groups
    })

    return result
}
