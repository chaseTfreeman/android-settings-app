import React from 'react'
import { Button, ButtonStrip, IconArrowDown16, IconArrowUp16 } from '@dhis2/ui'

export const ReorderButtons = ({ moveUp, moveDown, ...props }) => {
    return (
        <ButtonStrip {...props}>
            <Button small icon={<IconArrowUp16 />} onClick={moveUp} />
            <Button small icon={<IconArrowDown16 />} onClick={moveDown} />
        </ButtonStrip>
    )
}
