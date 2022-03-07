import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OrderModal } from "@components/ui/order";
import { getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }) {
  const { web3 } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const purchaseCourse = (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    console.log(hexCourseId);

    // hex course id
    // 0x31333331363235000000000000000000

    // address
    // 0x0eFd16312c8f0c1300780bE5B73a7baC8157d74B

    // 313333313632350000000000000000000eFd16312c8f0c1300780bE5B73a7baC8157d74B
    // Order Hash
    // 94442bb311fdbe3f78c960199a0bd820bc72d7c0da9a1cd35e353d021534f0eb

    debugger;
    const orderHash = web3.utils.soliditySha3(
      {
        type: "bytes16",
        value: hexCourseId,
      },
      { type: "address", value: account.data }
    );
    console.log(orderHash);
    const emailHash = web3.utils.sha3(order.email);

    // greek@reka.gr
    // 1589b84f652605e2f037ababe860edba0639b7ce58139718d8396328986a3f01
    console.log(emailHash);

    // 1589b84f652605e2f037ababe860edba0639b7ce58139718d8396328986a3f0194442bb311fdbe3f78c960199a0bd820bc72d7c0da9a1cd35e353d021534f0eb
    // proof:
    // 1529daeb5660add57f8ac76bad78d6185ebf076ee393dc1fe6174b993fcafa9d
    const proof = web3.utils.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: orderHash,
      }
    );
    console.log(proof);
  };

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCourse}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onSubmit={purchaseCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();

  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
