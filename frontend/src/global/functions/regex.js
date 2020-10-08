// Parameters: A string
// Usage: Checks if the given string contains any special characters
// Return: True if the string contains special characters, otherwise False
export const checkForSpecialCharacter = (string) => {
    const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    return format.test(string);
}