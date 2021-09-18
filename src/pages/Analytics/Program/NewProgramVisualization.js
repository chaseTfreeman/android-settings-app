import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { AddNewSetting } from '../../../components/field'
import DialogVisualization from './DialogVisualization'
import {
    createInitialValues,
    createVisualizationValues,
    dataStoreToRows,
    getGroupList,
    groupVisualizationByProgram,
    updateRows,
    validMandatoryFields,
} from './helper'
import { useSystemId } from '../../../utils/useSystemId'

const NewProgramVisualization = ({
    disable,
    visualization,
    handleVisualization,
    groups,
    handleGroups,
}) => {
    const { refetch: refetchId, data: id } = useSystemId()
    const [openDialog, setOpenDialog] = useState(false)
    const [visualizationSettings, setSettings] = useState(
        createInitialValues('')
    )
    const [disableSave, setDisableSave] = useState(true)
    const [rows, setRows] = useState()

    useEffect(() => {
        setDisableSave(validMandatoryFields(visualizationSettings))
    }, [visualizationSettings])

    useEffect(() => {
        console.log('in new program', { visualization })
    }, [visualization])

    useEffect(() => {
        console.log('change rows in new program', { rows, visualization })
    }, [rows])

    const handleOpenDialog = () => {
        setOpenDialog(true)
        refetchId()
    }

    const handleClose = () => {
        setOpenDialog(false)
        setSettings(createInitialValues(''))
    }

    const handleSave = () => {
        const currentVisualization = createVisualizationValues(
            visualizationSettings,
            id.system.codes[0]
        )

        /*const updatedVisualizationList = {
            ...visualization,
            [id.system.codes[0]]: currentVisualization,
        }*/

        const updatedVisualizationList = updateRows(
            currentVisualization,
            visualization
        )

        //handleVisualization(updateRows(currentVisualization, visualization))
        handleVisualization(updatedVisualizationList)
        handleGroups(getGroupList(updatedVisualizationList))
        handleClose()

        // review update
        /* const rowsUp = dataStoreToRows({ ...updatedVisualizationList })
        const { groupProgram, groupList } = groupVisualizationByProgram(
            //{ ...updatedVisualizationList }
            rowsUp
        )
        handleVisualization(groupProgram)
        handleGroups(groupList)*/

        // handleClose()
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
                    handleSave={handleSave}
                    handleClose={handleClose}
                    disableSave={disableSave}
                    groups={groups}
                />
            )}
        </>
    )
}

export default NewProgramVisualization
