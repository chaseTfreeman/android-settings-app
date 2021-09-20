export const getDashboardsQQuery = (query = '', maxItems = []) => {
    return {
        resource: `visualizations`,
        params: {
            query,
            count: 11,
            max: maxItems,
            fields: 'id,displayName,type,relativePeriods',
            order: 'displayName:asc',
        },
    }
}
