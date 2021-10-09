import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import DialogDelete from '../../dialog/DialogDelete'
import DialogDeleteInfo from '../../dialog/DialogDeleteInfo'
import { ElementGroupTable } from './ElementGroupTable'
import { removeElement, updateGroup } from './helper'
import { removeSettingsFromList } from '../../../utils/utils'

export const DatasetTable = ({ rows, changeRows }) => {
    const [openDeleteDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [group, setGroup] = useState([])
    const [openDeleteGroup, setDeleteGroup] = useState(false)
    const [elementName, setName] = useState()

    const menuActions = {
        edit: (...arg) => {
            console.log('edit', { arg })
        },
        delete: (row, group) => {
            setSpecificSetting(row)
            setGroup(group)
            setName(row.name)
            setOpenDialog(true)
        },
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
        setSpecificSetting({})
        setGroup([])
        setName('')
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, group)
        const { dataset, group: datasetGroup } = specificSetting
        const updatedGroups = updateGroup(
            rows[dataset].groups,
            datasetGroup.id,
            updatedList
        )

        changeRows({
            ...rows,
            [dataset]: {
                ...rows[dataset],
                groups: updatedGroups,
            },
        })
        handleDialogClose()
    }

    const handleDeleteGroup = () => {
        const visualizations = Object.assign({}, rows)
        const currentDatasetGroups = visualizations[group].groups
        const updatedGroupList = removeElement(
            currentDatasetGroups,
            specificSetting
        )

        changeRows({
            ...rows,
            [group]: {
                ...rows[group],
                groups: updatedGroupList,
            },
        })
        handleCloseDeleteGroup()
    }

    const handleCloseDeleteGroup = () => {
        setDeleteGroup(false)
        setSpecificSetting({})
        setGroup([])
        setName('')
    }

    const deleteGroup = (item, datasetId) => {
        setName(rows[datasetId].groups[item][0].group.name)
        setSpecificSetting(item)
        setGroup(datasetId)
        setDeleteGroup(true)
    }

    return (
        <>
            <ElementGroupTable
                element="dataset"
                rows={rows}
                menuActions={menuActions}
                deleteGroup={deleteGroup}
            />
            <DialogDelete
                open={openDeleteDialog}
                onHandleDelete={handleDelete}
                onHandleClose={handleDialogClose}
                typeName={i18n.t('Visualization')}
                name={elementName}
            />
            <DialogDeleteInfo
                open={openDeleteGroup}
                onHandleClose={handleCloseDeleteGroup}
                onHandleDelete={handleDeleteGroup}
                element={i18n.t('Visualization Group')}
                text={i18n.t(
                    'Are you sure you want to delete {{elementName}} visualization group?',
                    { elementName: elementName }
                )}
            />
        </>
    )
}

DatasetTable.propTypes = {
    rows: PropTypes.object,
    changeRows: PropTypes.func,
}
