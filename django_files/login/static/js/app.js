// Select the form fields and add submit event listener
const firstnameEl = document.querySelector('#first_name');
const lastnameEl = document.querySelector('#last_name');
const emailEl = document.querySelector('#reg_email');
const passwordEl = document.querySelector('#reg_pw');
const confirmPasswordEl = document.querySelector('#reg_confirm_pw');

const form = document.querySelector('#signup');

// Develop input field validating functions
// Validate firstname
const checkFirstname = () => {
	let valid = false;
	const min = 3,
		max = 25;
	const firstname = firstnameEl.value.trim();

	if (!isRequired(firstname)) {
		showError(firstnameEl, 'firstname cannot be blank.');
	} else if (!isBetween(firstname.length, min, max)) {
		showError(firstnameEl, `firstname must be between ${min} and ${max} characters.`);
	} else {
		showSuccess(firstnameEl);
		valid = true;
	}
	return valid;
};

// Validate lastname
const checkLastname = () => {
	let valid = false;
	const min = 3,
		max = 25;
	const lastname = lastnameEl.value.trim();

	if (!isRequired(lastname)) {
		showError(lastnameEl, 'lastname cannot be blank.');
	} else if (!isBetween(lastname.length, min, max)) {
		showError(lastnameEl, `lastname must be between ${min} and ${max} characters.`);
	} else {
		showSuccess(lastnameEl);
		valid = true;
	}
	return valid;
};

//Validate Enail
const checkEmail = () => {
	let valid = false;
	const email = emailEl.value.trim();
	if (!isRequired(email)) {
		showError(emailEl, 'Email cannot be blank.');
	} else if (!isEmailValid(email)) {
		showError(emailEl, 'Email is not valid.');
	} else {
		showSuccess(emailEl);
		valid = true;
	}
	return valid;
};

//Validate Password
const checkPassword = () => {
	let valid = false;
	const password = passwordEl.value.trim();
	if (!isRequired(password)) {
		showError(passwordEl, 'Password cannot be blank.');
	} else if (!isPasswordSecure(password)) {
		showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 spacia; character in (!@#$%^&*)');
	} else {
		showSuccess(passwordEl);
		valid = true;
	}
	return valid;
};

// Validate confirm password
const checkConfirmPassword = () => {
	let valid = false;
	// check confirm password
	const confirmPassword = confirmPasswordEl.value.trim();
	const password = passwordEl.value.trim();

	if (!isRequired(confirmPassword)) {
		showError(confirmPasswordEl, 'Please enter the password again');
	} else if (password !== confirmPassword) {
		showError(confirmPasswordEl, 'Confirm password does not match');
	} else {
		showSuccess(confirmPasswordEl);
		valid = true;
	}
	return valid;
};

// Develope utility function
const isEmailValid = email => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

const isPasswordSecure = password => {
	const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
	return re.test(password);
};

const isRequired = value => (value === '' ? false : true);
const isBetween = (length, min, max) => (length <= min || length >= max ? false : true);

// Show the error
const showError = (input, message) => {
	// get the form-field parent element
	const formField = input.parentElement;
	// add the error class
	formField.classList.remove('success');
	formField.classList.add('error');

	//show the error message
	const error = formField.querySelector('small');
	error.textContent = message;
};

// Show the success
const showSuccess = input => {
	//get the form-field element
	const formField = input.parentElement;

	//remove the error classList
	formField.classList.remove('error');
	formField.classList.add('success');

	//hide the error messages
	const error = formField.querySelector('small');
	error.textContent = '';
};

//Modifying the submit event handler
form.addEventListener('submit', function (e) {
	// Prevent the form from submitting
	e.preventDefault();

	//validate forms
	let isFirstnameValid = checkFirstname(),
		isLastnameValid = checkLastname(),
		isEmailValid = checkEmail(),
		isPasswordValid = checkPassword(),
		isConfirmPasswordValid = checkConfirmPassword();

	let isFormValid = isFirstnameValid && isLastnameValid && isEmailValid && isPasswordValid && isConfirmPassword;

	//submit to the server if the form is valid
	if (isFormValid) {
	}
});

//Debounce () function
const debounce = (fn, delay = 500) => {
	let timeoutId;
	return (...args) => {
		//cancel the previous timer
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		//setup a new timer
		timeoutId = setTimeout(() => {
			fn.apply(null, args);
		}, delay);
	};
};

// Pass the input event handler to debounce () function
form.addEventListener(
	'input',
	debounce(function (e) {
		switch (e.target.id) {
			case 'first_name':
				checkFirstname();
				break;
			case 'last_name':
				checkLastname();
				break;
			case 'reg_email':
				checkEmail();
				break;
			case 'reg_pw':
				checkPassword();
				break;
			case 'reg_confirm_pw':
				checkConfirmPassword();
				break;
		}
	})
);
