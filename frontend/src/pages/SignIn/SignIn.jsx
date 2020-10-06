// React
import React from 'react';
import { Link } from 'react-router-dom'

// Semantic UI
import { Form, Button, Checkbox, Input, Segment, Header } from 'semantic-ui-react';

// Stylesheet
import style from './SignIn.module.css';

export const SignIn = () => {

    // Parameters: None
    // Usage: signInHandler is called when the user submits the form. It will check the user's credentials,
    // and if they match, the user will be redirected to the main page
    // Return: No return value 
    const signInHandler = () => {
    }

    return (
        <Segment basic className='global-form-segment' inverted>
            <Header as='h1' size='large'>Sign In</Header>
            <Form id='form' className='global-form' inverted onSubmit={() => signInHandler()} warning>
                {/* Username, Password, Remember Me Checkbox & Submit Button */}
                <Form.Group grouped>
                    <Form.Field className='global-form-field' required id='username-field' control={Input} label='Username' placeholder='Your Username...' type='text' />
                    <Form.Field className='global-form-field' required id='password-field' control={Input} label='Password' placeholder='Your Password...' type='password' />
                    <Form.Field className='global-form-field' id='remember-me-checkbox' control={Checkbox} label='Remember Me' />
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
