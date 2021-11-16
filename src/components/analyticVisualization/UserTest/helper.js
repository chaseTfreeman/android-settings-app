/**
 * Check if user has all authorities
 * Check if visualization has authorities
 * Check if user is part of userGroup
 * Check if user is part of userAccess visualization
 * */

export const validateUserVisualization = () => {}

const userHasAuthority = user => {
    // user has all authorities
}

const visualizationHasPublicAccess = visualization => {
    console.log('valid public access', visualization.publicAccess.includes('r'))
}

const userGroupHasAccess = (visualization, user) => {
    // check user group access in
    const userGroupFound = visualization.userGroupAccesses.includes(user.id)
}

const userHasAccess = (visualization, user) => {
    // check user has access
    const userAccess = visualization.userAccesses.includes(user.id)
}
