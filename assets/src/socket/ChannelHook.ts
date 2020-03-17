import { useContext, useReducer, useEffect } from "react";
import SocketContext from "./SocketContext";
import { ChannelState } from "./ChannelReducer";
import { channelActions, ChannelActions } from "./ChannelActions";

const useChannel = (
  channelTopic: string,
  reducer: (state: ChannelState, action: ChannelActions) => ChannelState,
  initialState: ChannelState,
  name: string
) => {
  const socket = useContext(SocketContext);
  const [state, dispatch]: [ChannelState, any] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    socket.connect();

    const channel = socket.channel(channelTopic, {
      params: { name }
    });

    channel
      .join()
      .receive("ok", resp => {
        channel.push("new_join", { body: { name } });
      })
      .receive("error", ({ reason }) => {
        console.error("failed to join channel", reason);
      });

    channel.on("new_join", payload => {
      dispatch({ type: channelActions.NEW_JOIN, payload: payload.user_data });
    });

    channel.on("presence_state", response => {
      dispatch({
        type: channelActions.UPDATE_PRESENCE_STATE,
        payload: (response.user && response.user.metas) || []
      });
    });

    return () => {
      channel.leave();
    };
  }, [channelTopic, socket]);

  return state;
};

export default useChannel;
