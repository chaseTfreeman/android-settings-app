import React, { useRef } from 'react'

import { TwoPanel, Sidebar, MainContent } from '@dhis2/d2-ui-core'
import { Paper } from '@material-ui/core'
import { Route, Link, Switch, HashRouter } from 'react-router-dom'

import AndroidSettingsContainer from '../components/android-settings-container'
import ProgramSettings from '../components/program-settings'
import DataSetSettings from '../components/dataSet-settings'
import TestAndroidContainer from '../components/test-android-container'
import menuSection from '../constants/menu-sections'
import i18n from '@dhis2/d2-i18n'

import { D2Shim } from '../utils/D2Shim'
import layoutStyles from '../styles/Layout.module.css'

const styles = {
    twoPanelMain: {
        marginTop: '0rem',
    },
}

function Layout(props) {
    const currentSection = useRef()
    const sidebarRef = useRef()

    const changeSectionHandler = key => {
        currentSection.current = key
        if (key !== 'search' && sidebarRef.current) {
            sidebarRef.current.clearSearchBox()
        }
    }

    return (
        <HashRouter>
            <TwoPanel mainStyle={styles.twoPanelMain}>
                <div className={layoutStyles.paper__twoPanel__sideBar}>
                    <Sidebar
                        sections={menuSection.map(
                            ({ key, label, path, icon }, i) => ({
                                key,
                                label,
                                icon,
                                containerElement: (
                                    <Link to={path}> {label} </Link>
                                ),
                            })
                        )}
                        onChangeSection={changeSectionHandler}
                        currentSection={props.currentSection}
                        ref={sidebarRef}
                    />
                </div>
                <MainContent>
                    <header>
                        <h1 className={layoutStyles.paper__twoPanel__mainTitle}>
                            {i18n.t('Android settings')}
                        </h1>
                    </header>
                    <Paper className={layoutStyles.paper__layout}>
                        <D2Shim>
                            <Switch>
                                <Route
                                    path="/"
                                    exact
                                    render={() => (
                                        <D2Shim>
                                            <AndroidSettingsContainer />
                                        </D2Shim>
                                    )}
                                />
                                <Route
                                    path="/general-setting"
                                    render={() => (
                                        <D2Shim>
                                            <AndroidSettingsContainer />
                                        </D2Shim>
                                    )}
                                />
                                <Route
                                    path="/program-setting"
                                    render={() => (
                                        <D2Shim>
                                            <ProgramSettings />
                                        </D2Shim>
                                    )}
                                />
                                <Route
                                    path="/dataset-setting"
                                    render={() => (
                                        <D2Shim>
                                            <DataSetSettings />
                                        </D2Shim>
                                    )}
                                />
                                <Route
                                    path="/test-android-sync"
                                    render={() => (
                                        <D2Shim>
                                            <TestAndroidContainer />
                                        </D2Shim>
                                    )}
                                />
                            </Switch>
                        </D2Shim>
                    </Paper>
                </MainContent>
            </TwoPanel>
        </HashRouter>
    )
}

export default Layout
