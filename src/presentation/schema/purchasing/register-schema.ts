export const bodyRegisterSchema = {
    type: 'object',
    properties: {
        user_email: {
            type: 'string',
            errorMessage: {
                type: 'bad user_email'
            }
        },
        deviced_id: {
            type: 'string',
            errorMessage: {
                type: 'bad deviced_id'
            }
        },
        kode_akses: {
            type: 'string',
            errorMessage: {
                type: 'bad kode_akses'
            }
        },
    },
    required: ['user_email', 'deviced_id', 'kode_akses'],
    errorMessage: {
        required: {
            user_email: 'user_email cant empty',
            deviced_id: 'deviced_id cant empty',
            kode_akses: 'kode_akses cant empty'
        }
    }
}