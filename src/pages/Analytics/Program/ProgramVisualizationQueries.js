import { useDataQuery } from '@dhis2/app-runtime'

const programsQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: ['id', 'name'],
            pager: false,
        },
    },
}

/**
 * Query to get program list
 * return only list of program with registration and repeatable program stage
 * */

export const useReadProgramQuery = () => {
    const { loading, data, error } = useDataQuery(programsQuery)

    return {
        loading,
        error,
        programList: data && data.programs.programs,
    }
}
