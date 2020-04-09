import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Box } from "../common";
import qs from "query-string";

const UsernameSelection = () => {
  const [username, setUsername] = useState("");
  const history = useHistory();
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      history.push({
        pathname: "/chat",
        search: qs.stringify({ username }),
      });
    },
    [history, username]
  );
  return (
    <form>
      <Box>
        <Input
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Bob, Joeffrey, Stark..."
        />
        <Button onClick={onClick}>GO TO CHAT</Button>
      </Box>
    </form>
  );
};

export default UsernameSelection;
