"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncConnectionProvider = exports.THIRD_PARTY_CONNECTION = void 0;
exports.THIRD_PARTY_CONNECTION = 'THIRD_PARTY_CONNECTION';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.asyncConnectionProvider = {
    provide: exports.THIRD_PARTY_CONNECTION,
    useFactory: async () => {
        console.log('[AsyncProvider] Connecting to third-party service...');
        await delay(3000);
        console.log('[AsyncProvider] Connection ready after 3000ms');
        return { status: 'connected', endpoint: 'https://example.com/mock-service' };
    },
};
//# sourceMappingURL=connection.provider.js.map