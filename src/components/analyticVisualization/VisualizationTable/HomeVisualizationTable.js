import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import {
    Button,
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import { VisualizationRow } from './VisualizationRow'
import DialogDelete from '../../dialog/DialogDelete'
import DialogDeleteInfo from '../../dialog/DialogDeleteInfo'
import { removeSettingsFromList } from '../../../utils/utils'
import { removeElementList, updateGroupList } from './helper'
import classes from './VisualizationTable.module.css'

export const HomeVisualizationTable = ({ group, changeGroup }) => {
    const [openDeleteDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    //const [openEditDialog, setOpenEditDialog] = useState(false)
    const [section, setSection] = useState([])
    const [openDeleteGroup, setDeleteGroup] = useState(false)
    const [elementName, setName] = useState()
    const [groupId, setGroupId] = useState()

    const menuActions = {
        edit: (...arg) => {
            console.log('edit', { arg })
        },
        delete: (row, currentGroup, groupId) => {
            setSpecificSetting(row)
            setSection(currentGroup)
            setGroupId(groupId)
            setName(row.name)
            setOpenDialog(true)
        },
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
        setSpecificSetting({})
        setSection([])
        setName('')
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, section)
        changeGroup(updateGroupList(group, groupId, updatedList))
        handleDialogClose()
    }

    const deleteGroup = item => {
        setName(item.name)
        setSpecificSetting(item)
        setDeleteGroup(true)
    }

    const handleCloseDeleteGroup = () => {
        setDeleteGroup(false)
        setSpecificSetting({})
        setName('')
    }

    const handleDeleteGroup = () => {
        changeGroup(removeElementList(group, specificSetting.id))
        handleCloseDeleteGroup()
    }

    return (
        <>
            <VisualizationTable
                group={group}
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

HomeVisualizationTable.propTypes = {
    group: PropTypes.array,
    changeGroup: PropTypes.func,
}

const VisualizationTable = ({ group, menuActions, deleteGroup }) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => (
        <VisualizationRow
            visualizations={item.visualizations}
            menuActions={menuActions}
            id={item.id}
        />
    )

    return (
        <DataTable>
            <DataTableBody>
                {group.map((item, i) => (
                    <DataTableRow
                        expanded={openRowIndex === i}
                        onExpandToggle={() => toggleOpenRow(i)}
                        expandableContent={expandableContent(item)}
                        key={item.id}
                    >
                        <DataTableCell className={classes.title}>
                            {item.name === 'default' ? '' : item.name}
                        </DataTableCell>
                        <DataTableCell />
                        <DataTableCell align="center">
                            <Button
                                small
                                secondary
                                onClick={() => deleteGroup(item)}
                            >
                                {i18n.t('Delete Group')}
                            </Button>
                        </DataTableCell>
                    </DataTableRow>
                ))}
            </DataTableBody>
        </DataTable>
    )
}

VisualizationTable.propTypes = {
    group: PropTypes.array,
    menuActions: PropTypes.object,
    deleteGroup: PropTypes.func,
}
