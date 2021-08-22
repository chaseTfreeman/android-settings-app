import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { AddNewSetting } from '../../../components/field'
import NewProgramVisualization from './NewProgramVisualization'

const ProgramAnalyticsList = ({ disable }) => {
    return (
        <>
            table
            <NewProgramVisualization disable={disable} />
        </>
    )
}

export default ProgramAnalyticsList
