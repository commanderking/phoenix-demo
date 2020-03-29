import SocketProvider from "../socket/SocketProvider";
import React from "react";
import useChannel from "../socket/ChannelHook";
import LobbyUsers from "./LobbyUsers";
import LobbyHistory from "./LobbyHistory";
import Messages from "./Messages";
import { channelReducer } from "../socket/ChannelReducer";
const initialState = { messages: [], attendees: [], userLobbyActions: [] };

type Props = {
  name: string;
};

const Lobby = ({ name }: Props) => {
  const { channelState, channel } = useChannel(
    "room:lobby",
    channelReducer,
    initialState,
    name
  );

  return (
    <SocketProvider>
      <LobbyUsers channelState={channelState} />
      <LobbyHistory channelState={channelState} />
      <Messages channelState={channelState} channel={channel} />
    </SocketProvider>
  );
};

export default Lobby;
