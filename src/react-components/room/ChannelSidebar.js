import React from 'react';
import PropTypes from "prop-types";
import { ButtonListItem } from "../layout/List"

export function ChannelSidebar({channel}) {
    return (
        <ButtonListItem type="button">
            <a href={channel.roomUrl}>{channel.title}</a>
        </ButtonListItem>
    )
}

ChannelSidebar.propTypes = {
    channel: PropTypes.object.isRequired
}
