import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { FieldSection } from '../field'
import { useReadProgramQuery } from '../../pages/Analytics/Program/ProgramVisualizationQueries'

export const SelectVisualization = () => {
    const { programList, loading } = useReadProgramQuery()
    const [program, setProgram] = useState()
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (programList) {
            setOptions(programList)
        }
    }, [programList])

    const handleChange = e => {
        setProgram(e.selected)
    }

    return (
        <FieldSection>
            <SingleSelectField
                dense
                name="visualization"
                inputWidth="300px"
                label={i18n.t('Visualization item')}
                selected={program || ''}
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
