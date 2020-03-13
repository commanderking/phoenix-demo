import SocketProvider from "../socket/SocketProvider";
import React from "react";
import useChannel from "../socket/ChannelHook";

type Message = {
  text: String;
};

type Action =
  | { type: "new_msg"; payload: Message }
  | { type: "new_join"; payload: Attendee };

type Attendee = {
  name: String;
};

type State = {
  messages: Message[];
  attendees: Attendee[];
};

const initialState = [{ messages: [], attendees: [] }];

const channelReducer = (state: State, action: Action) => {
  console.log("action", action);
  switch (action.type) {
    case "new_msg":
      return { ...state, messages: [...state.messages, action.payload] };
    case "new_join":
      return { ...state, attendees: [...state.attendees, action.payload] };
    default:
      return "";
  }
};

const ChannelContainer = () => {
  const state = useChannel("room:lobby", channelReducer, initialState);
  return (
    <SocketProvider>
      <div>Container</div>
    </SocketProvider>
  );
};

export default ChannelContainer;
