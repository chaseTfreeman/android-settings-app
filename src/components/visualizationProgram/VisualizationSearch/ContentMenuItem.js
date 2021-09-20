import React from 'react'
import { MenuItem, colors, IconCheckmark16, IconCross16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import { getItemIcon } from './itemTypes'
import classes from './styles/ContentMenuItem.module.css'

const ValidIcon = () => <IconCheckmark16 color={colors.green700} />

const InvalidIcon = () => <IconCross16 color={colors.red700} />

const ContentMenuItem = ({ type, name, onInsert, valid }) => {
    const ItemIcon = getItemIcon(type)
    //console.log('visualizations', {type, name, valid})
    const renderedItemIcon = <ItemIcon color={colors.grey600} />

    return (
        <MenuItem
            onClick={onInsert}
            icon={renderedItemIcon}
            label={
                <div className={classes.menuItem}>
                    <div className={classes.label}>
                        <span>{name}</span>
                    </div>
                    {valid ? <ValidIcon /> : <InvalidIcon />}
                </div>
            }
            dataTest={`menu-item-${name}`}
            disabled={!valid}
        />
    )
}

ContentMenuItem.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    onInsert: PropTypes.func,
    valid: PropTypes.bool,
}

export default ContentMenuItem
