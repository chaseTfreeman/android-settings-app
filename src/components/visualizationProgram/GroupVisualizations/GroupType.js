import React, { useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import { RadioGroup } from './RadioGroup'
import styles from './GroupType.module.css'

export const GroupType = ({ onChange, settings, groupList }) => {
    const [group, setGroup] = useState()

    const handleChange = e => {
        setGroup(e.value)
    }

    return (
        <div className={styles.container}>
            <RadioGroup
                onChange={handleChange}
                value={group}
                name="groupVisualization"
                groupName={settings}
                changeGroup={onChange}
                groups={groupList}
            />
        </div>
    )
}

GroupType.propTypes = {
    onChange: PropTypes.func,
    settings: PropTypes.object,
    groupList: PropTypes.object,
}
