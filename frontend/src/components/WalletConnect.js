import React, {useContext} from 'react'
import { Button, Card } from 'react-bootstrap';
import { WalletContext } from "../contexts/WalletContext";
import "../style/style.css"
import downArrow  from "../style/down.svg";
import imageLink from "./img/nft_1.jpg"

function WalletConnect() {
	const {connectWalletHandler, connButtonText, account} = useContext(WalletContext);
	
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
	
	return (
		<div className="row align-items-center justify-content-center bg col-lg-10" >
				<div className='col-sm-10 col-md-8 col-lg-6 py-1' >
					{
						!defaultAccount ? <h1 className='text-white py-5'> Connect your Metamask <br/>for shopping!</h1>
					: <div> <h1 className='text-white my-4 py-5'> {"Have fun shopping with us!"} </h1>
							<h3 className='text-white my-4 text-secondary'> Connected on: { defaultAccount.substr(0, 6) + "..." + defaultAccount.substr(defaultAccount.length - 4, defaultAccount.length)}</h3>
					 </div>}
					<Button variant="outline-success" className="text-light border-primary buttonClass" onClick={connectWalletHandler}>{connButtonText}</Button>
				</div>
				<div className='col-sm-10 col-md-8 col-sm-10 col-lg-4 py-1'>
					<Card className='col-lg-12'>
						<Card.Img src={imageLink}></Card.Img>
						<Card.Body>
							<Card.Title text="primary">Nft for pet lovers</Card.Title>
							<Button variant="outline-dark" href="#nfts" className="buttonClass">Buy some</Button>
						</Card.Body>
					</Card>
				</div>
				<div className='row col-sm-6 col-lg-4 align-items-center justify-content-center'>
					<a href="#nfts" className='row py-5' ><img className='text-center' src={downArrow} alt="down" height={"15px"}></img></a>
				</div>
		</div>
	)
}

export default WalletConnect;
