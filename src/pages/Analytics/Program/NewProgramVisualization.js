import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { AddNewSetting } from '../../../components/field'
import DialogVisualization from './DialogVisualization'
import { createInitialValues } from './helper'

const NewProgramVisualization = ({ disable }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [visualizationSettings, setSettings] = useState(
        createInitialValues('')
    )

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    return (
        <>
            <AddNewSetting
                label={i18n.t('Add Program Visualization')}
                onClick={handleOpenDialog}
                disable={disable}
            />

            {openDialog && (
                <DialogVisualization
                    open={openDialog}
                    settings={visualizationSettings}
                    handleChange={setSettings}
                />
            )}
        </>
    )
}

export default NewProgramVisualization
