export const getUserQuery = (query = '', maxItems = []) => {
    return {
        resource: `users`,
        params: {
            query,
            count: 11,
            max: maxItems,
            fields: 'id,name,userCredentials,userGroups',
            order: 'name:asc',
        },
    }
}
