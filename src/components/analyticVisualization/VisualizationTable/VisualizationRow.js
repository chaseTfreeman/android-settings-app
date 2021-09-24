import React from 'react'
import styles from './VisualizationTable.module.css'

export const VisualizationRow = ({ visualizations }) => {
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
                    <div className={styles.col70}> {visualization.name} </div>
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
