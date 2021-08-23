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
        name: value.name,
        timestamp: new Date().toJSON(),
        program: value.program,
        group: {
            id: value.group.id,
            name: value.group.name,
        },
    }
    return visualization
}

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
