import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { Button, Divider } from '@dhis2/ui'
import { SelectField } from '../field'

export const UserTest = () => {
    const optionList = []

    const handleChange = () => {}

    return (
        <>
            <Divider margin="30px 0px 10px 0px" />
            <p> {i18n.t('Visualization user test')} </p>

            <SelectField
                dense
                options={optionList}
                onChange={handleChange}
                label={i18n.t('User')}
            />

            <Button small onClick={handleChange}>
                {i18n.t('Run test')}
            </Button>
        </>
    )
}
