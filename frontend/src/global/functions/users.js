import axios from 'axios';

// Parameters: A username string
// Usage: Finds user's data by the user's username
// Return: Returns an object containing user data if the username exists
// If there is no user by that username, null will be returned
export const getUserByUsername = async (username) => {
    try {
        const url = decodeURI(`/users/getUserByUsername/${username}`);
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        return null;
    }
}