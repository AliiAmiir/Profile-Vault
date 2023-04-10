export const computeInitials = (firstName, lastName) => {
    let initials = 'N/A';
    if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) {
        console.log('First name and/or Last name can not be null');
        return initials;
    }

    const firstNameLetter = firstName.trim().charAt(0);
    const lastNameLetter = lastName.trim().charAt(0);
    initials = firstNameLetter + lastNameLetter;
    return initials;
};

export const computeAge = (dateOfBirth) => {
    let age = 'N/A';
    if (!dateOfBirth || !dateOfBirth.trim()) {
        console.log('Date of birth can not be null');
        return age;
    }

    const today = new Date();
    const [month, day, year] = dateOfBirth.split('/');
    const birthDate = new Date();
    birthDate.setFullYear(year);
    birthDate.setMonth(month);
    birthDate.setDate(day);

    const dateDifference = new Date(today - birthDate).getUTCFullYear() - 1970;
    age = dateDifference.toString();
    
    return age;
};

