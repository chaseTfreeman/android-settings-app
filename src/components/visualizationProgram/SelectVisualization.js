import React from 'react'
import PropTypes from 'prop-types'
import ItemSelector from './VisualizationSearch/ItemSelector'

export const SelectVisualization = ({ settings, onChange }) => {
    const handleChange = e => {
        console.log('on change', { e })
        onChange({
            ...settings,
            visualization: e.id,
            visualizationName: e.name || e.displayName,
        })
    }

    const clearSelection = () => {
        onChange({
            ...settings,
            visualizations: '',
            visualizationName: '',
        })
    }

    return (
        <ItemSelector
            setSelection={handleChange}
            clearSelection={clearSelection}
        />
    )
}

SelectVisualization.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
