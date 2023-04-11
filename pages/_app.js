import "@/styles/globals.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import loading from "@/reducers/loading";
import basket from "@/reducers/basket";
import message from "@/reducers/message";

const store = configureStore({
  reducer: { loading, basket, message },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
