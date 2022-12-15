import React, {useContext, useEffect, useState, useCallback}  from 'react';
import {Button, Card, Spinner} from 'react-bootstrap';
import { WalletContext } from "../contexts/WalletContext";
import OwnedConnect from "./OwnedConnect"

function Owned() {
	const {walletDisconnect, account} = useContext(WalletContext);
	const [ownedUris, setOwnedUris] = useState([]);
	const [loading, setLoading] = useState(false);

	// let defaultAccount = JSON.parse(sessionStorage.getItem('account'))
	// let defaultAccount = sessionStorage.getItem('account')
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

	const getOwnedNfts = useCallback(async () => {
		setLoading(true)
		const data = await fetch("http://localhost:4000/api/nfts").then((response) => response.json())
		let uriArr = []
		for (const nft_data of data)
		{
			try
			{
				if (defaultAccount === nft_data[0].toLowerCase())
				{
					if (nft_data)
					{
						let test = nft_data[1];
						uriArr.push(test)
					}
				}
			}
			catch (error)
			{

			}
		}
		setOwnedUris(uriArr)
		setLoading(false)
	}, [defaultAccount])

	useEffect(() => {
		getOwnedNfts();
	}, [defaultAccount, getOwnedNfts]);

	if (loading) {
		return  (
		<div style={{marginTop: "40vh"}} className="row align-items-center justify-content-center g-0" >
			<h2 className='text-center text-white' >Fetching your Pulsechains...</h2>
			<Spinner animation="border" variant="light" className='m-5'/>
		</div>
		);
	}

	return (
		<div className="row my-5 py-5 align-items-center justify-content-center g-0">
				<div className="row align-items-start justify-content-center p-5 m-5 my-5" >
					{defaultAccount ?
							(ownedUris.length > 0 ?
								ownedUris.map((uri, index)=> {
									let metadata =  JSON.parse(uri)
									return (
										<div key={index} className="col-8 col-lg-3">
											<Card>
												<Card.Img variant="top" src={metadata.image}/>
												<Card.Body>
													<Card.Title>{metadata.name}</Card.Title>
												</Card.Body>
											</Card>
										</div>
									)
								}) :
								<div className="row my-5 py-5 align-items-center justify-content-center g-0">
									<h1 className='text-center text-white py-5'>You don't own any nfts</h1>
									<div style={{paddingLeft: "20vw", paddingRight: "20vw"}} className="row">
										<Button variant="outline-success" className="text-light border-primary buttonClass" href="/#nfts">Buy some</Button>
									</div>
								</div> 
							)
							: <OwnedConnect/> }
			</div>
			{defaultAccount ?
			<div className="row my-5 py-5 align-items-center justify-content-center">
				<Button variant="outline-success" className="text-light border-primary buttonClass col-lg-3" onClick={walletDisconnect}>Disconnect Wallet</Button>
			</div> 
			: null}
		</div>
	)
}

export default Owned

