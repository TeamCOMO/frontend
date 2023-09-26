import { atom, selector, useRecoilState } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const usernameState = atom({
  key: "usernameState",
  default: 0,
});

export const passwordState = atom({
  key: "passwordState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const checkedPasswordState = atom({
  key: "checkedPasswordState",
  default: 0,
});

export const nicknameState = atom({
  key: "nicknameState",
  default: 0,
});

export const emailState = atom({
  key: "emailState",
  default: 0,
});

export const postState = atom({
  key: "postState",
  default: [],
});
