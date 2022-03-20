import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { useState } from "react";

// BEFORE TX BALANCE -> 82,06930636599999999

// GAS 136993 * 20000000000 -> 2739860000000000 -> 0,00273986

// GAS + VALUE SEND = 0,00273986 + 1 -> 1,00273986

// AFTER TX -> 81,066566506 (calculator rounded)
// AFTER TX -> 81066566505999999990
//             82066566505999999990 (AFTER Deactevated)

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..."
      />
      <Button
        onClick={() => {
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
};
export default function ManagedCourses() {
  const [proofedOwnership, setProofedOwnership] = useState({});
  const { web3, contract } = useWeb3();
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);

  const verifyCourse = (email, { hash, proof }) => {
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: hash,
      }
    );

    proofToCheck === proof
      ? setProofedOwnership({
          ...proofedOwnership,
          [hash]: true,
        })
      : setProofedOwnership({
          ...proofedOwnership,
          [hash]: false,
        });
  };

  const changeCourseState = async (courseHash, method) => {
    try {
      await contract.methods[method](courseHash).send({
        from: account.data,
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  const activateCourse = async (courseHash) => {
    changeCourseState(courseHash, "activateCourse");
  };

  const deactivateCourse = async (courseHash) => {
    changeCourseState(courseHash, "deactivateCourse");
  };

  if (!account.isAdmin) {
    return null;
  }

  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <VerificationInput
              onVerify={(email) => {
                verifyCourse(email, { hash: course.hash, proof: course.proof });
              }}
            />
            <div className="mt-3">
              {proofedOwnership[course.hash] && <Message>Verified!</Message>}
              {proofedOwnership[course.hash] === false && (
                <Message type="danger">Wrong Proof!</Message>
              )}
              {course.state === "purchased" && (
                <div>
                  <Button
                    onClick={() => activateCourse(course.hash)}
                    variant="green"
                  >
                    Activate
                  </Button>
                  <Button
                    onClick={() => deactivateCourse(course.hash)}
                    variant="red"
                  >
                    Deactivate
                  </Button>
                </div>
              )}
            </div>
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}

ManagedCourses.Layout = BaseLayout;
