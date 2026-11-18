import { Provider } from '@nestjs/common';

export const THIRD_PARTY_CONNECTION = 'THIRD_PARTY_CONNECTION';
export interface ConnectionInfo { status: string; endpoint: string; }

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const asyncConnectionProvider: Provider = {
  provide: THIRD_PARTY_CONNECTION,
  useFactory: async (): Promise<ConnectionInfo> => {
    console.log('[AsyncProvider] Connecting to third-party service...');
    await delay(3000);
    console.log('[AsyncProvider] Connection ready after 3000ms');
    return { status: 'connected', endpoint: 'https://example.com/mock-service' };
  },
};
