import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import NewHomeVisualization from './NewHomeVisualization'
import { HomeVisualizationTable } from '../../../components/analyticVisualization'

const HomeAnalyticList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const [rows, setRows] = useState()
    const [initialRows, setInitialRows] = useState()
    const [groups, setGroups] = useState()

    useEffect(() => {
        if (visualizations) {
            setRows(visualizations)
            setGroups(visualizations)
            setInitialRows(visualizations)
        }
    }, [visualizations])

    useEffect(() => {
        if (rows && initialRows && !isEqual(rows, initialRows)) {
            handleVisualizations(rows)
        }
    }, [rows])

    return (
        <>
            {!isEmpty(rows) && <HomeVisualizationTable group={rows} />}

            <NewHomeVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
                groups={groups}
                handleGroups={setGroups}
            />
        </>
    )
}

export default HomeAnalyticList
