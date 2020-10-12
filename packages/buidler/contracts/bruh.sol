// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import '@nomiclabs/buidler/console.sol';

// Random smart-contract to check if the dev environment is working and deploying properly
contract bruh {
    constructor() public {
        console.log('wassup?');
        return;
    }

    function myBruddha() public pure returns (string memory) {
        return 'Do you know da wae?';
    }
}
