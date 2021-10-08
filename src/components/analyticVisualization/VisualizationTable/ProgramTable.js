import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import DialogDelete from '../../dialog/DialogDelete'
import DialogDeleteInfo from '../../dialog/DialogDeleteInfo'
import { ElementGroupTable } from './ElementGroupTable'
import { removeSettingsFromList } from '../../../utils/utils'
import { removeElement, updateGroup } from './helper'

export const ProgramTable = ({ rows, changeRows }) => {
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
        const { program, group: programGroup } = specificSetting
        const updatedGroups = updateGroup(
            rows[program].groups,
            programGroup.id,
            updatedList
        )

        changeRows({
            ...rows,
            [program]: {
                ...rows[program],
                groups: updatedGroups,
            },
        })
        handleDialogClose()
    }

    const handleEditClose = () => {
        setOpenEditDialog(false)
        setSpecificSetting({})
        setGroup([])
        setName('')
    }

    const handleDeleteGroup = () => {
        const visualizations = Object.assign({}, rows)
        const currentProgramGroups = visualizations[group].groups
        const updatedGroupList = removeElement(
            currentProgramGroups,
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

    const deleteGroup = (item, programId) => {
        setName(rows[programId].groups[item][0].group.name)
        setSpecificSetting(item)
        setGroup(programId)
        setDeleteGroup(true)
    }

    return (
        <>
            <ElementGroupTable
                element="program"
                rows={rows}
                menuActions={menuActions}
                deleteGroup={deleteGroup}
            />
            <DialogDelete
                open={openDeleteDialog}
                name={elementName}
                onHandleDelete={handleDelete}
                onHandleClose={handleDialogClose}
                typeName={i18n.t('Visualization')}
            />
            <DialogDeleteInfo
                open={openDeleteGroup}
                onHandleClose={handleCloseDeleteGroup}
                onHandleDelete={handleDeleteGroup}
                text={i18n.t(
                    'Are you sure you want to delete {{elementName}} visualization group?',
                    { elementName: elementName }
                )}
                element={i18n.t('Visualization Group')}
            />
        </>
    )
}

ProgramTable.propTypes = {
    rows: PropTypes.object,
    changeRows: PropTypes.func,
}
