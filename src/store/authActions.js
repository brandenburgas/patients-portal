import axios from "axios";
import { loginRequest, loginSuccess, loginFailure } from "./index";
import { checkCredentials } from "../utils/helpers";

export const getAuthenticated = (credentials, navigate) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    const authorised = checkCredentials(credentials);

    try {
      const response = await axios.post(
        "https://run.mocky.io/v3/3c2a2fcf-6148-48b9-aa81-0b8b3ac75fbc",
        credentials
      );

      if (response.status === 200 && authorised) {
        dispatch(loginSuccess(response.data));
        navigate("/patients");
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    } catch (error) {
      dispatch(loginFailure("An error occured during login"));
    }
  };
};
