import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { FieldSection } from '../field'
import { useReadProgramQuery } from '../../pages/Analytics/Program/ProgramVisualizationQueries'

export const SelectProgram = ({ settings, onChange }) => {
    const { programList, loading } = useReadProgramQuery()
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (programList) {
            setOptions(programList)
        }
    }, [programList])

    const handleChange = e => {
        onChange({
            ...settings,
            program: e.selected,
        })
    }

    return (
        <FieldSection>
            <SingleSelectField
                dense
                name="program"
                inputWidth="350px"
                label={i18n.t('Program')}
                selected={settings.program || ''}
                onChange={e => handleChange(e)}
                loading={loading}
            >
                {options.map(option => (
                    <SingleSelectOption
                        key={option.value || option.id}
                        label={option.label || option.name}
                        value={option.value || option.id}
                    />
                ))}
            </SingleSelectField>
        </FieldSection>
    )
}
