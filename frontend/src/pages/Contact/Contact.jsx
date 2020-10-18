// React
import React, { useState } from 'react';

// Semantic UI
import { Segment, Header, Form, Message, Input, TextArea, Button } from 'semantic-ui-react';

// Stylesheet
import '../../global/stylesheet.css';

// Redux
import { useSelector } from 'react-redux';

// Stylesheet
import style from './Contact.module.css';

// Other 
import axios from 'axios';

export const Contact = () => {

    // Redux user state
    const user = useSelector(state => state.user);

    // Form's state variables
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Parameters: None
    // Usage: Activate when the user contacts the website. The user details are fetched, and emails are being sent to both the user's email and the website owner's email 
    // Return: No return value
    const contactHandler = async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            setIsSuccess(false);
            // Fetching user details
            const { email, subject, message } = {
                email: document.getElementById('email-field').value,
                subject: document.getElementById('subject-field').value,
                message: document.getElementById('message-field').value
            }
            const boolean = await axios.post('/contact/contact', { email, subject, message });
            if (boolean.status === 200) {
                setIsLoading(false);
                setIsSuccess(true);
            }
            else {
                setIsLoading(false);
                setIsError(true);
            }
        } catch (err) {
            setIsLoading(false);
            setIsError(true);
        }
    }

    return (
        <Segment basic className='global-form-segment' inverted>
            {/* Headers */}
            <Header as='h1' size='large'>Contact Us</Header>
            <Header as='h3' className={style.h3} size='medium'>Tell us a bit about yourself, and we’ll get in touch as soon as we can.</Header>
            <Form error={isError} loading={isLoading} success={isSuccess} id='form' className='global-form' inverted onSubmit={() => contactHandler()} warning>
                <Form.Group grouped>
                    {/* Email */}
                    {
                        !user._id ? <Form.Field className='global-form-field' required id='email-field' control={Input} label='Email' placeholder='Your Email...' type='email' /> : ''
                    }
                    {/* Subject & Message */}
                    <Form.Field className='global-form-field' required id='subject-field' control={Input} label='Subject' placeholder='Your Subject...' type='text' />
                    <Form.Field className='global-form-field' rows='10' required id='message-field' control={TextArea} label='Message' placeholder='Your Message...' type='text' />
                    <Message error header='An error occurred!' content='An error has occurred while trying to contact us. Please try again later.' />
                    <Message success header='Success' content="Thank you for using our contacting system! We'll get back to you shortly." />
                    <Form.Field className='global-form-centered-container' id='contact-button'>
                        <Button className='global-form-submit-button' size='large'>Contact</Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        </Segment>
    )
}
