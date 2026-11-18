import { UsersService } from './users.service';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    status(): {
        logger: string;
        database: string;
    };
    token(id: number): {
        token: string;
    };
}
