import { Application, Locals, Request } from 'express';

export interface WebRequestLocals extends Locals {
  config?: {
    get: (path: string) => any;
  };
}

export interface WebApplication extends Application {
  locals: WebRequestLocals;
}

export type WebRequest = Request & {
  id?: string;
  app?: WebApplication;
  locals?: WebRequestLocals;
};

export interface AppStartupOptions {
  port: number;
  appName?: string;
  setup?: () => void | Promise<void>;
  callback?: () => void;
}

export interface WebAppError extends Error {
  status?: number;
}

export type Environment = 'development' | 'staging' | 'production';
