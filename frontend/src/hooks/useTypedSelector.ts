import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useTypedSelector = <TResponse = any>(selector: (state: RootState) => TResponse) => useSelector(selector);