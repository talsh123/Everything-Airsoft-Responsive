// React
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Semantic UI
import { Form, Button, Checkbox, Input, Segment, Header, Message } from 'semantic-ui-react';

// Stylesheet
import style from './SignIn.module.css';

// Axios Helper Functions
import { getUserByUsername } from '../../global/functions/users';
import { checkForSpecialCharacter } from '../../global/functions/regex';
import { toast } from '../../global/functions/sweetalert2';
import { saveSession } from '../../global/functions/saveSession'

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';

// Other
import bcrypt from 'bcryptjs';

export const SignIn = () => {

    // Redux Dispatch & Navigation
    const dispatch = useDispatch();
    const history = useHistory();

    // State variables that determine the form's state
    // If an error occurs, isError is true
    // When a back end request is pending, isLoading is true
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // Parameters: None
    // Usage: signInHandler is called when the user submits the form. It will check the user's credentials,
    // and if they match, the user will be redirected to the main page
    // Return: No return value 
    const signInHandler = async (e) => {
        // Resets the form's state
        setIsLoading(true);
        setIsError(false);

        e.preventDefault();
        const { username, password, rememberMe } = {
            username: document.getElementById('username-field').value,
            password: document.getElementById('password-field').value,
            rememberMe: document.getElementById('remember-me-checkbox').checked
        }

        // If the username field contains special characters
        if (checkForSpecialCharacter(username)) {
            setIsError(true);
        } else {
            // Gets the user data. If the user exists, the hashes will be compared
            // and the user will be notified accordingly
            const userData = await getUserByUsername(username);
            if (userData !== null)
                bcrypt.compare(password, userData.hash, (err, res) => {
                    if (err) {
                        setIsError(true);
                    } else {
                        if (res === true) {
                            const { _id, username, address, hash, email, isAdmin, isVerified } = userData;
                            dispatch(setUser({
                                _id,
                                username,
                                address,
                                hash,
                                email,
                                isAdmin,
                                isVerified,
                            }));
                            if (rememberMe === true) {
                                saveSession(username);
                            }
                            history.push('/');
                            toast('Successfully logged in!', 'success', '#00b5ad');
                        } else {
                            setIsError(true);
                        }
                    }
                })
            else
                setIsError(true);
        }
        setIsLoading(false);
    }

    return (
        <Segment basic className='global-form-segment' inverted>
            <Header as='h1' size='large'>Sign In</Header>
            <Form loading={isLoading} error={isError} id='form' className='global-form' inverted onSubmit={(e) => signInHandler(e)} warning>
                {/* Username, Password, Remember Me Checkbox & Submit Button */}
                <Form.Group grouped>
                    <Form.Field className='global-form-field' required id='username-field' control={Input} label='Username' placeholder='Your Username...' type='text' />
                    <Form.Field className='global-form-field' required id='password-field' control={Input} label='Password' placeholder='Your Password...' type='password' />
                    <Form.Field className='global-form-field' id='remember-me-checkbox' control={Checkbox} label='Remember Me' />
                    <Message error header='An error occured!' content='Please check your username and password and try again.' />
                    <Form.Field className='global-form-centered-container' id='sign-in-button'>
                        <Button className='global-form-submit-button' size='large'>Sign In</Button>
                    </Form.Field>
                </Form.Group>
            </Form>
            {/* Forgot Password */}
            <Header as='h4' size='small'>Forgot your password? Click <Link className={style.formForgotLink} to='/settings'>here</Link></Header>
        </Segment>
    )
}
