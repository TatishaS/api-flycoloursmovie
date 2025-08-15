declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGDODB_URI: string;
      PORT: string;
      SECRET_KEY: string;
    }
  }
}

export {};
