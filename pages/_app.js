import { RootLayout } from "@/src/components";
import "@/src/styles/global.css";
import { Provider } from "react-redux";
import store from "../src/store";

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </RootLayout>
  );
}

export default MyApp;
