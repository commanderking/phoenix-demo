import React from "react";
import { ChannelState } from "../socket/ChannelReducer";
import { channelActions, ChannelActions } from "../socket/ChannelActions";
import { UserLobbyAction } from "../socket/ChannelReducer";
type Props = {
  channelState: ChannelState;
};

const getHistoryText = (action: UserLobbyAction) => {
  const joinOrLeaveText =
    action.actionType === channelActions.USER_JOIN
      ? "joined the room."
      : "left the room.";
  return `${action.name} ${joinOrLeaveText}`;
};

const LobbyHistory = ({ channelState }: Props) => {
  const { userLobbyActions } = channelState;
  return (
    <div>
      <h3>Lobby History</h3>
      <ul>
        {userLobbyActions.map(action => {
          return <li>{getHistoryText(action)}</li>;
        })}
      </ul>
    </div>
  );
};

export default LobbyHistory;
