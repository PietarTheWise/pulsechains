import React, { createContext, useState, } from "react";
import "../style/style.css"

export const WalletContext = createContext();

const WalletContextProvider = (props) => {

	const [loggedIn, setLoggedStatus] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [cardConnect, setCardConnect] = useState(false);
	// const CONTRACT_ADDRESS = "******PLACE HOLDER*******"
	const CONTRACT_ADDRESS = "0x680f6215b519fe79758CddDb2edf328cfeA6baFc"
	const [account, setAccount] = useState(null);
	
	let walletDisconnect = () => {
		setLoggedStatus(false);
		try {
			sessionStorage.setItem('account', null);
			window.location.reload();
		}
		catch (e)
		{
			// console.log("Something went wrong")
			window.location.reload();
		}
	}
	
	const connectWalletHandler = async () => {
		if (window.ethereum) 
		{
			try
			{
				const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
				// sessionStorage.setItem('account', JSON.parse(accounts[0]))
				try
				{
					sessionStorage.setItem('account', accounts[0]);
				}
				catch (e)
				{
					console.log("cannot use sessionStorage")
				}
				accountChangedHandler(accounts[0]);
				// changeLogValue();
				setLoggedStatus(true);
				setConnButtonText('Wallet Connected');
			}
			catch (error) 
			{
				setErrorMessage('Wallet Connection Error, check if logged in to metamask.');
			}
		}
	}
	
	const accountChangedHandler = (newAccount => {
		try {setDefaultAccount(sessionStorage.getItem('account'))}
		catch (e) {}
		setAccount(newAccount)
	})

	return (
		<WalletContext.Provider value={{
										loggedIn,
										connButtonText, 
										defaultAccount, 
										errorMessage, 
										connectWalletHandler, 
										cardConnect, 
										setCardConnect,
										walletDisconnect,
										CONTRACT_ADDRESS,
										account
										// provider,
										}}>
			{props.children}
		</WalletContext.Provider>
	);
};

export default WalletContextProvider;
