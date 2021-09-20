import React from 'react'
import {
    MenuItem,
    colors,
    IconLaunch16,
    IconCheckmark16,
    IconCross16,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { getItemIcon, VISUALIZATION } from './itemTypes'
import classes from './styles/ContentMenuItem.module.css'

const LaunchLink = ({ url }) => (
    <a
        onClick={e => e.stopPropagation()}
        className={classes.launchLink}
        target="_blank"
        rel="noopener noreferrer"
        href={url}
    >
        <IconLaunch16 color={colors.grey700} />
    </a>
)

LaunchLink.propTypes = {
    url: PropTypes.string,
}

const InsertButton = () => (
    <button className={classes.buttonInsert}>{i18n.t('Insert')}</button>
)

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
                    {/* <InsertButton /> */}
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
    //url: PropTypes.string,
    //visType: PropTypes.string,
    onInsert: PropTypes.func,
    valid: PropTypes.bool,
}

export default ContentMenuItem
