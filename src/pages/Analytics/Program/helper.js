import filter from 'lodash/filter'
import chain from 'lodash/chain'
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

export const createVisualizationValues = (value, id) => {
    const visualization = {
        id: id,
        name: value.name || value.visualizationName,
        timestamp: new Date().toJSON(),
        program: value.program,
        programName: value.programName,
        group: {
            id: value.group.id,
            name: value.group.name,
        },
    }
    return visualization
}

export const groupVisualizationByProgram = (id, visualizationList) => {
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

    //const groups = groupBy(visualizationList, visualization => visualization.program)

    const groups = groupBy(
        visualizationList,
        visualization => visualization.program
    )
    const result = {}
    const a = mapValues(groups, vis => {
        const groupG = groupBy(vis, group => group.group.id)
        //console.log({vis, groupG})
        result[vis[0].program] = {
            programName: vis[0].programName,
            groups: groupG,
        }
    })
    console.log({ groups, result })
    return result //groups
}

const getGroupName = () => {}

/*"program": {
    "IpHINAT79UW": [
        {
            "id": "0000000001",
            "name": "default",
            "visualizations": [
                {
                    "id": "cvOBhmU6Kwk",
                    "timestamp": "2021-07-01T02:55:16.8770"
                },
                {
                    "id": "ZxX6DSNoRcH",
                    "timestamp": "2021-07-01T02:55:16.8770"
                }
            ]
        }
    ]
}*/

/*
const group = {
    "IpHINAT79UW": [
        {
            id: "LzFiEpWnpkz",
            name: "aaa",
            timestamp: "2021-08-30T01:39:46.303Z",
            group: { id: "q2B0lNRikeG", name: "default" },
            program: "IpHINAT79UW"
        },
        {
            id: "a2IAFgfxJfd",
            name: "ccc",
            timestamp: "2021-08-30T01:39:46.303Z",
            group: { id: "fvjfyIh7i86", name: "default" },
            program: "IpHINAT79UW"
        }
    ],
    "eBAyeGv0exc": [
        {
            id: "nq15EbtILbX",
            name: "bbb",
            timestamp: "2021-08-30T01:39:46.303Z",
            group: { id: "t9Gi4TsF9tL", name: "default" },
            program: "eBAyeGv0exc"
        },
        {
            id: "LzFiEpWnpkz",
            name: "ddd",
            timestamp: "2021-08-30T01:39:46.303Z",
            group: { id: "t9Gi4TsF9tL", name: "default" },
            program: "eBAyeGv0exc"
        }
    ],
}
 */

/*
const result = {
    lxAQ7Zs9VYR: {
        groups: {
            123456: [
                {
                    id: "OqiwGhElnUX",
                    name: "",
                    group: { id: "2849298", name: "2849298" },
                    timestamp: "2021-08-30T13:26:54.535Z",
                    program: "IpHINAT79UW",
                }
            ],
            2849298: [
                {
                    id: "OqiwGhElnUX",
                    name: "",
                    group: { id: "2849298", name: "2849298" },
                    timestamp: "2021-08-30T13:26:54.535Z",
                    program: "IpHINAT79UW",
                },
                {
                    id: "OqiwGhElnUX",
                    name: "",
                    group: { id: "2849298", name: "2849298" },
                    timestamp: "2021-08-30T13:26:54.535Z",
                    program: "IpHINAT79UW",
                }
            ]
        }
    },
    IpHINAT79UW: {
        groups: {
            123456: [
                {
                    id: "OqiwGhElnUX",
                    name: "",
                    group: { id: "2849298", name: "2849298" },
                    timestamp: "2021-08-30T13:26:54.535Z",
                    program: "IpHINAT79UW",
                }
            ],
            2849298: [
                {
                    id: "OqiwGhElnUX",
                    name: "",
                    group: { id: "2849298", name: "2849298" },
                    timestamp: "2021-08-30T13:26:54.535Z",
                    program: "IpHINAT79UW",
                },
                {
                    id: "OqiwGhElnUX",
                    name: "",
                    group: { id: "2849298", name: "2849298" },
                    timestamp: "2021-08-30T13:26:54.535Z",
                    program: "IpHINAT79UW",
                }
            ]
        }
    }
}
*/
