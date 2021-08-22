import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { FieldGroup, Radio } from '@dhis2/ui'
import { SelectField, TextField } from '../../field'
import styles from './GroupType.module.css'

export const GroupType = () => {
    const [group, setGroup] = useState()
    const handleChange = e => {
        setGroup(e.value)
    }

    return (
        <div className={styles.container}>
            <RadioGroup
                onChange={handleChange}
                value={group}
                name="groupVisualization"
            />
        </div>
    )
}

const NewGroup = ({ checked, ...props }) => {
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTitle('')
    }, [])

    const handleChange = e => {
        setTitle(e.value)
    }

    return (
        <>
            <Radio checked={checked} {...props} />

            {checked && (
                <div className={styles.field}>
                    <TextField
                        dense
                        value={title}
                        onChange={handleChange}
                        placeholder={i18n.t('Add a group name')}
                    />
                </div>
            )}
        </>
    )
}

const options = [
    {
        label: 'option1',
        value: '1',
    },
    {
        label: 'option2',
        value: '2',
    },
]
const SelectGroup = ({ checked, ...props }) => {
    const [selection, setSelection] = useState()
    const [list, setList] = useState(options)

    const handleChange = e => {
        setSelection(e.selected)
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
                        options={list}
                    />
                </div>
            )}
        </>
    )
}

const RadioGroup = ({ onChange, value, ...props }) => {
    const [optionSelection, setOptionSelection] = useState('')

    useEffect(() => {
        if (value) {
            setOptionSelection({
                [value]: true,
            })
        }
    }, [value])

    return (
        <>
            <FieldGroup {...props}>
                <>
                    <NewGroup
                        dense
                        onChange={onChange}
                        name="newGroup"
                        label={i18n.t('Create a new group')}
                        value="newGroup"
                        checked={optionSelection['newGroup']}
                    />

                    <SelectGroup
                        dense
                        onChange={onChange}
                        name="existingGroup"
                        label={i18n.t('Select a created group visualization')}
                        value="existingGroup"
                        checked={optionSelection['existingGroup']}
                    />
                </>
            </FieldGroup>
        </>
    )
}
