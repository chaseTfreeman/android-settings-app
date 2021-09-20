import React, { useState, useEffect, createRef } from 'react'
import { Popover, FlyoutMenu, Input } from '@dhis2/ui'
import { useDataEngine } from '@dhis2/app-runtime'
import ItemSearchField from './ItemSearchField'
import ContentMenuItem from './ContentMenuItem'
import { getDashboardsQQuery } from './visualizationQuery'
import { validateAndroidVisualization } from './helper'
import useDebounce from '../../../utils/useDebounce'
import classes from './styles/ItemSelector.module.css'

const ItemSelector = ({ setSelection, clearSelection }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [filter, setFilter] = useState('')
    const [items, setItems] = useState(null)
    const [maxOptions, setMaxOptions] = useState(new Set())
    const [disableFields, setDisable] = useState(false)
    const dataEngine = useDataEngine()
    const debouncedFilterText = useDebounce(filter, 350)

    useEffect(() => {
        const text =
            debouncedFilterText.length >= 3 ? debouncedFilterText : null
        const query = getDashboardsQQuery(text, Array.from(maxOptions))

        dataEngine.query({ items: query }).then(res => {
            validateAndroidVisualization(res.items.visualizations)
            setItems(res.items.visualizations)
        })
    }, [debouncedFilterText, maxOptions])

    const closeMenu = () => {
        setIsOpen(false)
        setFilter('')
        //selection('')
        clearSelection()
        setMaxOptions(new Set())
    }

    const openMenu = () => setIsOpen(true)

    const addItem = item => () => {
        console.log('add item', { item })
        setDisable(true)
        closeMenu()
        setFilter(item.name || item.displayName)
        //selection(item.id)
        setSelection(item)
    }

    const clearField = () => {
        closeMenu()
        setDisable(false)
    }

    const getMenus = () => {
        const displayItems = items.slice(0, 5)

        return displayItems.map(item => (
            <ContentMenuItem
                key={item.id || item.key}
                name={item.displayName || item.name}
                onInsert={addItem(item)}
                type={item.type}
                valid={item.valid}
            />
        ))
    }

    const getItems = () => getMenus()

    const updateFilter = ({ value }) => setFilter(value)

    const inputRef = createRef()

    return (
        <>
            <span ref={inputRef}>
                <ItemSearchField
                    value={filter}
                    onChange={updateFilter}
                    onFocus={openMenu}
                    onClear={clearField}
                    disabled={disableFields}
                />
            </span>
            {isOpen && (
                <Popover
                    reference={inputRef}
                    placement="bottom-start"
                    onClickOutside={closeMenu}
                    arrow={false}
                    maxWidth={700}
                >
                    <div className={classes.popover}>
                        <FlyoutMenu
                            className={classes.menu}
                            dataTest="item-menu"
                            maxWidth="700px"
                        >
                            {getItems()}
                        </FlyoutMenu>
                    </div>
                </Popover>
            )}
        </>
    )
}

export default ItemSelector
