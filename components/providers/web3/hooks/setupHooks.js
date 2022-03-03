import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";

export const setupHooks = (...deps) => {
  console.log("Setting up hooks");
  return {
    useAccount: createAccountHook(...deps),
    useNetwork: createNetworkHook(...deps),
  };
};
