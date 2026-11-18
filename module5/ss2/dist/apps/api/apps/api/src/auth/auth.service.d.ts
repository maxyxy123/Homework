import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    checkPassword(userId: number, password: string): boolean;
    issueToken(userId: number): string;
}
