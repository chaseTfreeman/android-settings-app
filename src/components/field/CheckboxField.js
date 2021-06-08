import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { CheckboxField as UICheckboxField } from '@dhis2/ui'
import { FormSection } from './FormSection'

export const CheckboxField = ({
    label,
    helpText,
    name,
    checked,
    disabled,
    onChange,
}) => (
    <FormSection>
        <UICheckboxField
            label={label}
            helpText={helpText}
            name={name}
            checked={checked}
            disabled={disabled}
            type="checkbox"
            onChange={onChange}
        />
    </FormSection>
)

CheckboxField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
}
