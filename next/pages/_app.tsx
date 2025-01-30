import { Provider } from "react-redux";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../app/store/store";
import AnchorGrid from "../app/ui/AnchorGrid/AnchorGrid";
import Proton from "../app/ui/Proton/Proton";
import LogoComponent from "../app/ui/Logo";
import { UserProvider } from "../context/UserContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <Component {...pageProps} />
            <AnchorGrid rows={5} cols={5} />
            <Proton />
            <LogoComponent />
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
