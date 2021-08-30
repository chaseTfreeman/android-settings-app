import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { FieldSection } from '../field'

const list = [
    {
        id: '1',
        name: 'dashboard 1',
    },
    {
        id: '2',
        name: 'bar chart 1',
    },
    {
        id: '3',
        name: 'lines 1',
    },
    {
        id: '4',
        name: 'dashboard 2',
    },
    {
        id: '5',
        name: 'pie 1',
    },
]

export const SelectVisualization = ({ settings, onChange }) => {
    //const { programList, loading } = useReadProgramQuery()
    //const [options, setOptions] = useState([])

    /*useEffect(() => {
        if (programList) {
            setOptions(programList)
        }
    }, [programList])*/

    const handleChange = e => {
        const vis = list.find(item => item.id === e.selected)
        onChange({
            ...settings,
            visualization: e.selected,
            visualizationName: vis.name,
        })
    }

    return (
        <FieldSection>
            <SingleSelectField
                dense
                name="visualization"
                inputWidth="300px"
                label={i18n.t('Visualization item')}
                selected={settings.visualization || ''}
                onChange={e => handleChange(e)}
                //loading={loading}
            >
                {list.map(option => (
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
