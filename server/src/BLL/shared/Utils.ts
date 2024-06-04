import bcrypt from "bcryptjs";
/**
 * Generates a secure hash of a provided password.
 *
 * @param password The password to be hashed.
 *
 * @returns A promise that resolves to the hashed version of the password.
 */
export const encryptPassword = async (password: string): Promise<string> => {
    // `bcrypt.genSalt` generates a "salt" that will be used in the hashing process.
    // The number '10' represents the cost factor for generating the salt.
    // A higher value increases the time required to generate the salt and hash,
    // making the function more secure against brute force attacks.
    const salt = await bcrypt.genSalt(10);

    // `bcrypt.hash` takes the password and the generated salt, and produces a hash.
    // This hash includes the salt as part of the result, which is useful for later verification
    // without the need to store the salt separately.
    return await bcrypt.hash(password, salt);
};

/**
 * Compares a password with a stored hash to verify if they are the same.
 *
 * @param password - The plain text password provided by the user.
 * @param recivedPassword - The stored hash password (usually retrieved from the database).
 *
 * @returns A boolean indicating whether the passwords match or not.
 */
export const comparePassword = async (
    password: string,
    recivedPassword: string
): Promise<boolean> => {
    // The `bcrypt.compare` function takes the plain text password and the hash,
    // and returns `true` if the hash of the plain text password matches the stored hash.
    return await bcrypt.compare(password, recivedPassword);
};
