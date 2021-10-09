import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import indexOf from 'lodash/indexOf'
import findIndex from 'lodash/findIndex'
import classes from './VisualizationTable.module.css'
import { VisualizationRow } from './VisualizationRow'
import DialogDelete from '../../dialog/DialogDelete'
import DialogDeleteInfo from '../../dialog/DialogDeleteInfo'
import { removeSettingsFromList } from '../../../utils/utils'
import { updateElement, updateGroup, updateGroupList } from './helper'

export const HomeVisualizationTable = ({ group, changeGroup }) => {
    const [openDeleteDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    //const [openEditDialog, setOpenEditDialog] = useState(false)
    //const [group, setGroup] = useState([])
    const [section, setSection] = useState([])
    //const [openDeleteGroup, setDeleteGroup] = useState(false)
    const [elementName, setName] = useState()
    const [groupId, setGroupId] = useState()

    const menuActions = {
        edit: (...arg) => {
            console.log('edit', { arg })
        },
        delete: (row, currentGroup, groupId) => {
            console.log('delete group home', {
                row,
                currentGroup,
                group,
                groupId,
            })
            setSpecificSetting(row)
            setSection(currentGroup)
            setGroupId(groupId)
            //setGroup(group)
            setName(row.name)
            setOpenDialog(true)
        },
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
        setSpecificSetting({})
        //setGroup([])
        setSection([])
        setName('')
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, section)
        /*  const element = group.find(group => group.id === groupId)

        const updateE = updateElement(element, 'visualizations', updatedList)
        const removeGroup = group.filter(g => g.id !== groupId)
        const a = removeGroup.slice()
            a.push(updateE)

        const updatedFinal = updatedList.length > 0 ? a : removeGroup*/

        const lastTry = updateGroupList(group, groupId, updatedList)

        changeGroup([
            //...group,
            //[groupId]: ''
            ...lastTry,
        ])
        console.log('deleted', { updatedList, group, lastTry })
        handleDialogClose()
    }

    return (
        <>
            <Table group={group} menuActions={menuActions} />
            <DialogDelete
                open={openDeleteDialog}
                onHandleDelete={handleDelete}
                onHandleClose={handleDialogClose}
                typeName={i18n.t('Visualization')}
                name={elementName}
            />
            {/*<DialogDeleteInfo
                open={openDeleteGroup}
                onHandleClose={handleCloseDeleteGroup}
                onHandleDelete={handleDeleteGroup}
                element={i18n.t('Visualization Group')}
                text={i18n.t(
                    'Are you sure you want to delete {{elementName}} visualization group?',
                    { elementName: elementName }
                )}
            />*/}
        </>
    )
}

const Table = ({ group, menuActions }) => {
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
                            {item.name}
                        </DataTableCell>
                    </DataTableRow>
                ))}
            </DataTableBody>
        </DataTable>
    )
}
