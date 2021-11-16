import find from 'lodash/find'
/**
 *
 * Check if visualization has authorities
 * Check if user is part of userGroup
 * Check if user is part of userAccess visualization
 * */

export const validateUserVisualization = (user, visualization) => {
    if (visualizationHasPublicAccess(visualization)) {
        return true
    } else {
    }

    console.log(
        'is valid?',
        visualizationHasPublicAccess(visualization),
        userGroupHasAccess(visualization, user)
    )
}

const visualizationHasPublicAccess = visualization => {
    console.log('valid public access', visualization.publicAccess.includes('r'))
    return visualization.publicAccess.includes('r')
}

const userGroupHasAccess = (visualization, user) => {
    // check user group access in
    //const userGroupFound = find(visualization.userGroupAccesses, {id: user.userGroups})
    //visualization.userGroupAccesses.includes(user.id)
    let userGroupFound
    if (user.userGroups) {
        userGroupFound = user.userGroups.map(group =>
            visualization.userGroupAccesses.includes(group.id)
        )
    }

    console.log('groups', { userGroupFound, visualization, user })
}

const userHasAccess = (visualization, user) => {
    // check user has access
    const userAccess = visualization.userAccesses.includes(user.id)
}
