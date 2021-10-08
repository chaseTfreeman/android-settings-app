import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'

export const removeElement = (elementList, elementId) =>
    omit(elementList, [elementId])

export const updateElement = (elementList, elementId, updatedElement) =>
    Object.assign({}, elementList, {
        [elementId]: updatedElement,
    })

export const updateGroup = (elementList, elementId, updatedElement) =>
    !isEmpty(updatedElement)
        ? updateElement(elementList, elementId, updatedElement)
        : removeElement(elementList, elementId)
