import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    check(id: number, password: string): {
        valid: boolean;
    };
}
