import { useWalletInfo } from "@components/hooks/web3";
import { Breadcrumbs, Button } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { EthRates, WalletBar } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { canPurchaseCourse } = useWalletInfo();

  return (
    <>
      <div className="pt-4">
        <WalletBar />
        <EthRates />
        <div className="flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
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
