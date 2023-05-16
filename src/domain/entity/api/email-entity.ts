export interface OptionsEmail {
    from?: string,
    to?: string,
    subject?: string
    html?: string
}

export interface TransporterAuth {
    user?: string
    pass?: string
}

export interface TranspoterOptions {
    host?: string
    port?: number
    auth?: TransporterAuth
}