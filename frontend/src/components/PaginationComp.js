import React from 'react'
import {Button} from 'react-bootstrap';

function PaginationComp({ postsPerPage, totalPosts, paginate }) {
	const pageNumbers = [];

	for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++)
	{
		pageNumbers.push(i);
	}

	return (
		<nav className='pagination justify-content-center'>
			{pageNumbers.map(number => (
				<li key={number} className='page-item'>
					<Button onClick={() => paginate(number)} className='page-link'>
						{number}
					</Button>
				</li>
			))}
		</nav>
	)
}

export default PaginationComp
