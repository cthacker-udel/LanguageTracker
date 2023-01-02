/* eslint-disable @typescript-eslint/no-extraneous-class -- disabled */
import { createHmac, pbkdf2Sync, randomBytes, randomInt } from "node:crypto";

import type { EncryptionData } from "@types";

import { normalizeText } from "../../../common";

/**
 * Handles all encryption of the user data
 */
export class EncryptionService {
    /**
     *
     * @param password - The password we are encrypting
     */
    public static encrypt = (password: string): EncryptionData => {
        const pbkdf2Salt: string = normalizeText(
            randomBytes(32).toString("ascii"),
        );
        const pbkdf2Iterations: number = randomInt(1, 1000);
        const shaSalt: string = normalizeText(
            randomBytes(32).toString("ascii"),
        );
        const shaIterations: number = randomInt(1, 1000);
        const caesarRotations: number = randomInt(1, 1000);
        const caesarIterations: number = randomInt(1, 1000);

        let hashResult = pbkdf2Sync(
            password,
            pbkdf2Salt,
            pbkdf2Iterations,
            32,
            "sha512",
        ).toString("hex");

        for (let iter = 0; iter < shaIterations; iter += 1) {
            hashResult = createHmac("sha256", hashResult)
                .update(shaSalt)
                .digest("hex");
        }

        for (let iter = 0; iter < caesarIterations; iter += 1) {
            hashResult = [...hashResult]
                .map((eachLetter: string) =>
                    String.fromCodePoint(
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- disabled
                        (eachLetter.codePointAt(0)! + caesarRotations) % 65_535,
                    ),
                )
                .join("");
        }

        const encryptionResult: EncryptionData = {
            caesar_rotations: caesarRotations,
            hash_result: hashResult,
            pbkdf2_iterations: pbkdf2Iterations,
            pbkdf2_salt: pbkdf2Salt,
            sha_iterations: shaIterations,
            sha_salt: shaSalt,
        };

        return encryptionResult;
    };
}
