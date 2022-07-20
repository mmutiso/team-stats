import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router';

import './UserRegistration.css';
import { connect } from 'react-redux';
import {
	registerUser,
	confirmUserRegistration,
} from '../store/actions/userActions';
import UserConfirmation from './UserConfirmation';
import { isValidEmail } from '../utils/isValidEmail';

class UserRegistration extends Component {
	state = {
		name: '',
		email: '',
		phoneNumber: '',
		phoneError: false,
		nameError: false,
		emailError: false,
		invalidEmailError: false,
	};

	handleNameChange = (e) => {
		this.setState({ name: e.target.value, nameError: false });
	};

	handleEmailChange = (e) => {
		this.setState({
			email: e.target.value,
			emailError: false,
			invalidEmailError: false,
		});
	};

	handlePhoneChange = (e) => {
		this.setState({ phoneNumber: e.target.value, phoneError: false });
	};

	handleSubmit = async () => {
		const { name, email, phoneNumber } = this.state;

		if (name.length === 0) {
			this.setState({ nameError: true });
		}

		if (email.length === 0) {
			this.setState({ emailError: true });
		}

		if (!isValidEmail(email)) {
			this.setState({ invalidEmailError: true });
		}

		if (phoneNumber.length < 10 || phoneNumber.length > 10) {
			this.setState({ phoneError: true });
		}

		const payload = { name, email, phoneNumber };

		await this.props.registerUser(payload);
	};

	handleConfirmation = async () => {
		const { location, history } = this.props;

		const params = new URLSearchParams(location.search);

		const email = params.get('Email');
		const token = params.get('Token');

		const payload = { email, token };

		await this.props.confirmUserRegistration(payload);

		// if(this.props.userConfirmationError.length == 0){
		// 	history.push()
		// }
	};

	render() {
		const {
			name,
			phoneNumber,
			email,
			nameError,
			emailError,
			phoneError,
			invalidEmailError,
		} = this.state;
		const {
			handleNameChange,
			handleSubmit,
			handleEmailChange,
			handlePhoneChange,
			handleConfirmation,
		} = this;

		const { isUserLoading, location, history, confirmUserRegistration } =
			this.props;

		const params = new URLSearchParams(location.search);

		const queryEmail = params.get('Email');
		const queryToken = params.get('Token');

		if (queryEmail && queryToken) {
			return <UserConfirmation handleConfirmation={handleConfirmation} />;
		}

		return (
			<div className='user-registration'>
				<div className='user-registration-input'>
					<TextField
						id='outlined-basic'
						label='Name'
						variant='outlined'
						fullWidth
						value={name}
						name='name'
						onChange={handleNameChange}
						error={nameError}
						helperText={nameError && 'The name is required'}
					/>
				</div>
				<div className='user-registration-input'>
					<TextField
						id='outlined-basic'
						label='Email'
						variant='outlined'
						fullWidth
						className='user-registration-input'
						name='email'
						value={email}
						onChange={handleEmailChange}
						error={emailError || invalidEmailError}
						helperText={
							emailError
								? 'The email is required'
								: invalidEmailError
								? 'Invalid email format'
								: ''
						}
					/>
				</div>
				<div className='user-registration-input'>
					<TextField
						id='outlined-basic'
						label='Phone number'
						variant='outlined'
						fullWidth
						className='user-registration-input'
						name='phone'
						value={phoneNumber}
						onChange={handlePhoneChange}
						placeholder='example: 0712345678'
						error={phoneError}
						helperText={phoneError && 'The phone number is required'}
					/>
				</div>
				<div className='user-registration-button'>
					<Button
						variant='contained'
						color='secondary'
						onClick={handleSubmit}
						fullWidth
						disabled={isUserLoading}
					>
						Submit
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ ...state.users });

const mapDispatchToProps = {
	registerUser,
	confirmUserRegistration,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(UserRegistration));
