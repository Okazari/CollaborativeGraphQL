import { useMemo } from "react";
import uniq from "lodash/uniq";
import faker from "faker";

const colorList = [
  "#ffbca8",
  "#babbea",
  "#dfcae2",
  "#c8e2de",
  "#e9eaba",
  "#f2bdbd",
];

const colorCache = JSON.parse(
  window.localStorage.getItem("colorCache") || "{}"
);

export const getUserColor = (username) => {
  if (colorCache[username]) return colorCache[username];
  const color = faker.helpers.shuffle(colorList)[0];
  colorCache[username] = color;
  window.localStorage.setItem("colorCache", JSON.stringify(colorCache));
  return color;
};

const useUsernameColors = (messages) => {
  const usernames = uniq(messages.map((m) => m.user.username));
  return useMemo(
    () =>
      usernames.reduce(
        (acc, username) => ({ ...acc, [username]: getUserColor(username) }),
        {}
      ),
    [usernames.length]
  );
};

export default useUsernameColors;
