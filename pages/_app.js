import "@/styles/globals.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import loading from "@/reducers/loading";
import basket from "@/reducers/basket";
import message from "@/reducers/message";
import clientData from "@/reducers/clientData";
import delivery from "@/reducers/delivery";
import indexSubCat from "@/reducers/indexSubCat";

const store = configureStore({
  reducer: { loading, basket, message, clientData, delivery, indexSubCat },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
