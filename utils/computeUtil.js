export const computeInitials = (firstName, lastName) => {
    const initials = 'N/A';
    if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) {
        console.log('First name and/or Last name can not be null');
        return initials;
    }

    const firstNameLetter = firstName.trim().charAt(0);
    const lastNameLetter = firstName.trim().charAt(0);
    initials = firstNameLetter + lastNameLetter;
    return initials;
};