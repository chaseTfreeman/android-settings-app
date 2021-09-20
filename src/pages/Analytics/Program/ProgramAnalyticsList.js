import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import NewProgramVisualization from './NewProgramVisualization'
import VisualizationTable from './VisualizationTable'
import { useReadProgramQuery } from './ProgramVisualizationQueries'
import { prepareRows, rowsToDataStore } from './helper'

const ProgramAnalyticsList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const { programList } = useReadProgramQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (visualizations && programList) {
            const { visualizationsByPrograms, groupList } = prepareRows(
                visualizations,
                programList
            )
            setRows(visualizationsByPrograms)
            setGroups(groupList)
            setInitialRows(visualizationsByPrograms)
        }
    }, [visualizations, programList])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            /*const updtated = rowsToDataStore(rows)
            console.log('rows changed, update visualizations', {updtated, rows, visualizations})
            handleVisualizations(updtated)*/
            handleVisualizations(rowsToDataStore(rows))
            //handleVisualizations(rows)
        }
    }, [rows])

    return (
        <>
            {!isEmpty(rows) && <VisualizationTable rows={rows} />}

            <NewProgramVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
                groups={groups}
                handleGroups={setGroups}
            />
        </>
    )
}

export default ProgramAnalyticsList
