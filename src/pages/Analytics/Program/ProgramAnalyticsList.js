import React, { useEffect, useState } from 'react'
import NewProgramVisualization from './NewProgramVisualization'
import VisualizationTable from './VisualizationTable'
import { groupVisualizationByProgram } from './helper'

const ProgramAnalyticsList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const [rows, setRows] = useState()
    const [tableRows, setTableRows] = useState()
    useEffect(() => {
        console.log('rows changed', { rows })

        /*if (rows) {
            groupVisualizationByProgram('', rows)
        }*/

        if (rows) {
            const a = groupVisualizationByProgram('', rows)
            console.log('table rows', { a })
            setTableRows(a)
        }
    }, [rows])

    return (
        <>
            {tableRows && <VisualizationTable rows={tableRows} />}

            <NewProgramVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
            />
        </>
    )
}

export default ProgramAnalyticsList
