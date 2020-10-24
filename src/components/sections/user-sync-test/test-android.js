import React from 'react'

import PropTypes from 'prop-types'
import { Button } from '@dhis2/ui-core'
import TextFieldSearch from '../../text-field-search'
import i18n from '@dhis2/d2-i18n'
import titleStyles from '../../../styles/LayoutTitles.module.css'
import buttonStyles from '../../../styles/Button.module.css'
import RunTest from './run-test'
import { D2Shim } from '../../../utils/D2Shim'

const TestAndroid = ({
    checkUsername,
    clearSearchField,
    searchFieldValue,
    runTest,
    handleRun,
    disabledTest,
    maxValues,
    loadValues,
    testValues,
}) => (
    <div>
        <div>
            <p className={titleStyles.mainContent__title__main}>
                {i18n.t('User sync test')}
            </p>
            <p className={titleStyles.mainContent__subtitle}>
                {i18n.t(
                    'Check the amount of data a user would sync to their device.'
                )}
            </p>
        </div>

        <div>
            <D2Shim>
                <TextFieldSearch
                    checkUsername={checkUsername}
                    clearFields={clearSearchField}
                    suggestionPreSelected={searchFieldValue}
                />
            </D2Shim>

            {runTest && (
                <RunTest
                    maxValues={maxValues}
                    loadValues={loadValues}
                    testValues={testValues}
                />
            )}

            <Button
                className={buttonStyles.button__add}
                onClick={handleRun}
                disabled={disabledTest}
            >
                {i18n.t('Run test')}
            </Button>
        </div>
    </div>
)

TestAndroid.propTypes = {
    checkUsername: PropTypes.func.isRequired,
    clearSearchField: PropTypes.func.isRequired,
    searchFieldValue: PropTypes.string.isRequired,
    runTest: PropTypes.bool.isRequired,
    handleRun: PropTypes.func.isRequired,
    disabledTest: PropTypes.bool.isRequired,
    maxValues: PropTypes.object.isRequired,
    loadValues: PropTypes.object.isRequired,
    testValues: PropTypes.object.isRequired,
}

export default TestAndroid
