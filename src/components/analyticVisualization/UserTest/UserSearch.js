import React, { useEffect, useState } from 'react'
import ItemSelector from './ItemSelector'

const UserSearch = () => {
    const [disableRun, setDisableRun] = useState(true)
    const [userSelected, setUser] = useState()

    useEffect(() => {
        userSelected ? setDisableRun(false) : setDisableRun(true)
    }, [userSelected])

    return (
        <>
            <ItemSelector selection={setUser} />
        </>
    )
}

export default UserSearch
