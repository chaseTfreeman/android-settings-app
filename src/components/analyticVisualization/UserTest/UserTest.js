import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { Button, Divider } from '@dhis2/ui'
import ItemSelector from './ItemSelector'
import { useReadVisualizationsQuery } from './visualizationQuery'
import { validateUserVisualization } from './helper'

export const UserTest = ({ visualization }) => {
    const { refetch, loading, data } = useReadVisualizationsQuery({
        visualizationId: visualization,
    })
    const [user, setUser] = useState()

    const handleChange = () => {
        validateUserVisualization(user, data.visualizations)
        console.log('run', { user, visualization, data })
    }

    const style = {
        marginTop: 20,
    }

    return (
        <>
            <Divider margin="30px 0px 10px 0px" />
            <p> {i18n.t('Visualization user test')} </p>

            <ItemSelector selection={setUser} />

            {!loading && <p> its ready </p>}

            <div style={style}>
                <Button small onClick={handleChange}>
                    {i18n.t('Run test')}
                </Button>
            </div>
        </>
    )
}
