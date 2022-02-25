import { Hero, Breadcrumbs } from "@components/common";
import { EthRates, WalletBar } from "@components/web3";
import { CourseList } from "@components/course";
import { OrderCard } from "@components/order";
import { BaseLayout } from "@components/layout";

export default function Home() {
  return (
    <BaseLayout>
      <Hero />
      <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard />
      <CourseList />
    </BaseLayout>
  );
}
