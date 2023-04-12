export const isSignUpEnabledCheck = (firstName, lastName, email, phone, gender, dateOfBirth, password, confirmPassword, errors) => {
    const isError = Object.values(errors).some(obj => obj !== null);

    if (!firstName || !lastName || !email || !phone || !gender || !dateOfBirth || !password || !confirmPassword && !isError) {
        return false;
    }

    return true;
};

export const validateRegistrationFields = (fieldName, fieldValue, password, existingErrors) => {
    let errors = existingErrors || {};
    switch (fieldName) {
        case 'firstName':
            errors.firstName = fieldValue.length < 1 ? 'First name is required' : null;
            break;
        case 'lastName':
            errors.lastName = fieldValue.length < 1 ? 'Last name is required' : null;
            break;
        case 'email':
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            errors.email = emailRegex.test(fieldValue) ? null : 'Invalid email';
            break;
        case 'phone':
            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/ ;
            errors.phone = phoneRegex.test(fieldValue) ? null : 'Invalid phone number';
            break;
        case 'gender':
            errors.gender = fieldValue === null || fieldValue === '' ? 'Gender is required' : null;
            break;
        case 'password':
            errors.password = fieldValue.length >= 6 ? null : 'Invalid password';
            break;
        case 'confirmPassword':
            errors.confirmPassword = fieldValue == password ? null : 'Passwords mismatch';
            break;
        default:
            break;
    }

    return errors;
};
