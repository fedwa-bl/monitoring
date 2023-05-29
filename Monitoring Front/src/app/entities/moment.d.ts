import moment, { Duration } from 'moment';

declare module 'moment' {
    interface Duration {
      format(format?: string, options?: any, precision?: number): string;
    }
  }

  