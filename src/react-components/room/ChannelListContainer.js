import React from 'react';
import PropTypes from "prop-types";
import { List } from "../layout/List"
import {ChannelSidebar} from "./ChannelSidebar";

export function ChannelListContainer({channels}) {
    return (
        <List>
            {
                channels.map(channel => {
                    return (
                        <ChannelSidebar key={channel.id} channel={channel}></ChannelSidebar>
                    )
                })
            }
        </List>
    )
}

ChannelListContainer.propTypes = {
    channels: PropTypes.array.isRequired
}
