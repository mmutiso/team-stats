import React from 'react';
import Button from '@mui/material/Button';
import './UserConfirmation.css';
import Typography from '@mui/material/Typography';

function UserConfirmation({ handleConfirmation }) {
	return (
		<div className='user-confirmation'>
			<Typography variant='body1' gutterBottom>
				Kindly confirm registration
			</Typography>
			<Button
				variant='contained'
				onClick={handleConfirmation}
				color='secondary'
			>
				Confirm
			</Button>
		</div>
	);
}

export default UserConfirmation;
