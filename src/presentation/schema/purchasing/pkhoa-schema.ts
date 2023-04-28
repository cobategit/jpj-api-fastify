export const paramsPkhoa = {
    type: 'object',
    properties: {
        freight_cost_id: {
            type: 'number',
            errorMessage: {
                type: 'failed freight_cost_id'
            }
        }
    },
    required: ['freight_cost_id'],
    errorMessage: {
        required: {
            freight_cost_id: 'freight_cost_id must be exist'
        }
    }
}

export const queryStringPkhoa = {
    type: 'object',
    properties: {
        vendor_id: {
            type: 'number',
            errorMessage: {
                type: 'failed value'
            }
        },
        stockpile_id: {
            type: 'number',
            errorMessage: {
                type: 'failed value'
            }
        }
    },
}