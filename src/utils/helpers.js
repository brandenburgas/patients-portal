import _ from "lodash";
import { userDBMock } from "./mockUserDB";

export const validatePassword = (password) => {
  const hasCapitalLetters = (string) => {
    const capitalLetters = [];
    for (let char of string) {
      if (char === char.toUpperCase()) {
        capitalLetters.push(char);
      }
    }
    return capitalLetters.length > 0;
  };

  const hasNumbers = (string) => {
    const regexp = /\d/;
    return regexp.test(string);
  };

  const isAlphanumeric = (string) => {
    const regexp = /^[a-zA-Z0-9]+$/;
    return regexp.test(string);
  };

  const hasCorrectLength = (string) => {
    return string.length >= 8 && string.length <= 128;
  };

  return (
    isAlphanumeric(password) &&
    hasCorrectLength(password) &&
    hasNumbers(password) &&
    hasCapitalLetters(password)
  );
};

export const validateUsername = (username) => {
  const hasEmailPattern = (string) => {
    const regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexp.test(string);
  };

  const hasCorrectDomainLength = (string) => {
    const slicedString = string.slice(
      string.indexOf("@") + 1,
      string.lastIndexOf(".")
    );
    return slicedString.length <= 128;
  };

  return hasEmailPattern(username) && hasCorrectDomainLength;
};

export const checkCredentials = (credentials) => {
  const parsedCredentials = JSON.parse(credentials.credentials);
  return userDBMock.find((entry) => _.isEqual(entry, parsedCredentials));
};

export const formatDate = (date) => {
  const inputDate = new Date(date);

  const options = { day: "numeric", month: "long", year: "numeric" };
  return inputDate.toLocaleDateString("en-GB", options);
};

export const sortByDateOrName = (a, b) => {
  const dateA = new Date(a.last_visit_date).getTime();
  const dateB = new Date(b.last_visit_date).getTime();

  if (dateA === dateB) {
    return a.name.slice(0, 1).localeCompare(b.name.slice(0, 1));
  }

  return dateA - dateB;
};
