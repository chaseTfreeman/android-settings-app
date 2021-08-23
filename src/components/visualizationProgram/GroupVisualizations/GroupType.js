import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { FieldGroup } from '@dhis2/ui'
import styles from './GroupType.module.css'
import { NewGroup } from './NewGroup'
import { SelectGroup } from './SelectGroup'

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
