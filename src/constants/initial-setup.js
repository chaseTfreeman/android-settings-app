import {
    DEFAULT_GENERAL,
    populateObject,
} from '../modules/populateDefaultSettings'
import { syncDefault } from './sync-settings'
import { infoDefault } from './info'
import { appearanceDefault } from './appearance-settings'
import { analyticsDefault } from './analytics-settings'

export const initialSetup = {
    info: infoDefault,
    generalSettings: populateObject(DEFAULT_GENERAL),
    synchronization: syncDefault,
    appearance: appearanceDefault,
    analytics: analyticsDefault,
}
