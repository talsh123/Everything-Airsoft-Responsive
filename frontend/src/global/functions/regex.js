// Parameters: A string
// Usage: Checks if the given string contains any special characters
// Return: True if the string contains special characters, otherwise False
export const checkForSpecialCharacter = (string) => {
    const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    return format.test(string);
}

// Parameters: A string
// Usage: Capitalize the string's first letter
// Return: The capitalized string
export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 