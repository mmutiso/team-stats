import React, { Component } from 'react';
import UserRegistration from '../components/UserRegistration';
import './Registration.css';

class Registration extends Component {
	render() {
		return (
			<div className='registration'>
				<UserRegistration />
			</div>
		);
	}
}

export default Registration;
