import { User } from "../entities/User";

/* The `interface IUserRepo` in TypeScript is defining a contract that specifies the structure of a
repository for user-related operations. It outlines the methods that a class implementing this
interface must provide. Here's what each method in the interface does: */
interface IUserRepo {
    RetrieveAll(): Promise<User[]>;
    RetrieveById(userId: string): Promise<User>;
    Save(user: User): Promise<void>;
    Update(user: User, userId: string): Promise<void>;
    Delete(userId: string): Promise<void>;
    ChangePassword(userId: string, password: string): Promise<void>;
    StatusUser(userId: string): Promise<boolean>;
    VerificUser(userId: string): Promise<User | null>;
}

export class UserRepo implements IUserRepo {
    /**
     * The RetrieveAll function retrieves all users while excluding the password attribute in TypeScript
     * using Sequelize.
     * @returns An array of User objects with the "password" attribute excluded.
     */
    async RetrieveAll(): Promise<User[]> {
        try {
            return await User.findAll({
                attributes: { exclude: ["password"] },
                order:[['id','DESC']]
            });
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    /**
     * The function RetrieveById asynchronously retrieves a user by their ID, removes the password field
     * from the user object, and returns the user as a JSON object.
     * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
     * the user whose information needs to be retrieved from the database.
     * @returns The function `RetrieveById` is returning a Promise that resolves to a User object with the
     * password field removed. If the user with the specified userId is not found, an error with the
     * message "user not found!" will be thrown. If any other error occurs during the retrieval process, it
     * will be rethrown with a custom error message.
     */
    async RetrieveById(userId: string): Promise<User> {
        try {
            const user = await User.findOne({
                where: {
                    id: userId,
                },
            });

            if (!user) throw new Error("user not found!");

            const userJSON = user.toJSON();

            delete userJSON.password;

            return userJSON;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    /**
     * The function `Save` in TypeScript saves a user to a database, removes the password field from the
     * user object, and returns the user object as JSON.
     * @param {User} user - The `Save` function is an asynchronous function that saves a user to a
     * database. It takes a `User` object as a parameter, which typically includes properties like `name`,
     * `email`, `password`, and `phone`.
     * @returns The `Save` function is returning a JSON object representing the user data after saving it
     * to the database. The function first creates a new user record in the database using the provided
     * user data, then converts the user object to JSON format and removes the `password` field before
     * returning it.
     */
    async Save(user: User): Promise<void> {
        try {
            const _user = await User.create({
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
            });

            const userJSON = user.toJSON();

            delete userJSON.password;

            return userJSON;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    /**
     * The function `Update` in TypeScript updates user information in a database using async/await and
     * error handling.
     * @param {User} user - The `user` parameter in the `Update` function represents the updated user
     * information that will be used to update an existing user in the database. It likely contains
     * properties such as `name`, `email`, and `phone` that will be used to update the corresponding user
     * record in the database.
     * @param {string} userId - The `userId` parameter in the `Update` function is a string that represents
     * the unique identifier of the user whose information needs to be updated. This identifier is used to
     * query the database and find the specific user record that needs to be updated.
     */
    async Update(user: User, userId: string): Promise<void> {
        try {
            const _user = await User.findOne({
                where: {
                    id: userId,
                },
            });

            if (!_user) throw new Error("User not found!");

            _user.name = user.name;
            _user.email = user.email;
            _user.phone = user.phone;

            await _user.save();
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    /**
     * This TypeScript function deletes a user by their ID after checking if the user exists.
     * @param {string} userId - The `Delete` function takes a `userId` parameter of type string. This
     * parameter is used to find and delete a user from the database based on their unique identifier.
     */
    async Delete(userId: string): Promise<void> {
        try {
            const _user = await User.findOne({
                where: {
                    id: userId,
                },
            });

            if (!_user) throw new Error("User not found");

            await _user.destroy();
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    /**
     * The function `ChangePassword` asynchronously updates the password for a user identified by their ID.
     * @param {string} userId - The `userId` parameter in the `ChangePassword` function is a string that
     * represents the unique identifier of the user whose password is being changed.
     * @param {string} password - The `ChangePassword` function takes in two parameters:
     */
    async ChangePassword(userId: string, password: string): Promise<void> {
        try {
            const _user = await User.findOne({
                where: {
                    id: userId,
                },
            });

            if (!_user) throw new Error("User not found");

            _user.password = password;

            await _user.save();
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    /**
     * The function `StatusUser` toggles the status of a user in a database and returns a boolean
     * indicating success or failure.
     * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
     * a user in the system. It is used to look up and update the status of the user in the `StatusUser`
     * function.
     * @returns The `StatusUser` function returns a Promise that resolves to a boolean value. It returns
     * `true` if the user with the specified `userId` is found, updates the status of the user, and
     * successfully saves the changes. If the user is not found, it returns `false`. If an error occurs
     * during the process, it throws an error with the error message.
     */
    async StatusUser(userId: string): Promise<boolean> {
        try {
            const _user = await User.findOne({
                where: {
                    id: userId,
                },
            });

            if (!_user) return false;

            _user.status = !_user.status;

            await _user.save();

            return true;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    /**
     * The function VerificUser asynchronously verifies the existence of a user by their email in a
     * TypeScript environment.
     * @param {string} email - The `VerificUser` function is an asynchronous function that takes an email
     * as a parameter and returns a Promise that resolves to a `User` object or `null`.
     * @returns The `VerificUser` function is returning a Promise that resolves to either a `User` object
     * if found based on the provided email, or `null` if no user is found with that email.
     */
    async VerificUser(email: string): Promise<User | null> {
        try {
            // Attempt to find a user by their email.
            return await User.findOne({
                where: { email },
            });
        } catch (error: any) {
            throw new Error(
                `An error occurred while verifying user existence: ${error.message}`
            );
        }
    }
}
