import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { FieldGroup, Radio } from '@dhis2/ui'
import { SelectField, TextField } from '../../field'
import styles from './GroupType.module.css'

export const GroupType = ({ onChange, settings }) => {
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
                groupName={settings}
                changeGroup={onChange}
            />
        </div>
    )
}

const NewGroup = ({ checked, groupName, changeGroup, ...props }) => {
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTitle('')
    }, [checked])

    const handleChange = e => {
        setTitle(e.value)
        changeGroup({
            ...groupName,
            group: {
                name: e.value,
                id: '',
            },
        })
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

const SelectGroup = ({ checked, groupName, changeGroup, ...props }) => {
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

const RadioGroup = ({ onChange, value, groupName, changeGroup, ...props }) => {
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
                        groupName={groupName}
                        changeGroup={changeGroup}
                    />

                    <SelectGroup
                        dense
                        onChange={onChange}
                        name="existingGroup"
                        label={i18n.t('Select a created group visualization')}
                        value="existingGroup"
                        checked={optionSelection['existingGroup']}
                        groupName={groupName}
                        changeGroup={changeGroup}
                    />
                </>
            </FieldGroup>
        </>
    )
}
