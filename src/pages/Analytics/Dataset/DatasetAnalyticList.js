import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { useReadDatasetQuery } from './DatasetVisualizationQueries'
import NewDatasetVisualization from './NewDatasetVisualization'
import { prepareRows, rowsToDataStore } from './helper'
import { DatasetTable } from '../../../components/visualizationProgram/VisualizationTable'

const DatasetAnalyticList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const { datasetList } = useReadDatasetQuery()
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (visualizations && datasetList) {
            const { visualizationsByDatasets, groupList } = prepareRows(
                visualizations,
                datasetList
            )
            setRows(visualizationsByDatasets)
            setGroups(groupList)
            setInitialRows(visualizationsByDatasets)
        }
    }, [visualizations, datasetList])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleVisualizations(rowsToDataStore(rows))
        }
    }, [rows])

    return (
        <>
            {!isEmpty(rows) && <DatasetTable rows={rows} />}

            <NewDatasetVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
                groups={groups}
                handleGroups={setGroups}
            />
        </>
    )
}

export default DatasetAnalyticList
