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

export const updateParamsTerminKontrakPks = {
    type: 'object',
    properties: {
        purchasing_detail_id: {
            type: 'number',
            errorMessage: 'failed value, must be number'
        },
        purchasing_id: {
            type: 'number',
            errorMessage: 'failed value, must be number'
        }
    },
    required: ['purchasing_detail_id', 'purchasing_id'],
    errorMessage: {
        required: {
            purchasing_detail_id: 'purchasing_detail_id must be exist',
            purchasing_id: 'purchasing_id must be exist',
        }
    }
}

export const deleteParamsTerminKontrakPks = {
    type: 'object',
    properties: {
        purchasing_detail_id: {
            type: 'number',
            errorMessage: 'failed value, must be number'
        }
    },
    required: ['purchasing_detail_id'],
    errorMessage: {
        required: {
            purchasing_detail_id: 'purchasing_detail_id must be exist'
        }
    }
}