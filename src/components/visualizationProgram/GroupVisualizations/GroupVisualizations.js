import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { CheckboxField } from '../../field'
import { GroupType } from './GroupType'

export const GroupVisualizations = ({ settings, onChange }) => {
    const [group, setGroup] = useState(false)
    const [groupType, setGroupType] = useState(false)

    const handleChange = e => {
        setGroup(e.checked)
        setGroupType(e.checked)
    }

    return (
        <>
            <CheckboxField
                name="group"
                label={i18n.t('Use a group visualization')}
                checked={group}
                onChange={handleChange}
            />

            {groupType && <GroupType />}
        </>
    )
}
