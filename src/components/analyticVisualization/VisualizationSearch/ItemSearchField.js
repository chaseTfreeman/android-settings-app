import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { InputField, Button } from '@dhis2/ui'
import classes from './styles/ItemSearchField.module.css'

const ItemSearchField = ({ value, disabled, onChange, onFocus, onClear }) => {
    return (
        <div>
            <InputField
                name="visualization"
                label={i18n.t('Visualization item')}
                type="text"
                onChange={onChange}
                onFocus={onFocus}
                value={value}
                disabled={disabled}
                dataTest="item-search"
                inputWidth="400px"
                dense
                className={classes.field}
            />

            <Button small onClick={onClear} className={classes.field}>
                {i18n.t('Clear')}
            </Button>
        </div>
    )
}

ItemSearchField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onClear: PropTypes.func,
    disabled: PropTypes.bool,
}

export default ItemSearchField
