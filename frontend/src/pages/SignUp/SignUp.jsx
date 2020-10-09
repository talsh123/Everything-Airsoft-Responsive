// React
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Semantic UI
import { Form, Button, Input, Segment, Header, Message } from 'semantic-ui-react';

// Stylesheet
import '../../global/stylesheet.css';

// Helper Functions
import { checkForSpecialCharacter } from '../../global/functions/regex';
import { toast } from '../../global/functions/sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';

// Other
import bcrypt from 'bcryptjs';
import axios from 'axios';

export const SignUp = () => {

    // Redux Dispatch & Navigation
    const dispatch = useDispatch();
    const history = useHistory();

    // State variables that determine the form's state
    // If an error occurs, isError is true
    // When a back end request is pending, isLoading is true
    // When an error occurs, errorMessage will contain the error message and display it to the user 
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Parameters: None
    // Usage: signUpHandler is called when the user submits the form. It will check the user's credentials,
    // and if they match, the user will be redirected to the main page, otherwise, the user will be notified accordingly
    // Return: No return value 
    const signUpHandler = async () => {
        try {
            // Resets the form's state
            setIsLoading(true);
            setIsError(false);

            // Fetching form details
            const { username, email, password, passwordRepeat } = {
                username: document.getElementById('username-field').value,
                email: document.getElementById('email-field').value,
                password: document.getElementById('password-field').value,
                passwordRepeat: document.getElementById('password-repeat-field').value
            }

            // Checks if the username field contains special characters and is both password values are the same
            if (checkForSpecialCharacter(username) || password !== passwordRepeat)
                setIsError(true);
            else {
                // Generates the salt and hash, saves the user
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                const { data } = await axios.post('/users/saveUser', { username, hash, email });
                // If an error occurs when saving the user
                if (data.error === 'duplicateIndex') {
                    switch (data.property) {
                        case 'username':
                            setErrorMessage('That username is taken, please try a different username.');
                            break;
                        case 'email':
                            setErrorMessage('That email is taken, please try a different email.');
                            break;
                        default:
                            setErrorMessage('An unknown error has occurred, please try again later.');
                            break;
                    }
                    setIsLoading(false);
                    setIsError(true);
                } else {
                    // If the user sign in was successful
                    dispatch(setUser({
                        _id: data._id,
                        username,
                        hash,
                        email,
                        isVerified: false,
                        isAdmin: false
                    }));
                    setIsLoading(false);
                    history.push('/');
                    toast('Successfully signed up!', 'success', '#00b5ad');
                }
            }
        } catch (err) {
            // Unhandled errors
            setIsLoading(false);
            setIsError(true);
            console.log(err);
        }
    }

    return (
        <Segment basic className='global-form-segment' inverted>
            <Header as='h1' size='large'>Sign Up</Header>
            <Form error={isError} loading={isLoading} id='form' className='global-form' inverted onSubmit={() => signUpHandler()} warning>
                {/* Username, Email, Password, Password Reset & Sign Up */}
                <Form.Group grouped>
                    <Form.Field className='global-form-field' required id='username-field' control={Input} label='Username' placeholder='Your Username...' type='text' />
                    <Form.Field className='global-form-field' required id='email-field' control={Input} label='Email' placeholder='Your Email...' type='email' />
                    <Form.Field className='global-form-field' required id='password-field' control={Input} label='Password' placeholder='Password...' type='password' />
                    <Form.Field className='global-form-field' required id='password-repeat-field' control={Input} label='Repeat Password' placeholder='Repeat Password...' type='password' />
                    <Message error header='An error occurred!' content={errorMessage} />
                    <Form.Field className='global-form-centered-container' id='sign-up-button'>
                        <Button className='global-form-submit-button' size='large'>Sign Up</Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        </Segment>
    )
}