import React, { useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import {
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableRow,
} from '@dhis2/ui'
import { GroupVisualizationRow } from './GroupVisualizationRow'
import classes from './VisualizationTable.module.css'

export const ElementGroupTable = ({
    rows,
    menuActions,
    deleteGroup,
    element,
}) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const expandableContent = item => (
        <GroupVisualizationRow
            group={item}
            menuActions={menuActions}
            deleteGroup={deleteGroup}
            element={element}
        />
    )

    return (
        <DataTable>
            <DataTableBody>
                {Object.keys(rows).map((item, i) => (
                    <DataTableRow
                        expanded={openRowIndex === i}
                        onExpandToggle={() => toggleOpenRow(i)}
                        expandableContent={expandableContent(rows[item])}
                        key={item}
                    >
                        <DataTableCell className={classes.title}>
                            {rows[item][`${element}Name`]}
                        </DataTableCell>
                    </DataTableRow>
                ))}
            </DataTableBody>
        </DataTable>
    )
}

ElementGroupTable.propTypes = {
    rows: PropTypes.object,
    element: PropTypes.string,
    menuActions: PropTypes.object,
    deleteGroup: PropTypes.func,
}
