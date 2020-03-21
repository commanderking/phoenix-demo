import { channelActions, ChannelActions } from "./ChannelActions";

export type Message = {
  text: string;
};

export type Attendee = {
  name: string;
  phx_ref: string;
};

export type ChannelState = {
  messages: Message[];
  attendees: Attendee[];
};

export const channelReducer = (state: ChannelState, action: ChannelActions) => {
  switch (action.type) {
    case channelActions.NEW_MSG:
      return { ...state, messages: [...state.messages, action.payload] };
    case channelActions.NEW_JOIN:
      return { ...state, attendees: [...state.attendees, action.payload] };
    case channelActions.USER_LEAVE:
      return { ...state, attendees: [...state.attendees, action.payload] };
    case channelActions.UPDATE_PRESENCE_STATE:
      return { ...state, attendees: action.payload };
    case channelActions.SYNC_PRESENCE:
      return { ...state, attendees: action.payload };
    default:
      throw new Error("Non valid Action");
  }
};
