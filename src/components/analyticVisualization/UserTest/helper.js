import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

export const validateUserVisualization = (user, visualization) =>
    visualizationHasPublicAccess(visualization) ||
    userGroupHasAccess(visualization, user) ||
    userHasAccess(visualization, user)

/**
 * User has at least read access to a visualization
 * */
const visualizationHasPublicAccess = visualization =>
    visualization.publicAccess.indexOf('r') === 0

/**
 * Check if a user belongs to user Group that has access to a visualization
 * */
const userGroupHasAccess = (visualization, user) => {
    const groupAccessList = user.userGroups.map(group =>
        visualization.userGroupAccesses.includes(group.id)
    )
    return groupAccessList.some(access => access === true)
}

/**
 * Check if user has access to a visualization
 * */
const userHasAccess = (visualization, user) =>
    !isEmpty(find(visualization.userAccesses, { id: user.id }))
