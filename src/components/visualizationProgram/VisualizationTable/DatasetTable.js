import React, { useState } from 'react'
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import { GroupVisualizationRow } from './GroupVisualizationRow'
import classes from './VisualizationTable.module.css'

export const DatasetTable = ({ rows }) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => <GroupVisualizationRow group={item} />

    return (
        <>
            <DataTable>
                <DataTableBody>
                    {Object.keys(rows).map((item, i) => {
                        /*console.log({ item, i, a: rows[item] })*/
                        return (
                            <DataTableRow
                                expanded={openRowIndex === i}
                                onExpandToggle={() => toggleOpenRow(i)}
                                expandableContent={expandableContent(
                                    rows[item]
                                )}
                                key={item}
                            >
                                <DataTableCell className={classes.title}>
                                    {rows[item].datasetName}
                                </DataTableCell>
                                <DataTableCell></DataTableCell>
                                <DataTableCell></DataTableCell>
                                <DataTableCell></DataTableCell>
                            </DataTableRow>
                        )
                    })}
                </DataTableBody>
            </DataTable>
        </>
    )
}
