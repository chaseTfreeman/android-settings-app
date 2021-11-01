import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import ContentMenuItem from './ContentMenuItem'
import { MenuItem } from '@dhis2/ui'
import classes from './styles/ContentMenuGroup.module.css'

const ContentMenuGroup = ({ items, hasMore, onChangeItemsLimit, addItem }) => {
    const [seeMore, setSeeMore] = useState(false)

    const toggleSeeMore = () => {
        setSeeMore(!seeMore)
        onChangeItemsLimit(!seeMore)
    }

    return (
        <>
            {items.map(item => (
                <ContentMenuItem
                    key={item.id || item.key}
                    name={item.displayName || item.name}
                    onInsert={addItem(item)}
                    type={item.type}
                    valid={item.valid}
                />
            ))}

            {hasMore ? (
                <MenuItem
                    dense
                    onClick={toggleSeeMore}
                    label={
                        <button className={classes.showMoreButton}>
                            {seeMore
                                ? i18n.t('Show fewer')
                                : i18n.t('Show more')}
                        </button>
                    }
                />
            ) : null}
        </>
    )
}

ContentMenuGroup.propTypes = {
    items: PropTypes.array,
    hasMore: PropTypes.bool,
    onChangeItemsLimit: PropTypes.func,
    addItem: PropTypes.func,
}

export default ContentMenuGroup
