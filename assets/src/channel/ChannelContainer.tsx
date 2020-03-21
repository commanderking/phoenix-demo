import React, { useState } from "react";
import Lobby from "./Lobby";

const ChannelContainer = () => {
  const [name, setName]: [String | null, any] = useState(null);
  const [typedName, setTypedName]: [String | null, any] = useState(null);

  if (!name) {
    return (
      <div>
        <h3>Choose a Name</h3>

        <form>
          <input
            value={typedName || ""}
            onChange={event => {
              setTypedName(event.target.value);
            }}
          ></input>
          <button
            onClick={event => {
              setName(typedName);
              setTypedName(null);
            }}
          >
            Enter Lobby
          </button>
        </form>
      </div>
    );
  }

  return <Lobby name={name} />;
};

export default ChannelContainer;
