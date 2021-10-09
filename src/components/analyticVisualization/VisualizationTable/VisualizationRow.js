import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { Button, ButtonStrip, Box } from '@dhis2/ui'
import styles from './VisualizationTable.module.css'

export const VisualizationRow = ({ visualizations, menuActions, id }) => (
    <>
        {visualizations.map(visualization => (
            <div className={styles.row} key={visualization.id}>
                <div className={styles.col70}>
                    <Box className={styles.boxContainer}>
                        <p> {visualization.name} </p>
                        <ActionButtons
                            row={visualization}
                            menuActions={menuActions}
                            group={visualizations}
                            groupId={id}
                        />
                    </Box>
                </div>
            </div>
        ))}
    </>
)

VisualizationRow.propTypes = {
    visualizations: PropTypes.array,
    menuActions: PropTypes.object,
    id: PropTypes.string,
}

const ActionButtons = ({ menuActions, row, disabled, group, groupId }) => (
    <>
        <ButtonStrip className={styles.buttonContainer}>
            <Button
                small
                secondary
                onClick={() => {
                    menuActions.edit(row, group, groupId)
                }}
                disabled={disabled}
            >
                {i18n.t('Edit')}
            </Button>
            <Button
                small
                secondary
                onClick={() => {
                    menuActions.delete(row, group, groupId)
                }}
                disabled={disabled}
            >
                {i18n.t('Delete')}
            </Button>
        </ButtonStrip>
    </>
)

ActionButtons.propTypes = {
    menuActions: PropTypes.object,
    row: PropTypes.object,
    disabled: PropTypes.bool,
    group: PropTypes.array,
    groupId: PropTypes.string,
}
