import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";
import Link from "next/link";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useRouter } from "next/router";

export default function Navbar() {
  const { connect, isLoading, isWeb3Loaded } = useWeb3();
  const { account } = useAccount();
  const { pathname } = useRouter();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Whishlist
                </a>
              </Link>
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  Loading...
                </Button>
              ) : isWeb3Loaded ? (
                account.data ? (
                  <Button
                    variant="orange"
                    hoverable={false}
                    className="cursor-default"
                  >
                    Hi there {account.isAdmin && "Admin"}
                  </Button>
                ) : (
                  <Button onClick={connect}>Connect</Button>
                )
              ) : (
                <Button
                  variant="red"
                  onClick={() =>
                    window.open("https://metamask.io/download/", "_blank")
                  }
                >
                  Install Metamask
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-black bg-orange-200 rounded-md p-2">
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
}
