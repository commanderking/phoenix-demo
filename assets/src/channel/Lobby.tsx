import SocketProvider from "../socket/SocketProvider";
import React from "react";
import useChannel from "../socket/ChannelHook";
import LobbyUsers from "./LobbyUsers";
import LobbyHistory from "./LobbyHistory";
import { channelReducer } from "../socket/ChannelReducer";
const initialState = { messages: [], attendees: [], userLobbyActions: [] };

type Props = {
  name: string;
};

const Lobby = ({ name }: Props) => {
  const channelState = useChannel(
    "room:lobby",
    channelReducer,
    initialState,
    name
  );

  return (
    <SocketProvider>
      <LobbyUsers channelState={channelState} />
      <LobbyHistory channelState={channelState} />
    </SocketProvider>
  );
};

export default Lobby;
