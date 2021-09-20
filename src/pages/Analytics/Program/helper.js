import mapValues from 'lodash/mapValues'
import groupBy from 'lodash/groupBy'
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

export const groupVisualizationByProgram = visualizationList => {
    //check items that have same program ID
    // create group based on programs
    /*
    var data = [{
        "name": "jim",
        "color": "blue",
        "age": "22"
    }, {
        "name": "Sam",
        "color": "blue",
        "age": "33"
    }, {
        "name": "eddie",
        "color": "green",
        "age": "77"
    }];

    var result = _.chain(data)
        .groupBy("color")
        .pairs()
        .map(function (currentItem) {
            return _.object(_.zip(["color", "users"], currentItem));
        })
        .value();
    console.log(result);*/

    const programGroups = groupBy(
        visualizationList,
        visualization => visualization.program
    )
    const result = {}
    let groupList = {}
    const list = []
    mapValues(programGroups, vis => {
        const groupByGroup = groupBy(vis, group => group.group.id)
        result[vis[0].program] = {
            programName: vis[0].programName,
            groups: groupByGroup,
        }

        mapValues(groupByGroup, item => {
            list.push({
                ...item[0].group,
                program: item[0].program,
            })
        })

        groupList = groupBy(list, program => program.program)
    })
    console.log({ programGroups, result, list, groupList })
    return {
        groupProgram: result,
        groupList: groupList,
    }
}

export const dataStoreToRows = (dataStore, programList) => {
    const rows = {}

    mapValues(dataStore, (program, i) => {
        /*console.log({ program, i, dataStore })*/
        program.map(group => {
            const foundProgram = programList.find(p => p.id === i)
            group.visualizations.map(visualization => {
                rows[`${i}-${visualization.id}`] = {
                    id: visualization.id,
                    name: visualization.name,
                    timestamp: visualization.timestamp || new Date().toJSON(),
                    program: i,
                    programName: program.programName || foundProgram.name,
                    group: {
                        id: group.id,
                        name: group.name,
                    },
                }
            })
        })
    })
    //console.log('datastore to rows', { rows })
    return rows
}

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
                    groups: {
                        //[group.id]: visual
                        ...groups,
                    },
                }
            })
        })
    })

    //console.log('groups', getGroupList(rows))
    return {
        visualizationsByPrograms: rows,
        groupList: getGroupList(rows), //visualizations
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
                const vis = {
                    id: visualization.id,
                    name: visualization.name,
                    timestamp: visualization.timestamp,
                }
                visualizations.push(vis)
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
    console.log({ updatedRows })
    return updatedRows
}
