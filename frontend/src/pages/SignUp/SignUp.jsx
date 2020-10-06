// React
import React from 'react';

// Semantic UI
import { Form, Button, Input, Segment, Header } from 'semantic-ui-react';

// Stylesheet
import '../../global/stylesheet.css';

export const SignUp = () => {

    // Parameters: None
    // Usage: signUpHandler is called when the user submits the form. It will check the user's credentials,
    // and if they match, the user will be redirected to the main page
    // Return: No return value 
    const signUpHandler = () => {
    }

    return (
        <Segment basic className='global-form-segment' inverted>
            <Header as='h1' size='large'>Sign Up</Header>
            <Form id='form' className='global-form' inverted onSubmit={() => signUpHandler()} warning>
                {/* Username, Email, Password, Password Reset & Sign Up */}
                <Form.Group grouped>
                    <Form.Field className='global-form-field' required id='username-field' control={Input} label='Username' placeholder='Your Username...' type='text' />
                    <Form.Field className='global-form-field' required id='email-field' control={Input} label='Email' placeholder='Your Email...' type='email' />
                    <Form.Field className='global-form-field' required id='password-field' control={Input} label='Password' placeholder='Password...' type='password' />
                    <Form.Field className='global-form-field' required id='password-reset-field' control={Input} label='Repeat Password' placeholder='Repeat Password...' type='password' />
                    <Form.Field className='global-form-centered-container' id='sign-up-button'>
                        <Button className='global-form-submit-button' size='large'>Sign Up</Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        </Segment>
    )
}
