import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x0eFd16312c8f0c1300780bE5B73a7baC8157d74B": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);

  return {
    account: {
      data,
      isAdmin: (data && adminAddresses[data]) ?? false,
      mutate,
      ...rest,
    },
  };
};
