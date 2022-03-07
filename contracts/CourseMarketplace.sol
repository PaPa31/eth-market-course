// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint256 id; // 32
        uint256 price; // 32
        bytes32 proof; // 32
        address owner; // 20
        State state; // 1
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof)
        external
        payable
        returns (bytes32)
    {
        // course id = 10
        // ascii to hex = 3130
        // bytes16 = 0x00000000000000000000000000003130
        // (take account from remix.ethereum.org)0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
        // (put together two above value): 000000000000000000000000000031305B38Da6a701c568545dCfcB03FcB875f56beddC4
        // (keccak256 above): c4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
        // (any test number bytes32): 0x0000000000000000000000000000313000000000000000000000000000003130

        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        return courseHash;
    }
}
