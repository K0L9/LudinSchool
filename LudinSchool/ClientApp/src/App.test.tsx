import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { createBrowserHistory } from "history";
import App from "./App";

const history = createBrowserHistory();
const store = configureStore(history);

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
