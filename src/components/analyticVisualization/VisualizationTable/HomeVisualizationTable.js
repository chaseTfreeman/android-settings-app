import React, { useState } from 'react'
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import classes from './VisualizationTable.module.css'
import { VisualizationRow } from './VisualizationRow'

export const HomeVisualizationTable = ({ group }) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => (
        <VisualizationRow visualizations={item.visualizations} />
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
                        <DataTableCell></DataTableCell>
                        <DataTableCell></DataTableCell>
                        <DataTableCell></DataTableCell>
                    </DataTableRow>
                ))}
            </DataTableBody>
        </DataTable>
    )
}
