import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import NewProgramVisualization from './NewProgramVisualization'
import VisualizationTable from './VisualizationTable'
import { useReadProgramQuery } from './ProgramVisualizationQueries'
import {
    dataStoreToRows,
    groupVisualizationByProgram,
    prepareRows,
} from './helper'

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
        if (visualizations && programList) {
            console.log({ visualizations, programList })
            //setRows(dataStoreToRows(visualizations, programList))
            /*const rows = dataStoreToRows(visualizations, programList)
            const { groupProgram, groupList } = groupVisualizationByProgram(
                rows
            )
            setTableRows(groupProgram)
            setGroups(groupList)*/
            const { visualizationsByPrograms, groupList } = prepareRows(
                visualizations,
                programList
            )
            console.log({ visualizationsByPrograms, groupList })

            setTableRows(visualizationsByPrograms)
            setGroups(groupList)
            setInitialRows(visualizationsByPrograms)
        }
    }, [visualizations, programList])

    /*useEffect(() => {
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
    }, [rows])*/

    useEffect(() => {
        if (tableRows && initialRows && !isEqual(tableRows, initialRows)) {
            console.log('rows changed, update visualizations')
        }
    }, [tableRows])

    return (
        <>
            {!isEmpty(tableRows) && <VisualizationTable rows={tableRows} />}

            <NewProgramVisualization
                disable={disable}
                visualization={tableRows}
                handleVisualization={setTableRows}
                groups={groups}
                handleGroups={setGroups}
            />
        </>
    )
}

export default ProgramAnalyticsList
