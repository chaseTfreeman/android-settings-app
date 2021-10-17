import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { Radio } from '@dhis2/ui'
import { SelectField } from '../../field'
import styles from './GroupField.module.css'

export const SelectGroup = ({
    checked,
    groupName,
    changeGroup,
    options,
    elementType,
    ...props
}) => {
    const [selection, setSelection] = useState()

    useEffect(() => {
        setSelection('')
    }, [checked, groupName[elementType]])

    const handleChange = e => {
        const value = options.find(group => group.id === e.selected)
        setSelection(e.selected)
        changeGroup({
            ...groupName,
            group: {
                name: value.label || value.name,
                id: e.selected,
            },
        })
    }

    return (
        <>
            <Radio checked={checked} {...props} />

            {checked && (
                <div className={styles.field}>
                    <SelectField
                        dense
                        placeholder={i18n.t('Select a group visualization')}
                        selected={selection}
                        onChange={handleChange}
                        options={options}
                    />
                </div>
            )}
        </>
    )
}
