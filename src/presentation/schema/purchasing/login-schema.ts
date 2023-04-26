export const bodyLoginSchema = {
    type: 'object',
    properties: {
        deviced_id: {
            type: 'string',
            errorMessage: {
                type: 'failed deviced_id'
            }
        },
        kode_akses: {
            type: 'string',
            errorMessage: {
                type: 'failed kode_akses'
            }
        }
    },
    required: ['deviced_id', 'kode_akses'],
    errorMessage: {
        required: {
            deviced_id: 'deviced_id cant empty',
            kode_akses: 'kode_akses cant empty'
        }
    }
}