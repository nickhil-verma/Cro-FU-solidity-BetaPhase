// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Crowdfunding {
    struct Campaign {
        string title;
        string description;
        uint256 goal;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    function createCampaign(string memory _title, string memory _description, uint256 _goal) public {
        campaignCount++;
        campaigns[campaignCount] = Campaign(_title, _description, _goal);
    }
}
