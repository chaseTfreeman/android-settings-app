import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { CheckboxField } from '../../field'
import { GroupType } from './GroupType'
import { useSystemId } from '../../../utils/useSystemId'

export const GroupVisualizations = ({ settings, onChange }) => {
    const { refetch: refetchId, data: id } = useSystemId()
    const [group, setGroup] = useState(false)
    const [groupType, setGroupType] = useState(false)

    useEffect(() => {
        refetchId().then(({ system }) =>
            onChange({
                ...settings,
                group: {
                    name: 'default',
                    id: system.codes[0],
                },
            })
        )
    }, [])

    const handleChange = e => {
        setGroup(e.checked)
        setGroupType(e.checked)
        onChange({
            ...settings,
            [e.name]: e.checked
                ? {
                      name: '',
                      id: '',
                  }
                : {
                      name: 'default',
                      id: id.system.codes[0],
                  },
        })
    }

    return (
        <>
            <CheckboxField
                name="group"
                label={i18n.t('Use a group visualization')}
                checked={group}
                onChange={handleChange}
            />

            {groupType && <GroupType onChange={onChange} settings={settings} />}
        </>
    )
}
