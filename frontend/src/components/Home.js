import React, {useState, useEffect, useContext, useCallback} from 'react'
import WalletConnect from './WalletConnect';
import { WalletContext } from "../contexts/WalletContext";
import DisplayNFTS from './DisplayNFTS';
import PaginationComp from './PaginationComp';

function Home() {
	const {account} = useContext(WalletContext);
	const [nftsInsale, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	let defaultAccount;

	try {
		defaultAccount = sessionStorage.getItem('account')
	}
	catch (e)
	{
		defaultAccount = account;
	}
	if (defaultAccount === 'null')
		defaultAccount = null;

	const loadData = useCallback(async () => {
		setLoading(true)
		const data = await fetch("http://localhost:4000/api/nfts").then((response) => response.json())
		let uriArr = []
		console.log("here: ", data);
		let i = 1;
		for (const nft_data of data)
		{
			// const nftDataArray = Object.values(nft_data)
			let price = Number(nft_data.price);
			console.log("price", price)
			// let price = parseInt(nft_data[1]._hex, 16)
			// let price = Number(nft_data.price)
			// console.log("pretzel: ", typeof nft_data.price)
			let uri = nft_data[0]
			let dataArr = []
			dataArr.push(price, uri, i, nft_data[2])
			uriArr.push(dataArr)
			i++;
		}
		setData(uriArr)
		setLoading(false)
	}, [])
	
	useEffect(() => {
		loadData();
	}, [loadData]);


	let shuffled = nftsInsale
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

	const indexOfLastNFT = currentPage * postsPerPage;
	const indexOfFirstNFT = indexOfLastNFT - postsPerPage;
	const currentNfts = shuffled.slice(indexOfFirstNFT, indexOfLastNFT)

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	}

	return (
		<section>
			<div id="" className="row my-5 py-5 align-items-center justify-content-center g-0">
				<WalletConnect />
				<DisplayNFTS nfts={currentNfts} loading={loading} defaultAccount={defaultAccount}/>
				<PaginationComp postsPerPage={postsPerPage} totalPosts={nftsInsale.length} paginate={paginate}/>
			</div>
		</section>
	)
}

export default Home
