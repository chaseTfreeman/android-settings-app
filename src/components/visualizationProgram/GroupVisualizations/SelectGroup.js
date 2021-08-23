import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { Radio } from '@dhis2/ui'
import styles from './GroupType.module.css'
import { SelectField } from '../../field'

const options = [
    {
        label: 'option1',
        value: '123456',
    },
    {
        label: 'option2',
        value: '2849298',
    },
]

export const SelectGroup = ({ checked, groupName, changeGroup, ...props }) => {
    const [selection, setSelection] = useState()

    useEffect(() => {
        setSelection('')
    }, [checked])

    const handleChange = e => {
        setSelection(e.selected)
        changeGroup({
            ...groupName,
            group: {
                name: e.selected,
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
