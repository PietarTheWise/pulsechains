require('dotenv').config()
const express = require('express')
const Web3 = require('web3')

const web3 = new Web3(process.env.INFURA)
const abi_json = require('./abis/NFT_TEST.json');
const ABI = abi_json["abi"];

const CONTRACT_ADDRESS = "0x680f6215b519fe79758CddDb2edf328cfeA6baFc";
const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

const app = express()
app.use(express.json())

const router = express.Router()

const fetchSellable = async (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	try
	{
		let uriArr = [];
		const data = await myContract.methods.inSaleAmount().call();
		let inSaleVal = parseInt(data);
		let i = 1;
		while (i < inSaleVal) {
			const nftData = await myContract.methods.nft_info(i).call();
			const dataArr = [nftData.json, nftData.price, i, nftData.mintable];
			uriArr.push(dataArr);
			i++;
		}
		res.status(200).json(uriArr);
	} 
	catch (err)
	{
		console.log("LOGGING ERROR: ", err);
		return (0)
	}
}

router.get('/', fetchSellable)

app.use('/api/nfts', router)

app.listen(4000, () => {
	console.log('listening on port 4000')
})
