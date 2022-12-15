import React from 'react'
import {Card, Spinner} from 'react-bootstrap';
import ConnectModal from './ConnectModal';
import BuyBtn from './BuyBtn';
import '../style/style.css'
// import imageLinkki from './img/nft_1.jpg'
import placeHolder from './img/placeholder.jpg'

function DisplayNFTS({nfts, loading, defaultAccount}) {
	
	const errorHandler = ({ currentTarget }) => {
		currentTarget.onerror = null;
		currentTarget.src= placeHolder;
	}

	if (loading) {
		return  (
		<div style={{marginTop: "20vh"}} className="row align-items-center justify-content-center g-0" >
			<h2 className='text-center text-white' >Connecting to Pulsechains...</h2>
			<Spinner animation="border" variant="light" className='m-5'/>
		</div>
		);
	}

	return (
		<div id="nfts" className="row my-5 py-5 align-items-center justify-content-center g-0">
				{nfts.map((uri, index) => {
					if (uri[1])
					{
						let metadata =  JSON.parse(uri[1])
						let price = uri[0];
						console.log("price: ", price)
						let sold = uri[3];
						let imageLink = metadata.image;
						return	(
								<div key={index} className="col-8 col-lg-3 m-2">
									<Card>
										<img src={imageLink} style={{width: "100%"}} onError={errorHandler} alt="NFT"></img>
										{!sold ? <div className="overlay">
											<div className="content">
												<h3>Sold</h3>
											</div>
										</div>
										: null}
										<Card.Body>
											<Card.Title text="primary">{metadata.name}</Card.Title>
											<Card.Text>{(price / 10000).toString() + " Eth"}</Card.Text>
											{!defaultAccount ? <ConnectModal/> : <BuyBtn price={price} value={parseInt(metadata.attributes[0].token_id)}></BuyBtn>}
										</Card.Body>
									</Card>
								</div>
							)
					}
					else
						return (null)
				})
				}
		</div>
		
	)
}

export default DisplayNFTS
