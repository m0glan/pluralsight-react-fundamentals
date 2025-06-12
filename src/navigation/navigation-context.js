import { createContext } from "react";
import navigationValues from "./navigation-values";

const navigationContext = createContext(navigationValues.home)

export default navigationContext;