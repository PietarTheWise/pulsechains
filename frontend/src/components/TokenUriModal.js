import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';

function TokenUriModal({metadata}) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	let data = JSON.stringify(metadata)

	const dataArr = data.split(",");
	return (
		<>
		
			<Button variant="outline-dark" className="col-4" onClick={handleShow}>
				Check Token Uri
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={true}
			>
					<Modal.Header closeButton>
						<Modal.Title>Close</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{dataArr[0]},<br/>{dataArr[1]},<br/>{dataArr[2]},<br/>{dataArr[3]},<br/>
					</Modal.Body>
			</Modal>
    	</>
  	);
}

export default TokenUriModal