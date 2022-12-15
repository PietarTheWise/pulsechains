## Pulsechains Nft Web App
Decentralized application that talks with an nft smart contract. The smart contract is currently a test version deployed in goerli testnet.
The images are dummy images that are not part of the original pulsechains.io. You can connect your metamask to it as well and buy dummy nft's with goerli test eth.
It's built using react, react-bootstrap, node.js, express, web3 library. There are some small changes to the deployed source code due to compatibility errors. 

In order to run this you need either an ethereum node or apikeys from https://www.infura.io/. Just add .env file to the root of the backend folder
and add:

```bash
INFURA=(your infura link here)
```
You also need node.js installed.

To launch the server on the root of the backend run:
```bash
npm install
node index.js
```

To launch the frontend on the root of the frontend run:
```bash
npm install
npm start
```

