import React, {useContext } from 'react';
import {Link} from 'react-router-dom';
import "../style/style.css";
import {Navbar, Container, NavDropdown, Button, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Owned from './Owned';
import { WalletContext } from "../contexts/WalletContext";
import Home from './Home';
import Logo from './img/pulsechains_logo.svg';

function Navi() {
	const {connectWalletHandler, getCurrentVal, walletDisconnect, account} = useContext(WalletContext);

	// let defaultAccount = JSON.parse(sessionStorage.getItem('account'));
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

	const day1 = 1663846988909;
	const today = Math.ceil(((Date.now() - day1) / 86400000));
	return (
		<div>
			<Router>
				<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
					<Container fluid>
						<Nav.Link as={Link} to="/" href="#action1">
							<Navbar.Brand>
							<img
								src={Logo}
								width="30"
								height="30"
								className="d-inline-block align-top"
								alt="React Bootstrap logo"/>
							</Navbar.Brand>
							<Navbar.Brand>
								Pulsechains
							</Navbar.Brand>
						</Nav.Link>
						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
						>
							<Nav.Link as={Link} to="/" href="#action1">Catalogue</Nav.Link>
							<Nav.Link as={Link} onClick={getCurrentVal} to="/owned"  href="#action2">Your Collection</Nav.Link>
							<NavDropdown bg="dark" variant="dark" title="More" id="navbarScrollingDropdown">
								<NavDropdown.Item href="https://pulsechains.io/getstarted" target="_blank" rel="noopener noreferrer">New With Nfts?</NavDropdown.Item>
								<NavDropdown.Item href="https://pulsechains.io/faq" target="_blank" rel="noopener noreferrer">F.A.Q</NavDropdown.Item>
								<NavDropdown.Divider />
								{ defaultAccount ?
									<NavDropdown.Item onClick={walletDisconnect}>Disconnect Wallet
									</NavDropdown.Item> 
								: null
								}
							</NavDropdown>

						</Nav>
						<Navbar.Brand>
									Day {today}
						</Navbar.Brand>
						{defaultAccount ? <Navbar.Brand variant="dark">{"connected on: " + defaultAccount.substr(0, 6) + "..." + defaultAccount.substr(defaultAccount.length - 4, defaultAccount.length)}</Navbar.Brand> :
							<Button variant="outline-primary" onClick={connectWalletHandler} >Connect To Metamask</Button>
						}
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/owned" element={<Owned/>}/>
				</Routes>
			</Router>
		</div>
	)
}

export default Navi
