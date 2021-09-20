import {
    LAST_12_MONTHS,
    LAST_12_WEEKS,
    LAST_14_DAYS,
    LAST_30_DAYS,
    LAST_3_DAYS,
    LAST_3_MONTHS,
    LAST_4_QUARTERS,
    LAST_4_WEEKS,
    LAST_5_YEAR,
    LAST_6_MONTHS,
    LAST_7_DAYS,
    LAST_MONTH,
    LAST_QUARTER,
    LAST_WEEK,
    LAST_YEAR,
    MONTHS_THIS_YEAR,
    QUARTERS_THIS_YEAR,
    THIS_MONTH,
    THIS_QUARTER,
    THIS_WEEK,
    THIS_YEAR,
    TODAY,
    YESTERDAY,
} from './periods'
//import {itemTypeMap} from "./itemTypes";

const PIVOT_TABLE = 'PIVOT_TABLE'
const SINGLE_VALUE = 'SINGLE_VALUE'
const LINE = 'LINE'
const COLUMN = 'COLUMN'
const PIE = 'PIE'

export const validateAndroidVisualization = visualizations => {
    console.log({ visualizations })
    //return visualizations.map( visualization => checkVisualizationType(visualization))
    return visualizations.map(visualization =>
        checkVisualizationType(visualization)
    )
}

const checkVisualizationType = visualization => {
    switch (visualization.type) {
        case PIVOT_TABLE:
            visualization.valid = true
            //console.log('visualization', {visualization})
            return true
        case LINE:
            visualization.valid = true
            return true
        case COLUMN:
            visualization.valid = true
            return true
        case PIE:
            visualization.valid = true
            return true
        case SINGLE_VALUE:
            visualization.valid = true
            return true
        default:
            visualization.valid = false
            return true
    }
}

const isPivotValid = visualization => {
    /*if (visualization.relativePeriods) {

    }*/
    //visualization.relativePeriods[]
}

const visualizationTypeMap = {
    [PIVOT_TABLE]: {
        relativePeriods: [
            TODAY,
            YESTERDAY,
            LAST_3_DAYS,
            LAST_7_DAYS,
            LAST_14_DAYS,
            LAST_30_DAYS,
            THIS_WEEK,
            LAST_WEEK,
            LAST_4_WEEKS,
            LAST_12_WEEKS,
            THIS_MONTH,
            LAST_MONTH,
            LAST_3_MONTHS,
            LAST_6_MONTHS,
            LAST_12_MONTHS,
            MONTHS_THIS_YEAR,
            THIS_QUARTER,
            LAST_QUARTER,
            LAST_4_QUARTERS,
            QUARTERS_THIS_YEAR,
            THIS_YEAR,
            LAST_YEAR,
            LAST_5_YEAR,
        ],
        headers: 2,
        columns: 2,
    },
    [LINE]: {
        relativePeriods: [
            TODAY,
            YESTERDAY,
            LAST_3_DAYS,
            LAST_7_DAYS,
            LAST_14_DAYS,
            LAST_30_DAYS,
            THIS_WEEK,
            LAST_WEEK,
            LAST_4_WEEKS,
            LAST_12_WEEKS,
            THIS_MONTH,
            LAST_MONTH,
            LAST_3_MONTHS,
            LAST_6_MONTHS,
            LAST_12_MONTHS,
            MONTHS_THIS_YEAR,
            THIS_QUARTER,
            LAST_QUARTER,
            LAST_4_QUARTERS,
            QUARTERS_THIS_YEAR,
            THIS_YEAR,
            LAST_YEAR,
            LAST_5_YEAR,
        ],
    },
    [COLUMN]: {
        relativePeriods: [
            TODAY,
            YESTERDAY,
            LAST_3_DAYS,
            LAST_7_DAYS,
            LAST_14_DAYS,
            LAST_30_DAYS,
            THIS_WEEK,
            LAST_WEEK,
            LAST_4_WEEKS,
            LAST_12_WEEKS,
            THIS_MONTH,
            LAST_MONTH,
            LAST_3_MONTHS,
            LAST_6_MONTHS,
            LAST_12_MONTHS,
            MONTHS_THIS_YEAR,
            THIS_QUARTER,
            LAST_QUARTER,
            LAST_4_QUARTERS,
            QUARTERS_THIS_YEAR,
            THIS_YEAR,
            LAST_YEAR,
            LAST_5_YEAR,
        ],
    },
    [PIE]: {
        relativePeriods: [
            TODAY,
            YESTERDAY,
            LAST_3_DAYS,
            LAST_7_DAYS,
            LAST_14_DAYS,
            LAST_30_DAYS,
            THIS_WEEK,
            LAST_WEEK,
            LAST_4_WEEKS,
            LAST_12_WEEKS,
            THIS_MONTH,
            LAST_MONTH,
            LAST_3_MONTHS,
            LAST_6_MONTHS,
            LAST_12_MONTHS,
            MONTHS_THIS_YEAR,
            THIS_QUARTER,
            LAST_QUARTER,
            LAST_4_QUARTERS,
            QUARTERS_THIS_YEAR,
            THIS_YEAR,
            LAST_YEAR,
            LAST_5_YEAR,
        ],
    },
    [SINGLE_VALUE]: {
        relativePeriods: [
            TODAY,
            YESTERDAY,
            LAST_3_DAYS,
            LAST_7_DAYS,
            LAST_14_DAYS,
            LAST_30_DAYS,
            THIS_WEEK,
            LAST_WEEK,
            LAST_4_WEEKS,
            LAST_12_WEEKS,
            THIS_MONTH,
            LAST_MONTH,
            LAST_3_MONTHS,
            LAST_6_MONTHS,
            LAST_12_MONTHS,
            MONTHS_THIS_YEAR,
            THIS_QUARTER,
            LAST_QUARTER,
            LAST_4_QUARTERS,
            QUARTERS_THIS_YEAR,
            THIS_YEAR,
            LAST_YEAR,
            LAST_5_YEAR,
        ],
    },
}

/**
 * A valid array it is consider if every value is valid.
 *
 * A valid value it is consider if:
 * value == true
 * length > 0
 * */

/*export const validateObjectByProperty = (propertyArray, object) =>
    propertyArray.every(property => isValidValue(object[property]) === true)*/

const isVisualizationType = item =>
    !!visualizationTypeMap[item.type].isVisualizationType

/*export const hasMapView = itemType =>
    visualizationTypeMap[itemType].domainType === DOMAIN_TYPE_AGGREGATE*/
/*export const isTrackerDomainType = itemType =>
    visualizationTypeMap[itemType].domainType === DOMAIN_TYPE_TRACKER*/
const getDefaultItemCount = itemType =>
    visualizationTypeMap[itemType].defaultItemCount || 5
//export const getAppName = itemType => visualizationTypeMap[itemType].appName || ''

//create validation using some()

/*
* const ages = [3, 10, 18, 20];

ages.some(checkAdult)   // Returns true

function checkAdult(age) {
  return age >= 18;
}
* */
