import React, {useContext} from 'react'
import {Button} from 'react-bootstrap';
import {ethers, BigNumber} from 'ethers'
import abi_json from './abis/PlsChainsTest.json';
import { WalletContext } from "../contexts/WalletContext";

function BuyBtn(props) {
	const {CONTRACT_ADDRESS} = useContext(WalletContext);

	const buyNft = async () => {
		if (window.ethereum)
		{
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer   = provider.getSigner();
			const contract = new ethers.Contract(
				CONTRACT_ADDRESS,
				abi_json.abi,
				signer
			);
			try
			{
				const response = await contract.create(BigNumber.from(props.value), {value: ethers.utils.parseEther((props.price / 10000).toString())});
				console.log("response: ", response);
			}
			catch (err)
			{
				console.log("error: ", err);
			}
		}
	}
	return (
		<Button variant="outline-dark" onClick={buyNft}>Buy This NFT</Button>
	)
}

export default BuyBtn