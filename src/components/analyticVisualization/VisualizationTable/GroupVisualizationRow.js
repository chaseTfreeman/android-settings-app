import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import {
    Button,
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import { VisualizationRow } from './VisualizationRow'
import styles from './VisualizationTable.module.css'

export const GroupVisualizationRow = ({
    group,
    menuActions,
    deleteGroup,
    element,
}) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => (
        <VisualizationRow visualizations={item} menuActions={menuActions} />
    )

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
                                <DataTableCell />
                                <DataTableCell>
                                    {group.groups[item][0].group.name}
                                </DataTableCell>
                                <DataTableCell />
                                <DataTableCell align="center">
                                    {/*<Button small> Reorder this group </Button>*/}
                                    <Button
                                        small
                                        secondary
                                        onClick={() =>
                                            deleteGroup(
                                                item,
                                                group.groups[item][0][element]
                                            )
                                        }
                                    >
                                        {i18n.t('Delete Group')}
                                    </Button>
                                </DataTableCell>
                            </DataTableRow>
                        )
                    })}
                </DataTableBody>
            </DataTable>
        </div>
    )
}
