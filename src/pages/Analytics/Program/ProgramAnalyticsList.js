import React, { useEffect, useState } from 'react'
import NewProgramVisualization from './NewProgramVisualization'

const ProgramAnalyticsList = ({
    visualizations,
    handleVisualizations,
    disable,
}) => {
    const [rows, setRows] = useState()

    useEffect(() => {
        console.log('rows changed', { rows })
    }, [rows])

    return (
        <>
            {rows && <p> Table </p>}

            <NewProgramVisualization
                disable={disable}
                visualization={rows}
                handleVisualization={setRows}
            />
        </>
    )
}

export default ProgramAnalyticsList
