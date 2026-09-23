export {}

declare global {
  type GenMBUser = { id: string; email: string; name: string; picture: string }

  interface Window {
    genmb: {
      auth: {
        ready: () => Promise<void>
        signIn: () => Promise<GenMBUser | null>
        sendMagicLink: (email: string) => Promise<{ success: boolean; data?: unknown }>
        signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; data?: unknown }>
        verifySignUp: (email: string, code: string) => Promise<GenMBUser | null>
        signInWithPassword: (email: string, password: string) => Promise<GenMBUser | null>
        requestPasswordReset: (email: string) => Promise<void>
        confirmPasswordReset: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; data?: unknown }>
        signOut: () => Promise<void>
        getUser: () => GenMBUser | null
        isAuthenticated: () => boolean
        onAuthStateChange: (callback: (user: GenMBUser | null) => void) => () => void
      }
      contactForm: {
        submit: (form: { name: string; email: string; subject?: string; message: string }) => Promise<{ success: boolean }>
      }
      fn?: {
        invoke: (name: string, payload?: unknown) => Promise<unknown>
      }
    }
  }
}
