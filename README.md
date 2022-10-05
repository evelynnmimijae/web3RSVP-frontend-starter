# Web3RSVP-frontend

The meat and potatoes of the Web3rsvp project! 

In this repo, you will see the style of the website and be able to interact with it. 
More specifically, users will be able to connect their wallet and interact with the smart contract so they can create new events, RSVP to events, and confirm attendees. User can also create new events. 

First, we set up RainbowKit to support an intuitive multi-wallet experience in our app. Then, we integrate Web3.Storage to store some event data off-chain, or off the blockchain. After that, yo see we import and use ethers.js to interact with our deployed smart contract. Finally, our frontend call our smart contract's createNewEvent function and handle successful or failed transactions.

Tools = React, Next.js, ethers.js, Rainbowkit, Web3.Storage, and The Graph

To see how the project came to fruition, view the following repositories: 

Setting up the project using Hardhat; custom events coding using Solidity; wrote and deployed contract - Infura; testing scripts https://github.com/evelynnmimijae/web3rsvp

Subgraph; The Graph, Schema - https://github.com/evelynnmimijae/web3rsvp-thegraph

Frontend; RainbowKit, Ethersjs, https://github.com/evelynnmimijae/web3RSVP-frontend-starter

### Fork and clone the repo from Github to work with it locally

1. Click the "Fork" button

2. In your account's forked github repo, click the "Code" button and copy the repo link.

3. Open your terminal.

4. CD into the repo 

5. Install dependencies `npm i`

6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
