import { Provider } from '@nestjs/common';
export declare const THIRD_PARTY_CONNECTION = "THIRD_PARTY_CONNECTION";
export interface ConnectionInfo {
    status: string;
    endpoint: string;
}
export declare const asyncConnectionProvider: Provider;
