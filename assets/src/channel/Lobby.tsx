import SocketProvider from "../socket/SocketProvider";
import React from "react";
import useChannel from "../socket/ChannelHook";
import LobbyUsers from "./LobbyUsers";
import { channelReducer } from "../socket/ChannelReducer";
const initialState = { messages: [], attendees: [] };

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
    </SocketProvider>
  );
};

export default Lobby;
