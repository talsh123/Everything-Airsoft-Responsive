import sweetalert from 'sweetalert2';

// Parameters: A title string, an icon type string, and a string hex value resembling the icon's color
// Usage: Prompts the user using SweetAlert2
// Return: No return value
export const toast = (string, icon, iconColor) => {
    sweetalert.fire({
        title: string,
        toast: true,
        background: '#1b1c1d',
        timer: 4000,
        timerProgressBar: true,
        position: "bottom",
        icon: icon,
        iconColor: iconColor,
        showConfirmButton: false,
        customClass: 'sweetalert'
    })
}