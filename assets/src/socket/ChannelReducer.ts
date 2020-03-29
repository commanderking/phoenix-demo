import { channelActions, ChannelActions } from "./ChannelActions";

export type Message = {
  text: string;
  name: string;
};

export type Attendee = {
  name: string;
  phx_ref: string;
  uuid: string;
};

export type UserLobbyAction = {
  name: string;
  uuid: string;
  actionType:
    | typeof channelActions.USER_JOIN
    | typeof channelActions.USER_LEAVE;
};

export type ChannelState = {
  messages: Message[];
  attendees: Attendee[];
  userLobbyActions: UserLobbyAction[];
};

export const channelReducer = (
  state: ChannelState,
  action: ChannelActions
): ChannelState => {
  switch (action.type) {
    case channelActions.NEW_MSG:
      return { ...state, messages: [...state.messages, action.payload] };
    case channelActions.USER_JOIN:
      return {
        ...state,
        userLobbyActions: [...state.userLobbyActions, action.payload]
      };
    case channelActions.USER_LEAVE:
      return {
        ...state,
        userLobbyActions: [...state.userLobbyActions, ...action.payload]
      };
    case channelActions.UPDATE_PRESENCE_STATE:
      return { ...state, attendees: action.payload };
    case channelActions.SYNC_PRESENCE:
      return { ...state, attendees: action.payload };
    default:
      throw new Error("Non valid Action");
  }
};
