/// <reference types="vite/client" />

  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    // more env variables...
    readonly VITE_VERCEL_ENV: string;
    readonly VITE_CURRENCY_API_KEY: string;
    readonly VITE_CURRENCY_API_URL: string;
    readonly VITE_POKE_API_URL: string;
    readonly VITE_BUGSNAG_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }