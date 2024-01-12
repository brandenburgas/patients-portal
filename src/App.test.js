import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

import App from "./App";
import store from "./store";
import { validatePassword, validateUsername } from "./utils/helpers";

const setup = () => {
  const utils = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return {
    ...utils,
  };
};

describe("Login form", () => {
  it("should be rendered on initial page load", async () => {
    const { getByTestId } = setup();
    const loginForm = getByTestId("loginForm");

    expect(loginForm).toBeInTheDocument();
  });
});

describe("Input validation", () => {
  const manipulateForm = (username, password) => {
    const { getByLabelText, getByTestId } = setup();

    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const loginForm = getByTestId("loginForm");

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.submit(loginForm);

    return { usernameInput, passwordInput };
  };

  it("should not validate password that is less than 8 characters", async () => {
    const { usernameInput, passwordInput } = manipulateForm(
      "JohnDoe@gmail.com",
      "John123"
    );

    expect(validateUsername(usernameInput.value)).toBeTruthy();
    expect(validatePassword(passwordInput.value)).toBeFalsy();
  });

  it("should validate password that alphanumerical", async () => {
    const { usernameInput, passwordInput } = manipulateForm(
      "JohnDoe@gmail.com",
      "John123!"
    );

    expect(validateUsername(usernameInput.value)).toBeTruthy();
    expect(validatePassword(passwordInput.value)).toBeFalsy();
  });

  it("should validate an email that conforms to the pattern `username@company.com`", async () => {
    const { usernameInput, passwordInput } = manipulateForm(
      "JohnDoegmail.com",
      "John123495"
    );

    expect(validateUsername(usernameInput.value)).toBeFalsy();
    expect(validatePassword(passwordInput.value)).toBeTruthy();
  });
});
