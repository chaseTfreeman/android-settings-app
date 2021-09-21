import React from 'react'
import PropTypes from 'prop-types'
import ItemSelector from './VisualizationSearch/ItemSelector'
import { FieldSection } from '../field'

export const SelectVisualization = ({ settings, onChange }) => {
    const handleChange = e => {
        onChange({
            ...settings,
            visualization: e.id,
            visualizationName: e.name || e.displayName,
        })
    }

    const clearSelection = () => {
        onChange({
            ...settings,
            visualization: '',
            visualizationName: '',
        })
    }

    return (
        <FieldSection>
            <ItemSelector
                setSelection={handleChange}
                clearSelection={clearSelection}
            />
        </FieldSection>
    )
}

SelectVisualization.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
