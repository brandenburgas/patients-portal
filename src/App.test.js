import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import App from "./App";
import store from "./store";

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

describe("Login form with inputs", () => {
  it("should be rendered on initial page load", async () => {
    const { getByTestId, getByLabelText } = setup();

    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const loginForm = getByTestId("loginForm");

    expect(loginForm).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
