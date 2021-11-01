export const getDashboardsQQuery = (query = '') => {
    return {
        resource: `visualizations`,
        params: {
            query,
            count: 11,
            fields:
                'id,displayName,type,relativePeriods,rowDimensions,columnDimensions,userOrganisationUnit,userOrganisationUnitChildren,userOrganisationUnitGrandChildren',
            order: 'displayName:asc',
        },
    }
}
