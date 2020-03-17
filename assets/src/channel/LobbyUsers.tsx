import React from "react";
import { ChannelState } from "../socket/ChannelReducer";

type Props = {
  channelState: ChannelState;
};

const LobbyUsers = ({ channelState }: Props) => {
  return (
    <div>
      <h1>Other Attendees</h1>
      <ul>
        {channelState.attendees.map(attendee => {
          return <div>{attendee.name}</div>;
        })}
      </ul>
    </div>
  );
};

export default LobbyUsers;
