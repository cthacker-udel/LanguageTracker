export type EncryptionData = {
    encryption_id?: number;
    user_id?: number;
    pbkdf2_salt: string;
    pbkdf2_iterations: number;
    sha_salt: string;
    sha_iterations: number;
    caesar_rotations: number;
    hash_result: string;
};
