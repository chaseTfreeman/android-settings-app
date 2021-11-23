import React from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    TableBody,
    DataTableRow,
    DataTableCell,
    CircularLoader,
} from '@dhis2/ui'
import { testAndroidDataConstants } from '../../../constants/test-android'
import classes from './TestTable.module.css'

const TestResult = ({ load, state, test }) => (
    <>
        {load ? (
            <CircularLoader small />
        ) : (
            <p
                className={cx(classes.mainItem, {
                    [classes.maxValue]: state[test.state] >= test.maxValue,
                })}
            >
                {state[test.state]}
            </p>
        )}
    </>
)

const TestRow = ({ test, load, state }) => (
    <DataTableRow>
        <DataTableCell large className={classes.tableCell}>
            <TestResult load={load} state={state} test={test} />
        </DataTableCell>
        <DataTableCell large className={classes.tableCell}>
            <p className={classes.subItemTitle}>{test.title}</p>
        </DataTableCell>
        <DataTableCell large className={classes.tableCell}>
            <p className={classes.subItemItem}>
                {i18n.t('Recommended maximum: {{maxValue}}', {
                    nsSeparator: '---',
                    maxValue: test.maxValue,
                })}
            </p>
        </DataTableCell>
    </DataTableRow>
)

const TestTable = ({ loading, state }) => {
    return (
        <div className={classes.topMargin}>
            <DataTable className={classes.table}>
                <TableBody>
                    {testAndroidDataConstants.map(test => (
                        <TestRow
                            test={test}
                            key={test.state}
                            load={loading}
                            state={state}
                        />
                    ))}
                </TableBody>
            </DataTable>
        </div>
    )
}

export default TestTable
