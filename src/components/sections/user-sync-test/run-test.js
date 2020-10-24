import React from 'react'

import PropTypes from 'prop-types'
import { testAndroidDataConstants } from '../../../constants/test-android'
import itemStyles from '../../../styles/TestAndroidTable.module.css'
import layoutStyles from '../../../styles/Layout.module.css'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { CircularLoader } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'

const RunTest = ({ maxValues, loadValues, testValues }) => (
    <>
        <div className={layoutStyles.data__topMargin}>
            {testAndroidDataConstants.map(test => (
                <div key={test.state}>
                    <Grid container>
                        <Grid item xs={2}>
                            {loadValues[test.load] === true ? (
                                <CircularLoader small />
                            ) : (
                                <p
                                    className={cx(itemStyles.subItemBigItem, {
                                        [itemStyles.maxValue]:
                                            testValues[test.state] >=
                                            maxValues[test.maxValueState],
                                    })}
                                >
                                    {testValues[test.state]}
                                </p>
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            className={itemStyles.container_center}
                        >
                            <div className={itemStyles.container_items}>
                                <p className={itemStyles.subItemTitle}>
                                    {test.title}
                                </p>
                                <p className={itemStyles.subItemItem}>
                                    {i18n.t(
                                        'Recommended maximum: {{maxValue}}',
                                        {
                                            nsSeparator: '---',
                                            maxValue: test.maxValue,
                                        }
                                    )}
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider />
                </div>
            ))}
        </div>
    </>
)

RunTest.propTypes = {
    maxValues: PropTypes.object.isRequired,
    loadValues: PropTypes.object.isRequired,
    testValues: PropTypes.object.isRequired,
}
export default RunTest
