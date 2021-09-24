import React from 'react'
import PropTypes from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { FieldSection } from './FieldSection'

export const VisualizationSelectField = ({
    label,
    options,
    onChange,
    ...props
}) => (
    <FieldSection>
        <SingleSelectField
            dense
            inputWidth="350px"
            label={label}
            onChange={e => onChange(e)}
            {...props}
        >
            {options.map(option => (
                <SingleSelectOption
                    key={option.value || option.id}
                    label={option.label || option.name}
                    value={option.value || option.id}
                />
            ))}
        </SingleSelectField>
    </FieldSection>
)

VisualizationSelectField.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
}
