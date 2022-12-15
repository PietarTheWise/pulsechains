import React, {useState, useContext} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { WalletContext } from "../contexts/WalletContext";

function ConnectModal() {
	const {connectWalletHandler} = useContext(WalletContext);
	// WalletContext
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="outline-dark" onClick={handleShow}>
				Buy This NFT
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={true}
			>
					<Modal.Header closeButton>
						<Modal.Title>Connect your metamask</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						Your metamask is not connected. If you don't have metamask installed, check our help page.
					</Modal.Body>

					<Modal.Footer>
						<Button variant="outline-dark" onClick={handleClose}>
							Close
						</Button>
						<Button variant="outline-dark" onClick={connectWalletHandler}>Connect To Metamask</Button>
					</Modal.Footer>
			</Modal>
    	</>
  	);
}

export default ConnectModal
