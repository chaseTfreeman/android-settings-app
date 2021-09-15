import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
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

const VisualizationTable = ({ rows }) => {
    const [openRowIndex, setOpenRowIndex] = useState(null)

    const toggleOpenRow = index =>
        setOpenRowIndex(openRowIndex === index ? null : index)

    const style = {
        margin: 8,
        padding: 4,
        backgroundColor: 'lightblue',
    }

    //const expandableContent = <div style={style}>More info about this row!</div>

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
                                <DataTableCell>
                                    {rows[item].programName}
                                </DataTableCell>
                                <DataTableCell></DataTableCell>
                                <DataTableCell></DataTableCell>
                                <DataTableCell></DataTableCell>
                            </DataTableRow>
                        )
                    })}

                    {/*<DataTableRow
                        expanded={openRowIndex === 1}
                        onExpandToggle={() => toggleOpenRow(1)}
                        expandableContent={expandableContent}
                    >
                        <DataTableCell>Antenatal Program</DataTableCell>
                        <DataTableCell></DataTableCell>
                        <DataTableCell></DataTableCell>
                        <DataTableCell>02/26/1991</DataTableCell>
                    </DataTableRow>

                    <DataTableRow
                        expanded={openRowIndex === 2}
                        onExpandToggle={() => toggleOpenRow(2)}
                        expandableContent={expandableContent}
                    >
                        <DataTableCell>Other Program</DataTableCell>
                        <DataTableCell></DataTableCell>
                        <DataTableCell></DataTableCell>
                        <DataTableCell></DataTableCell>
                    </DataTableRow>*/}
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
        <div>
            <DataTable>
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
                                    <Button small> Reorder this group </Button>
                                </DataTableCell>
                            </DataTableRow>
                        )
                    })}

                    {/*<DataTableRow
                        expanded={openRowIndex === 0}
                        onExpandToggle={payload => {
                            console.log(payload)
                            toggleOpenRow(0)

                        }}
                        expandableContent={expandableContent}
                    >
                        <DataTableCell></DataTableCell>
                        <DataTableCell>Group</DataTableCell>
                        <DataTableCell></DataTableCell>
                        <DataTableCell>
                            <Button small> Reorder this group </Button>
                        </DataTableCell>
                    </DataTableRow>*/}

                    {/*<DataTableRow
                        expanded={openRowIndex === 1}
                        onExpandToggle={() => toggleOpenRow(1)}
                        expandableContent={expandableContent}
                    >
                        <DataTableCell></DataTableCell>
                        <DataTableCell>Second group</DataTableCell>
                        <DataTableCell></DataTableCell>
                        <DataTableCell><Button small> Reorder this group </Button></DataTableCell>
                    </DataTableRow>*/}
                </DataTableBody>
            </DataTable>
        </div>
    )
}

const VisualizationRow = ({ visualizations }) => {
    const style = {
        margin: 8,
        //padding: 4,
        backgroundColor: 'lightblue',
        padding: 12,
        border: '1px solid rgb(232, 237, 242)',
    }

    return (
        <>
            {visualizations.map(visualization => (
                <div style={style} key={visualization.id}>
                    {visualization.name}
                    <ReorderButtons />
                </div>
            ))}
        </>
    )
}

const ReorderButtons = () => {
    return (
        <ButtonStrip>
            <Button small icon={<IconArrowUp16 />}></Button>
            <Button small icon={<IconArrowDown16 />}></Button>
        </ButtonStrip>
    )
}
