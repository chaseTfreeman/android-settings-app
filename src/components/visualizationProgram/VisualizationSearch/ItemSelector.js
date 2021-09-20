import React, { useState, useEffect, createRef } from 'react'
import { Popover, FlyoutMenu, Input } from '@dhis2/ui'
import { useDataEngine } from '@dhis2/app-runtime'
import ItemSearchField from './ItemSearchField'
import ContentMenuItem from './ContentMenuItem'
import { getDashboardsQQuery } from './visualizationQuery'
import { validateAndroidVisualization } from './helper'
import useDebounce from '../../../utils/useDebounce'
import classes from './styles/ItemSelector.module.css'

const ItemSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [filter, setFilter] = useState('')
    const [items, setItems] = useState(null)
    const [maxOptions, setMaxOptions] = useState(new Set())
    const [isSelected, setIsSelected] = useState()
    const [selection, setSelection] = useState('')
    const dataEngine = useDataEngine()
    const debouncedFilterText = useDebounce(filter, 350)

    useEffect(() => {
        const text =
            debouncedFilterText.length >= 3 ? debouncedFilterText : null
        const query = getDashboardsQQuery(
            //debouncedFilterText,
            text,
            Array.from(maxOptions)
        )

        dataEngine.query({ items: query }).then(res => {
            validateAndroidVisualization(res.items.visualizations)
            setItems(res.items.visualizations)
        })
    }, [debouncedFilterText, maxOptions])

    const closeMenu = () => {
        setIsOpen(false)
        setFilter('')
        setMaxOptions(new Set())
    }

    const openMenu = () => setIsOpen(true)

    const addItem = item => {
        //console.log('add item', {item})
        /* if (debouncedFilterText) {
            setIsSelected(true)
            setSelection(item.name)
        }*/
    }

    const getMenus = () => {
        const displayItems = items.slice(0, 5)
        //console.log('display items', {displayItems})
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
            {isSelected && <Input value={selection} />}
        </>
    )
}

export default ItemSelector
