export type User = {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    dob: Date;
    password: string;
    password_salt: string;
    password_iterations: number;
    last_login: Date;
    last_modified_by: number;
    last_modified_by_date: Date;
    created_date: Date;
};
