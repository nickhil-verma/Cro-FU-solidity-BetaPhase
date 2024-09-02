// src/App.js

import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Ensure this ABI matches the deployed contract ABI
const contractABI =[
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_unlockTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "when",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unlockTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


const contractAddress = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [campaignId, setCampaignId] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  const createCampaign = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.createCampaign(title, description, ethers.parseEther(goal));
      await tx.wait();
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert(`Failed to create campaign: ${error.message}`);
    }
    
  };

  const donateToCampaign = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.donate(campaignId, { value: ethers.parseEther(donationAmount) });
      await tx.wait();
      alert("Donation successful!");
    } catch (error) {
      console.error("Error donating:", error);
      alert("Failed to donate");
    }
  };

  return (
    <div className="App">
      <h1>Crowdfunding Platform</h1>
      <div>
        <h2>Create a Campaign</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Goal in ETH"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button onClick={createCampaign}>Create Campaign</button>
      </div>

      <div>
        <h2>Donate to a Campaign</h2>
        <input
          type="number"
          placeholder="Campaign ID"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Donation Amount in ETH"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
        <button onClick={donateToCampaign}>Donate</button>
      </div>
    </div>
  );
}

export default App;
