// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {

    //возможные зачения пар
    string[] pairs = ["USD/RUB", "USD/EUR", "EUR/RUB", "EUR/USD", "RUB/USD", "RUB/EUR"];

    string pair;

    mapping(string => int) internal pairNums;

    //метод установки значений
    function setter_amount(string calldata _pair) public {
        pair = _pair;
        pairNums[pairs[0]] = 91340;
        pairNums[pairs[1]] = 910;
        pairNums[pairs[2]] = 100900;
        pairNums[pairs[3]] = 1100;
        pairNums[pairs[4]] = 10;
        pairNums[pairs[5]] = 9;
    }

    //метод возвращения значений
    function getter() public view returns (int) {
        int n = pairNums[pair];
        return n;
    }
}