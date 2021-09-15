import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import NewProgramVisualization from './NewProgramVisualization'
import VisualizationTable from './VisualizationTable'
import { useReadProgramQuery } from './ProgramVisualizationQueries'
import { dataStoreToRows, groupVisualizationByProgram } from './helper'

const ProgramAnalyticsList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const { programList } = useReadProgramQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [tableRows, setTableRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (programList) {
            console.log({ visualizations, programList })
            setRows(dataStoreToRows(visualizations, programList))
        }
    }, [visualizations, programList])

    useEffect(() => {
        console.log('rows changed', { rows })

        if (rows) {
            const { groupProgram, groupList } = groupVisualizationByProgram(
                rows
            )
            console.log('table rows', { groupList, groupProgram })
            setTableRows(groupProgram)
            setGroups(groupList)
            //handleVisualizations(groupProgram)
        }
    }, [rows])

    return (
        <>
            {!isEmpty(tableRows) && <VisualizationTable rows={tableRows} />}

            <NewProgramVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
                groups={groups}
            />
        </>
    )
}

export default ProgramAnalyticsList
