import React, { useState } from 'react'
import styles from './VisualizationTable.module.css'
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import { VisualizationRow } from './VisualizationRow'

export const GroupVisualizationRow = ({ group }) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => <VisualizationRow visualizations={item} />

    return (
        <div className={styles.rowPadding}>
            <DataTable className={styles.table}>
                <DataTableBody>
                    {Object.keys(group.groups).map((item, i) => {
                        /*console.log({
                            item,
                            i,
                            groups: group.groups,
                            a: group.groups[item],
                        })*/
                        return (
                            <DataTableRow
                                expanded={openRowIndex === i}
                                onExpandToggle={() => toggleOpenRow(i)}
                                expandableContent={expandableContent(
                                    group.groups[item]
                                )}
                                key={i}
                            >
                                <DataTableCell></DataTableCell>
                                <DataTableCell>
                                    {group.groups[item][0].group.name}
                                </DataTableCell>
                                <DataTableCell></DataTableCell>
                                <DataTableCell>
                                    {/*<Button small> Reorder this group </Button>*/}
                                </DataTableCell>
                            </DataTableRow>
                        )
                    })}
                </DataTableBody>
            </DataTable>
        </div>
    )
}
