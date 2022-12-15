import React, {useContext} from 'react'
import { Button } from 'react-bootstrap';
import { WalletContext } from "../contexts/WalletContext";
import "../style/style.css"

function WalletConnect() {
	const {connectWalletHandler, connButtonText, defaultAccount, errorMessage } = useContext(WalletContext);

	return (
		<div className="row align-items-center justify-content-center g-0 bg" >
			{!defaultAccount ? 
			<div className='row align-items-center justify-content-center'>
				<h1 className='text-white text-center py-5'> Connect your Metamask!</h1>
				<div style={{paddingLeft: "20vw", paddingRight: "20vw"}} className="row">
					<Button variant="outline-success" className="text-light border-primary buttonClass" onClick={connectWalletHandler}>{connButtonText}</Button>
					<p className='text-white text-center py-5'>{errorMessage}</p>
				</div>
			</div>
			: <div> <h1 className='text-white my-4 py-5'> Have fun shopping with us! </h1>
					<h3 className='text-white my-4 text-secondary'> Connected on: { defaultAccount.substr(0, 6) + "..." + defaultAccount.substr(defaultAccount.length - 4, defaultAccount.length)}</h3>
				</div>}
		</div>
	)
}

export default WalletConnect
