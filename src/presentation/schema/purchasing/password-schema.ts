export const changedPasswordSchema = {
    type: 'object',
    properties: {
        current_password: {
            type: 'string',
            errorMessage: {
                type: 'error current_password'
            }
        },
        new_password: {
            type: 'string',
            errorMessage: {
                type: 'error new_password'
            }
        },
        confirm_password: {
            type: 'string',
            errorMessage: {
                type: 'error confirm_password'
            }
        }
    },
    required: ['current_password', 'new_password', 'confirm_password'],
    errorMessage: {
        required: {
            current_password: 'field current_password cant empty',
            new_password: 'field new_password cant empty',
            confirm_password: 'field confirm_password cant empty',
        }
    }
}

export const forgotPasswordSchema = {
    type: 'object',
    properties: {
        user_email: {
            type: 'string',
            errorMessage: {
                type: 'error email'
            }
        }
    },
    required: ['email'],
    errorMessage: {
        required: {
            current_password: 'field email cant empty',
        }
    }
}