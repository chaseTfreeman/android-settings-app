import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { AddNewSetting } from '../../../components/field'
import {
    createInitialValues,
    createVisualizationValues,
    getGroupList,
    updateRows,
    validMandatoryFields,
} from './helper'
import DialogVisualization from './DialogVisualization'

const NewDatasetVisualization = ({
    disable,
    visualization,
    handleVisualization,
    groups,
    handleGroups,
}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [visualizationSettings, setSettings] = useState(
        createInitialValues('')
    )
    const [disableSave, setDisableSave] = useState(true)

    useEffect(() => {
        setDisableSave(validMandatoryFields(visualizationSettings))
    }, [visualizationSettings])

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSettings(createInitialValues(''))
    }

    const handleSave = () => {
        const currentVisualization = createVisualizationValues(
            visualizationSettings
        )
        const updatedVisualizationList = updateRows(
            currentVisualization,
            visualization
        )
        handleVisualization(updatedVisualizationList)
        handleGroups(getGroupList(updatedVisualizationList))
        handleClose()
    }

    return (
        <>
            <AddNewSetting
                label={i18n.t('Add Data set Visualization')}
                onClick={handleOpenDialog}
                disable={disable}
            />

            {openDialog && (
                <DialogVisualization
                    open={openDialog}
                    settings={visualizationSettings}
                    handleChange={setSettings}
                    handleSave={handleSave}
                    handleClose={handleClose}
                    disableSave={disableSave}
                    groups={groups}
                />
            )}
        </>
    )
}

export default NewDatasetVisualization
