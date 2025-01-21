import { Provider } from "react-redux";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../app/store/store";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
