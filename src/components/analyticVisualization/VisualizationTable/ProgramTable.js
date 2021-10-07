import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import { GroupVisualizationRow } from './GroupVisualizationRow'
import classes from './VisualizationTable.module.css'
import { removeSettingsFromList } from '../../../utils/utils'
import DialogDelete from '../../dialog/DialogDelete'

export const ProgramTable = ({ rows, changeRows }) => {
    const [openDeleteDialog, setOpenDialog] = useState(false)
    const [specificSetting, setSpecificSetting] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [group, setGroup] = useState([])

    const menuActions = {
        edit: (...arg) => {
            console.log('edit', { arg })
        },
        delete: (row, group) => {
            setSpecificSetting(row)
            setGroup(group)
            setOpenDialog(true)
        },
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    const handleDelete = () => {
        const updatedList = removeSettingsFromList(specificSetting, group)
        const { program, group: programGroup } = updatedList[0]

        changeRows({
            ...rows,
            [program]: {
                ...rows[program],
                groups: {
                    ...rows[program].groups,
                    [programGroup.id]: updatedList,
                },
            },
        })
        handleDialogClose()
    }

    const handleEditClose = () => {
        setOpenEditDialog(false)
    }

    return (
        <>
            <TableActions rows={rows} menuActions={menuActions} />
            <DialogDelete
                open={openDeleteDialog}
                name={specificSetting.name}
                onHandleDelete={handleDelete}
                onHandleClose={handleDialogClose}
                typeName={i18n.t('Visualization')}
            />
        </>
    )
}

const TableActions = ({ rows, menuActions }) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => (
        <GroupVisualizationRow group={item} menuActions={menuActions} />
    )

    return (
        <DataTable>
            <DataTableBody>
                {Object.keys(rows).map((item, i) => {
                    /*console.log({ item, i, a: rows[item] })*/
                    return (
                        <DataTableRow
                            expanded={openRowIndex === i}
                            onExpandToggle={() => toggleOpenRow(i)}
                            expandableContent={expandableContent(rows[item])}
                            key={item}
                        >
                            <DataTableCell className={classes.title}>
                                {rows[item].programName}
                            </DataTableCell>
                            <DataTableCell></DataTableCell>
                            <DataTableCell></DataTableCell>
                            <DataTableCell></DataTableCell>
                        </DataTableRow>
                    )
                })}
            </DataTableBody>
        </DataTable>
    )
}
