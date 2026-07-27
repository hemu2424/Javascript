export default {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  moduleFileExtensions: ["js", "jsx"],

  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
};