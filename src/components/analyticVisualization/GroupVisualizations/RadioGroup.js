import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { FieldGroup } from '@dhis2/ui'
import { NewGroup } from './NewGroup'
import { SelectGroup } from './SelectGroup'

export const RadioGroup = ({
    onChange,
    value,
    groupName,
    changeGroup,
    groups,
    type,
    ...props
}) => {
    const [optionSelection, setOptionSelection] = useState('')
    const [groupOptions, setGroupOptions] = useState()

    useEffect(() => {
        if (value) {
            setOptionSelection({
                [value]: true,
            })
        }
    }, [value])

    useEffect(() => {
        if (groups) {
            const element = Object.keys(groups).find(
                item => item === groupName[type]
            )
            setGroupOptions(groups[element])
            type ? setGroupOptions(groups[element]) : setGroupOptions(groups)
        }
    }, [groups])

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

                    {groupOptions && (
                        <SelectGroup
                            dense
                            onChange={onChange}
                            name="existingGroup"
                            label={i18n.t(
                                'Select a created group visualization'
                            )}
                            value="existingGroup"
                            checked={optionSelection['existingGroup']}
                            groupName={groupName}
                            changeGroup={changeGroup}
                            options={groupOptions}
                        />
                    )}
                </>
            </FieldGroup>
        </>
    )
}

RadioGroup.propTypes = {
    onChange: PropTypes.func,
}
