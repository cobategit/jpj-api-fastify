export const queryStringAddPengajuanVendor = {
    type: 'object',
    properties: {
        vendor_type: {
            type: 'string',
            errorMessage: {
                type: 'failed vendor_type'
            }
        }
    },
    required: ['vendor_type'],
    errorMessage: {
        required: {
            vendor_type: 'vendor_type must be exist'
        }
    }
}

export const paramsPksCurah = {
    type: 'object',
    properties: {
        vendor_id: {
            type: 'number',
            errorMessage: {
                type: 'failed vendor_id'
            }
        }
    },
    required: ['vendor_id'],
    errorMessage: {
        required: {
            vendor_id: 'vendor_id must be exist'
        }
    }
}

export const paramsFreight = {
    type: 'object',
    properties: {
        freight_id: {
            type: 'number',
            errorMessage: {
                type: 'failed freight_id'
            }
        }
    },
    required: ['freight_id'],
    errorMessage: {
        required: {
            freight_id: 'freight_id must be exist'
        }
    }
}