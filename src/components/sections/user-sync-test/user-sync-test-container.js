import React, { useState, useEffect } from 'react'

import { useConfig } from '@dhis2/app-runtime'
import TestAndroid from './test-android'
import { userSyncTestMaxValues } from '../../../constants/test-android'
import prepareInitialData from '../../../modules/userSyncTest/prepareInitialData'
import getUserDataSyncTest from '../../../modules/userSyncTest/getUserDataSyncTest'
import SectionWrapper from '../section-wrapper'

const UserSyncTestContainer = () => {
    const { baseUrl } = useConfig()
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)
    const [runTestDisabled, setRunTestDisable] = useState(true)
    const [runTest, setRunTest] = useState(false)
    const [maxValues, setMaxValues] = useState({
        maxValueOUCapture: 0,
        maxValueOUSearch: 0,
        maxValueDataSet: 0,
        maxValueProgram: 0,
        maxValueProgramRule: 0,
        maxValueMetadata: 0,
        maxValueData: 0,
        maxValueReservedValue: 0,
    })
    const [testValues, setTestValues] = useState({
        organisationUnitsNumber: 0,
        organisationUnitSearchNumber: 0,
        datasetNumber: 0,
        programNumber: 0,
        programRuleNumber: 0,
        metadataSize: 0,
        dataSize: 0,
        reservedValueNumber: 0,
    })
    const [testDataLoading, setLoadTestData] = useState({
        orgUnitLoad: false,
        dataSetLoad: false,
        programLoad: false,
        programRuleLoad: false,
        metadataLoad: false,
        dataLoad: false,
        reservedValuesLoad: false,
    })
    const [userSelected, setUserSelected] = useState({
        data: undefined,
        id: undefined,
    })

    const {
        users,
        globalSettings,
        specificSettings,
        reservedValues,
        loading: loadingInitialValues,
    } = prepareInitialData()

    const updateRecommendedValue = () => {
        setMaxValues({ ...userSyncTestMaxValues })
    }

    useEffect(() => {
        updateRecommendedValue()
        if (!loadingInitialValues) {
            setLoading(false)
        }
    }, [users, globalSettings, specificSettings, reservedValues])

    const clearFields = () => {
        setUsername('')
        setRunTestDisable(true)
        setUserSelected({
            data: undefined,
            id: undefined,
        })
        setTestValues({
            organisationUnitsNumber: 0,
            organisationUnitSearchNumber: 0,
            datasetNumber: 0,
            programNumber: 0,
            programRuleNumber: 0,
            metadataSize: 0,
            dataSize: 0,
            reservedValueNumber: 0,
        })
        setLoadTestData({
            orgUnitLoad: false,
            dataSetLoad: false,
            programLoad: false,
            programRuleLoad: false,
            metadataLoad: false,
            dataLoad: false,
            reservedValuesLoad: false,
        })
    }

    const checkUsername = userToCheck => {
        clearFields()
        if (userToCheck.length > 3) {
            const foundUser = users.find(user => user.name === userToCheck)
            if (foundUser !== undefined) {
                setUserSelected({
                    data: foundUser,
                    id: foundUser.id,
                })

                setUsername(userToCheck)
                setRunTestDisable(false)
            } else {
                setRunTestDisable(true)
            }
        } else {
            setRunTestDisable(true)
        }
    }

    const handleRun = () => {
        setLoadTestData({
            orgUnitLoad: true,
            dataSetLoad: true,
            programLoad: true,
            programRuleLoad: true,
            metadataLoad: true,
            dataLoad: true,
            reservedValuesLoad: true,
        })
        setRunTest(true)
        getUserDataSyncTest({
            userSelected: userSelected.data,
            baseUrl,
            globalSettings,
            specificSettings,
        }).then(syncTest => {
            setLoadTestData({
                orgUnitLoad: false,
                dataSetLoad: false,
                programLoad: false,
                programRuleLoad: false,
                metadataLoad: false,
                dataLoad: false,
                reservedValuesLoad: false,
            })
            setLoading(false)
            setTestValues({
                organisationUnitsNumber: syncTest.orgUnitCaptureSize,
                organisationUnitSearchNumber: syncTest.orgUnitSearchSize,
                datasetNumber: syncTest.datasetSize,
                programNumber: syncTest.programSize,
                programRuleNumber: syncTest.programRulesSize,
                metadataSize: syncTest.metadataSize,
                dataSize: syncTest.dataSize,
                reservedValueNumber: reservedValues,
            })
        })
    }

    return (
        <SectionWrapper loading={loading}>
            <TestAndroid
                checkUsername={checkUsername}
                clearSearchField={clearFields}
                searchFieldValue={username}
                runTest={runTest}
                maxValues={maxValues}
                loadValues={testDataLoading}
                testValues={testValues}
                handleRun={handleRun}
                disabledTest={runTestDisabled}
                options={users}
            />
        </SectionWrapper>
    )
}

export default UserSyncTestContainer
