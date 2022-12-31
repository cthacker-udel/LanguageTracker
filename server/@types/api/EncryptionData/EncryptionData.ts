export type EncryptionData = {
    encryptionId?: number;
    userId?: number;
    pbkdf2Salt: string;
    pbkdf2Iterations: number;
    shaSalt: string;
    shaIterations: number;
    caesarRotations: number;
    aesSalt: string;
    hashResult: string;
};
