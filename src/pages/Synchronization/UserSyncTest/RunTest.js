import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { useDataEngine } from '@dhis2/app-runtime'
import TestTable from './TestTable'
import { AddNewSetting } from '../../../components/field'
import { runUserTest } from './helper'
import { useReadSettings } from './queries/userSyncQueries'

const RunTest = ({ disabled, user }) => {
    const dataEngine = useDataEngine()
    const { reservedValues } = useReadSettings()
    const [runTest, setRunTest] = useState(false)

    const testUser = () => {
        setRunTest(true)
        console.log(user)
        runUserTest(user, dataEngine, reservedValues)
    }

    return (
        <>
            {runTest && <TestTable />}

            <AddNewSetting
                label={i18n.t('Run test')}
                disable={disabled}
                onClick={testUser}
            />
        </>
    )
}

export default RunTest
