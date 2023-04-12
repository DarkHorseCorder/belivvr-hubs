import React from 'react';
import PropTypes from "prop-types";
import { Sidebar } from "../sidebar/Sidebar"
import { CloseButton } from '../input/CloseButton';
import { FormattedMessage } from 'react-intl';
import { ChannelListContainer } from './ChannelListContainer';

export function ChannelSidebarContainer({channels, onClose}) {
    return(
        <Sidebar
            beforeTitle={<CloseButton onClick={() => onClose()} />}
            title={
                <FormattedMessage
                id="channel-sidebar.title"
                defaultMessage="채널"
                />
            }
        >
            <ChannelListContainer channels={channels}></ChannelListContainer>
        </Sidebar>
    )
}

ChannelSidebarContainer.propTypes = {
    channels: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
}
