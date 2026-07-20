declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PORT: string;
      SECRET_KEY: string;
    }
  }
}

export {};
