/* eslint-disable @typescript-eslint/no-extraneous-class -- disabled */
import {
    createCipheriv,
    createHmac,
    pbkdf2Sync,
    randomBytes,
    randomInt,
} from "node:crypto";

import type { EncryptionData } from "@types";

/**
 * Handles all encryption of the user data
 */
export class EncryptionService {
    /**
     *
     * @param password - The password we are encrypting
     */
    public static encrypt = (password: string): EncryptionData => {
        const pbkdf2Salt: string = randomBytes(128).toString();
        const pbkdf2Iterations: number = randomInt(1, 1000);
        const shaSalt: string = randomBytes(128).toString();
        const shaIterations: number = randomInt(1, 1000);
        const caesarRotations: number = randomInt(1, 1000);
        const caesarIterations: number = randomInt(1, 1000);
        const aesSalt: string = randomBytes(128).toString();

        let hashResult = pbkdf2Sync(
            password,
            pbkdf2Salt,
            pbkdf2Iterations,
            128,
            "sha512",
        ).toString("hex");

        for (let iter = 0; iter < shaIterations; iter += 1) {
            hashResult = createHmac("sha256", hashResult)
                .update(shaSalt)
                .digest("hex");
        }

        for (let iter = 0; iter < caesarIterations; iter += 1) {
            hashResult = [...hashResult]
                .map(
                    (eachLetter: string) =>
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- disabled
                        (eachLetter.codePointAt(0)! + caesarRotations) % 65_535,
                )
                .join("");
        }

        const aesCipher = createCipheriv("aes-128-ocb", hashResult, aesSalt);

        hashResult = aesCipher.update(hashResult, "hex", "hex");

        const encryptionResult: EncryptionData = {
            aesSalt,
            caesarRotations,
            hashResult,
            pbkdf2Iterations,
            pbkdf2Salt,
            shaIterations,
            shaSalt,
        };

        return encryptionResult;
    };
}
