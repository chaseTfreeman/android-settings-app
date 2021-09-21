import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import styles from '../../../components/visualizationProgram/VisualizationTable/VisualizationTable.module.css'
import {
    DataTable,
    DataTableBody,
    DataTableRow,
    DataTableCell,
    Button,
    ButtonStrip,
    IconArrowUp16,
    IconArrowDown16,
} from '@dhis2/ui'
import classes from '../../../components/visualizationProgram/VisualizationTable/VisualizationTable.module.css'

const VisualizationTable = ({ rows }) => {
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
        </>
    )
}

export default VisualizationTable

const GroupVisualizationRow = ({ group }) => {
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

const VisualizationRow = ({ visualizations }) => {
    const moveUp = position => {
        const list = visualizations.slice(position) //remove item from list
        list.splice(position, 0, visualizations[position - 1]) //add prev item
        console.log({ position, list, visualizations })
    }

    const moveDown = () => {}

    return (
        <>
            {visualizations.map((visualization, i) => (
                <div className={styles.row} key={visualization.id}>
                    <div className={styles.col70}> {visualization.name} </div>
                    {/*<ReorderButtons
                        className={styles.col30}
                        moveUp={() => moveUp(i)}
                        moveDown={() => moveDown(i)}
                    />*/}
                </div>
            ))}
        </>
    )
}

const ReorderButtons = ({ moveUp, moveDown, ...props }) => {
    return (
        <ButtonStrip {...props}>
            <Button small icon={<IconArrowUp16 />} onClick={moveUp} />
            <Button small icon={<IconArrowDown16 />} onClick={moveDown} />
        </ButtonStrip>
    )
}
