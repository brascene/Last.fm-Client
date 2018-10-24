import { RootNavigator } from "../../navigation";

const initialRoute = RootNavigator.router.getActionForPathAndParams(
  "Countries"
);
export const INITIAL_STATE = RootNavigator.router.getStateForAction(
  initialRoute
);

export default (state = INITIAL_STATE, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
