import { Routes } from "./routes";
import { LoginContextProvider } from "../context";
import '../Global.css'

export const App = () => {
  return (
    <LoginContextProvider>
      <Routes />
    </LoginContextProvider>
  );
}
