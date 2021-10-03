import React from 'react'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ButtonStrip,
    Button,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import buttonStyles from '../../../styles/Button.module.css'
import {
    GroupVisualizations,
    SelectVisualization,
    VisualizationTitle,
} from '../../../components/analyticVisualization'

const DialogVisualization = ({
    open,
    settings,
    handleChange,
    disableSave,
    handleClose,
    handleSave,
    groups,
}) => (
    <>
        {open && (
            <Modal>
                <ModalTitle>{i18n.t('Add Home visualization')}</ModalTitle>

                <ModalContent>
                    <SelectVisualization
                        settings={settings}
                        onChange={handleChange}
                    />

                    {settings.visualization && (
                        <>
                            <VisualizationTitle
                                settings={settings}
                                onChange={handleChange}
                            />

                            <GroupVisualizations
                                settings={settings}
                                onChange={handleChange}
                                groupList={groups}
                                //type="dataset"
                            />
                        </>
                    )}
                </ModalContent>

                <ModalActions>
                    <ButtonStrip end>
                        <Button
                            onClick={handleClose}
                            className={buttonStyles.mainContent__dialog__button}
                        >
                            {i18n.t('Cancel')}
                        </Button>
                        <Button onClick={handleSave} disabled={disableSave}>
                            {i18n.t('Add Home Visualization')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        )}
    </>
)

export default DialogVisualization
