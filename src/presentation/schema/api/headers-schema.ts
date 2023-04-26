export const headersSchema = {
    type: 'object',
    properties: {
        'x-access-token': {
            type: 'string',
            errorMessage: 'failed x-access-token'
        }
    },
    required: ['x-access-token'],
    errorMessage: {
        required: {
            'x-access-token': 'x-access-token must be exist'
        }
    }
}