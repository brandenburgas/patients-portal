import {
  validatePassword,
  validateUsername,
  checkCredentials,
  formatDate,
  sortByDateOrName,
} from "./helpers";

const getString = (length) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let restult = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters);
    restult += characters.charAt(randomIndex);
  }

  return restult;
};

const arrayToSort = [
  { name: "Adam S", last_visit_date: "2020-08-06T00:00:00.000Z" },
  { name: "Zod F", last_visit_date: "2020-08-07T00:00:00.000Z" },
  { name: "John D", last_visit_date: "2020-08-07T00:00:00.000Z" },
  { name: "Luke S", last_visit_date: "2020-08-06T00:00:00.000Z" },
];

describe("validatePassword", () => {
  it("should validate only alphanumeric password", () => {
    expect(validatePassword("Testing123!")).toBeFalsy();
  });

  it("should validate a password that is between 8 and 128 characters long", () => {
    expect(validatePassword("Testing123")).toBeTruthy();
    expect(validatePassword("Test3")).toBeFalsy();
    expect(validatePassword("Testing123" + getString(118))).toBeTruthy();
    expect(validatePassword("Testing123" + getString(119))).toBeFalsy();
  });

  it("should validate password with at least one number", () => {
    expect(validatePassword("TestingOneTwoThree")).toBeFalsy();
    expect(validatePassword("Testing123")).toBeTruthy();
  });

  it("should validate password with at least one capital letter", () => {
    expect(validatePassword("passwordwithoutcapital123")).toBeFalsy();
    expect(validatePassword("camelCasePassword123")).toBeTruthy();
  });
});

describe("validateUsername", () => {
  it("should validate username that conforms only to email pattern", () => {
    expect(validateUsername("user1235643.co")).toBeFalsy();
    expect(validateUsername("user123@example.com")).toBeTruthy();
  });

  it("should allow maximum of 128 characters betweenb `@` and `.`", () => {
    expect(validateUsername("user@" + getString(128) + ".com")).toBeTruthy();
    expect(validateUsername("user@" + getString(129) + ".com")).toBeFalsy();
  });

  it("should allow maximum of 6 characters after last `.` character", () => {
    expect(validateUsername("user@example.comcom")).toBeTruthy();
    expect(validateUsername("user@example.comcomc")).toBeFalsy();
  });
});

describe("checkCredentials", () => {
  it("should return true, if correct credentials are passed", () => {
    const credentials = JSON.stringify({
      username: "test.user@phrasee.co",
      password: "testpassword",
    });
    expect(checkCredentials({ credentials })).toBeTruthy();
  });

  it("should return false, if incorrect credentials are passed", () => {
    const credentials = JSON.stringify({
      username: "incorrect@username.com",
      password: "incorrectpassword",
    });
    expect(checkCredentials({ credentials })).toBeFalsy();
  });
});

describe("formatDate", () => {
  it("should return date in a format of (DD MONTH YEAR)", () => {
    expect(formatDate("2020-08-06T07:54:00.232Z")).toEqual("6 August 2020");
  });
});

describe("sortByNameOrDate", () => {
  it("should sort by last visit date or alphabetically by name if dates are the same", () => {
    expect(arrayToSort.sort(sortByDateOrName)).toEqual([
      { name: "Adam S", last_visit_date: "2020-08-06T00:00:00.000Z" },
      { name: "Luke S", last_visit_date: "2020-08-06T00:00:00.000Z" },
      { name: "John D", last_visit_date: "2020-08-07T00:00:00.000Z" },
      { name: "Zod F", last_visit_date: "2020-08-07T00:00:00.000Z" },
    ]);
  });
});
