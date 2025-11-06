// Central place to read the Clerk publishable key and expose whether Clerk should be enabled.
export const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ''
// Basic validation: Clerk publishable keys start with pk_test_ or pk_live_
export const isClerkEnabled = /^pk_(test|live)_/.test(PUBLISHABLE_KEY)
