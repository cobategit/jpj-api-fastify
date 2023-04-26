export const addQueryStringKontrakPks = {
    type: 'object',
    properties: {
        re_entry: {
            type: 'boolean',
            default: false,
            errorMessage: {
                type: 'failed value, must be boolean'
            }
        }
    },
}

export const paramsKontrakPks = {
    type: 'object',
    properties: {
        purchasing_id: {
            type: 'number',
            errorMessage: 'failed value, must be number'
        }
    },
    required: ['purchasing_id'],
    errorMessage: {
        required: {
            purchasing_id: 'purchasing_id must be exist'
        }
    }
}