import { global, ORG_UNIT, perOuProgram, program } from './settingType'
import { getRequestDownloadSize } from '../../utils/getRequestDownloadSize'

const teiFields =
    'trackedEntityInstance,created,lastUpdated,orgUnit,trackedEntityType,coordinates,featureType,deleted,attributes[attribute,value,created,lastUpdated],relationships[trackedEntityInstanceA,trackedEntityInstanceB,relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],enrollments[enrollment,created,lastUpdated,orgUnit,program,enrollmentDate,incidentDate,followup,status,deleted,trackedEntityInstance,coordinate,events[event,enrollment,created,lastUpdated,status,coordinate,program,programStage,orgUnit,eventDate,completedDate,deleted,dueDate,attributeOptionCombo,dataValues[dataElement,storedBy,value,created,lastUpdated,providedElsewhere]],notes[note,value,storedBy,storedDate]]'

const prepareRequest = params => {
    let url = `${params.url}.json?`

    if (params.attribute === 'trackedEntityInstances') {
        url =
            url +
            `page=${params.page}&pageSize=${params.pageSize}&ou=${params.ou}&fields=${params.fields}&includeAllAttributes=true&includeDeleted=true`
    } else {
        url =
            url +
            `page=${params.page}&pageSize=${params.pageSize}&orgUnit=${params.orgUnit}&includeAllAttributes=true&includeDeleted=true`
    }

    if (params.ouMode) {
        url = url + `&ouMode=DESCENDANTS`
    }

    if (params.programs) {
        url = url + `&programs=${params.programs}`
    }

    return url
}

export const getDataPerProgramSettingType = ({
    settingType,
    orgUnitList,
    programList,
    baseUrl,
}) => {
    // after checking setting type, get promise data
    const teiPromises = []
    const _tei = Math.round(parseInt(settingType.sizeTEI) / 50)
    const _event = Math.round(parseInt(settingType.sizeEvent) / 50)
    const _teiProgram = Math.round(parseInt(settingType.sizeTEI) / 25)
    const _eventProgram = Math.round(parseInt(settingType.sizeEvent) / 25)

    switch (settingType.type) {
        case undefined:
            // if it's global or doesn't have specific settings
            // with ou Parents and "DESCENDENT"

            orgUnitList.orgUnitParents.forEach(orgUnit => {
                for (let i = 1; i <= _tei; i++) {
                    const teiParameters = {
                        attribute: 'trackedEntityInstances',
                        url: `${baseUrl}/api/trackedEntityInstances`,
                        fields: teiFields,
                        page: `${i}`,
                        pageSize: 50,
                        ou: `${orgUnit}`,
                        ouMode: 'DESCENDANTS',
                        includeAllAttributes: true,
                        includeDeleted: true,
                    }
                    const teiURL = prepareRequest(teiParameters)
                    teiPromises.push(getRequestDownloadSize(teiURL))
                }

                for (let j = 1; j <= _event; j++) {
                    const eventParameters = {
                        attribute: 'events',
                        url: `${baseUrl}/api/events`,
                        page: `${j}`,
                        pageSize: 50,
                        orgUnit: `${orgUnit}`,
                        ouMode: 'DESCENDANTS',
                        includeAllAttributes: true,
                        includeDeleted: true,
                    }
                    const eventURL = prepareRequest(eventParameters)
                    teiPromises.push(getRequestDownloadSize(eventURL))
                }
            })

            break
        case global:
            // if it's global or doesn't have specific settings
            // with ou Parents and "DESCENDENT"

            orgUnitList.orgUnitParents.forEach(orgUnit => {
                for (let i = 1; i <= _tei; i++) {
                    const teiParameters = {
                        attribute: 'trackedEntityInstances',
                        url: `${baseUrl}/api/trackedEntityInstances`,
                        fields: teiFields,
                        page: `${i}`,
                        pageSize: 50,
                        ou: `${orgUnit}`,
                        ouMode: 'DESCENDANTS',
                        includeAllAttributes: true,
                        includeDeleted: true,
                    }
                    const teiURL = prepareRequest(teiParameters)
                    teiPromises.push(getRequestDownloadSize(teiURL))
                }

                for (let j = 1; j <= _event; j++) {
                    const eventParameters = {
                        attribute: 'events',
                        url: `${baseUrl}/api/events`,
                        page: `${j}`,
                        pageSize: 50,
                        orgUnit: `${orgUnit}`,
                        ouMode: 'DESCENDANTS',
                        includeAllAttributes: true,
                        includeDeleted: true,
                    }
                    const eventURL = prepareRequest(eventParameters)
                    teiPromises.push(getRequestDownloadSize(eventURL))
                }
            })

            break
        case ORG_UNIT:
            // per ou
            // should put every single ou capture by itself with no ouMode

            orgUnitList.orgUnit.forEach(orgUnit => {
                for (let i = 1; i <= _tei; i++) {
                    const teiParameters = {
                        attribute: 'trackedEntityInstances',
                        url: `${baseUrl}/api/trackedEntityInstances`,
                        fields: teiFields,
                        page: `${i}`,
                        pageSize: 50,
                        ou: `${orgUnit}`,
                        includeAllAttributes: true,
                        includeDeleted: true,
                    }
                    const teiURL = prepareRequest(teiParameters)
                    teiPromises.push(getRequestDownloadSize(teiURL))
                }

                for (let j = 1; j <= _event; j++) {
                    const eventParameters = {
                        attribute: 'events',
                        url: `${baseUrl}/api/events`,
                        page: `${j}`,
                        pageSize: 50,
                        orgUnit: `${orgUnit}`,
                        includeAllAttributes: true,
                        includeDeleted: true,
                    }
                    const eventURL = prepareRequest(eventParameters)
                    teiPromises.push(getRequestDownloadSize(eventURL))
                }
            })

            break
        case program:
            // per program
            // I should get programTEI also if OUPrograms have specificSettings
            // should add a for programs

            programList.forEach(program => {
                orgUnitList.orgUnitParents.forEach(orgUnit => {
                    for (let i = 1; i <= _teiProgram; i++) {
                        const teiParameters = {
                            attribute: 'trackedEntityInstances',
                            url: `${baseUrl}/api/trackedEntityInstances`,
                            fields: teiFields,
                            page: `${i}`,
                            pageSize: 25,
                            ou: `${orgUnit}`,
                            ouMode: 'DESCENDANTS',
                            programs: `${program}`,
                            includeAllAttributes: true,
                            includeDeleted: true,
                        }
                        const teiURL = prepareRequest(teiParameters)
                        teiPromises.push(getRequestDownloadSize(teiURL))
                    }

                    for (let j = 1; j <= _eventProgram; j++) {
                        const eventParameters = {
                            attribute: 'events',
                            url: `${baseUrl}/api/events`,
                            page: `${j}`,
                            pageSize: 25,
                            orgUnit: `${orgUnit}`,
                            ouMode: 'DESCENDANTS',
                            programs: `${program}`,
                            includeAllAttributes: true,
                            includeDeleted: true,
                        }
                        const eventURL = prepareRequest(eventParameters)
                        teiPromises.push(getRequestDownloadSize(eventURL))
                    }
                })
            })
            break
        case perOuProgram:
            // per program & per ou

            orgUnitList.orgUnit.forEach(orgUnit => {
                programList.forEach(program => {
                    for (let i = 1; i <= _tei; i++) {
                        const teiParameters = {
                            attribute: 'trackedEntityInstances',
                            url: `${baseUrl}/api/trackedEntityInstances`,
                            fields: teiFields,
                            page: `${i}`,
                            pageSize: 25,
                            ou: `${orgUnit}`,
                            ouMode: 'DESCENDANTS',
                            programs: `${program}`,
                            includeAllAttributes: true,
                            includeDeleted: true,
                        }
                        const teiURL = prepareRequest(teiParameters)
                        teiPromises.push(getRequestDownloadSize(teiURL))
                    }

                    for (let j = 1; j <= _event; j++) {
                        const eventParameters = {
                            attribute: 'events',
                            url: `${baseUrl}/api/events`,
                            page: `${j}`,
                            pageSize: 25,
                            orgUnit: `${orgUnit}`,
                            ouMode: 'DESCENDANTS',
                            programs: `${program}`,
                            includeAllAttributes: true,
                            includeDeleted: true,
                        }
                        const eventURL = prepareRequest(eventParameters)
                        teiPromises.push(getRequestDownloadSize(eventURL))
                    }
                })
            })

            break
        default:
            break
    }

    return teiPromises
}
