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
        case 'password':
            errors.password = fieldValue.length >= 6 ? null : 'Password must be at least 6 characters';
            break;
        case 'confirmPassword':
            errors.password = fieldValue == password ? null : 'Passwords do not match';
            break;
        default:
            break;
    }

    return errors;
};
