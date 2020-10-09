import axios from 'axios';
import cookies from 'js-cookie';

// Parameters: A string which resembles a username
// Usage: Gets the public IP and user's data and saves a session inside the database
// Return: No return value
export const saveSession = async (userId) => {
    try {
        const publicIPData = await axios.get('https://api.ipify.org?format=json');
        const { data } = await axios.post('/sessions/saveSession', {
            userIP: publicIPData.data.ip,
            userId
        })
        cookies.set('sessionId', data._id, { expires: 1 });
    } catch (err) {
        console.log(err);
    }
}