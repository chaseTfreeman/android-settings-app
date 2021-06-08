import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { InputField } from '@dhis2/ui'
import { FormSection } from '../field'

export const TextField = ({ value, onChange, ...props }) => (
    <FormSection>
        <InputField
            dense
            inputWidth="300px"
            onChange={onChange}
            value={value}
            {...props}
        />
    </FormSection>
)

TextField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
}
