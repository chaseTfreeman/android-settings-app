import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip, Box } from '@dhis2/ui'
import styles from './VisualizationTable.module.css'

export const VisualizationRow = ({ visualizations, menuActions }) => {
    const moveUp = position => {
        const list = visualizations.slice(position) //remove item from list
        list.splice(position, 0, visualizations[position - 1]) //add prev item
        //console.log({ position, list, visualizations })
    }

    const moveDown = () => {}

    return (
        <>
            {visualizations.map((visualization, i) => (
                <div className={styles.row} key={visualization.id}>
                    <div className={styles.col70}>
                        <Box className={styles.boxContainer}>
                            <p> {visualization.name} </p>
                            <ActionButtons
                                row={visualization}
                                menuActions={menuActions}
                                group={visualizations}
                            />
                        </Box>
                    </div>
                    {/*<ReorderButtons
                        className={styles.col30}
                        moveUp={() => moveUp(i)}
                        moveDown={() => moveDown(i)}
                    />*/}
                </div>
            ))}
        </>
    )
}

const ActionButtons = ({ menuActions, row, disabled, group }) => {
    return (
        <>
            <ButtonStrip className={styles.buttonContainer}>
                <Button
                    small
                    secondary
                    onClick={() => {
                        menuActions.edit(row, group)
                    }}
                    disabled={disabled}
                >
                    {i18n.t('Edit')}
                </Button>
                <Button
                    small
                    secondary
                    onClick={() => {
                        menuActions.delete(row, group)
                    }}
                    disabled={disabled}
                >
                    {i18n.t('Delete')}
                </Button>
            </ButtonStrip>
        </>
    )
}
