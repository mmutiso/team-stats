import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isValidEmail } from '../utils/isValidEmail';

import { requestUserLogin } from '../store/actions/userActions';

import './UserLogin.css';
import UserConfirmation from './UserConfirmation';

export class UserLogin extends Component {
	state = { email: '', invalidEmailError: false, emailError: false };

	handleChange = (e) => {
		this.setState({
			email: e.target.value,
			emailError: false,
			invalidEmailError: false,
		});
	};

	handleSubmit = async () => {
		const { email } = this.state;

		if (email.length === 0) {
			this.setState({ emailError: true });
		}

		if (!isValidEmail(email)) {
			this.setState({ invalidEmailError: true });
		}

		await this.props.requestUserLogin(email);
	};

	handleConfirmation = () => {};

	render() {
		const { email, emailError, invalidEmailError } = this.state;
		const { handleChange, handleSubmit, handleConfirmation } = this;
		const { isUserLoginLoading } = this.props;

		const { isUserLoading, location, history, confirmUserRegistration } =
			this.props;

		const params = new URLSearchParams(location.search);

		const queryEmail = params.get('Email');
		const queryToken = params.get('Token');

		if (queryEmail && queryToken) {
			return <UserConfirmation handleConfirmation={handleConfirmation} />;
		}

		return (
			<div className='user-login'>
				<Typography variant='body1' className='user-login-text'>
					Enter your email to login
				</Typography>
				<div className='user-login-input'>
					<TextField
						id='outlined-basic'
						label='Email'
						variant='outlined'
						fullWidth
						name='email'
						value={email}
						onChange={handleChange}
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
				<div className='user-registration-button'>
					<Button
						variant='contained'
						color='secondary'
						onClick={handleSubmit}
						fullWidth
						disabled={isUserLoginLoading}
					>
						Submit
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ ...state.users });

const mapDispatchToProps = { requestUserLogin };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(UserLogin));
