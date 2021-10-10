import { getAccessToken, isTokenActive } from "./auth";

import { UserResponse } from "../api";

const ANY_ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidXNlcklkIjo2NjYsInJvbGUiOiJhZG1pbiIsInVzZXJOYW1lIjoiYW55LXVzZXJuYW1lIiwiZGlzcGxheU5hbWUiOiJhbnktdXNlciJ9LCJpYXQiOjE2MDEwMjc1NTMsIm5iZiI6MTYwMTAyNzU1MywiZXhwIjoxNjAxMTEzOTUzfQ.mawIBUtKX-GFadbUuni4hUvx243VOy3D24Ux8JlHuxs";
const ANY_EXPIRES_IN = 666;
const CURRENT_TIMESTAMP = 111;
const ANY_USER: UserResponse = {
  active: true,
  displayName: "any-user",
  id: 666,
  role: "admin",
  userName: "any-username",
};

beforeEach(() => {
  jest.useFakeTimers();
  Date.now = jest.fn(() => CURRENT_TIMESTAMP);
});

afterEach(async () => {
  jest.clearAllTimers();
  jest.resetAllMocks();
  localStorage.removeItem("token");
});

test("getAccessToken without token set", () => {
  // When
  const actual = getAccessToken();

  // Then
  expect(actual).toBe("");
});

test("isTokenActive on non existing token", () => {
  // When
  const actual = isTokenActive();

  // Then
  expect(actual).toBeFalsy();
});

describe.each([
  ["current", true, CURRENT_TIMESTAMP],
  [
    "edge before expiration",
    true,
    CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000 - 1,
  ],
  ["date before", false, CURRENT_TIMESTAMP - 1],
  ["exact expiration", false, CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000],
])("isTokenActive", (desc, expected, testTimestamp) => {
  test(`is ${expected} on ${desc}`, () => {
    // Given
    Date.now = jest.fn(() => testTimestamp);

    // And
    setAuthToken();

    // When
    const actual = isTokenActive();

    // Then
    expect(actual).toBe(expected);
  });
});

interface Token {
  accessToken: string;
  notBeforeTimestampInMillis: number;
  expirationTimestampInMillis: number;
  user?: UserResponse;
}

function setAuthToken() {
  const token: Token = {
    accessToken: ANY_ACCESS_TOKEN,
    notBeforeTimestampInMillis: CURRENT_TIMESTAMP,
    expirationTimestampInMillis: ANY_EXPIRES_IN * 1000 + CURRENT_TIMESTAMP,
    user: ANY_USER,
  };
  localStorage.setItem("token", JSON.stringify(token));
}
