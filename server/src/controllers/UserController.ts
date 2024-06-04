import { Request, Response } from "express";

import { UserRepo } from "../BLL/repository/UserRepo";
import { User } from "../BLL/entities/User";

import { encryptPassword } from "../BLL/shared/Utils";

class UserController {
    /**
     * The function `FindAll` retrieves all users from a repository and returns them as a JSON response
     * with appropriate status and error handling.
     * @param {Request} req - Request object containing information about the HTTP request
     * @param {Response} res - The `res` parameter in the `FindAll` function is an instance of the Response
     * object in Express.js. It is used to send a response back to the client making the request. In the
     * provided code snippet, `res.status(200).json(...)` is used to send a JSON response
     * @returns The `FindAll` function is returning a JSON response with status code 200 if the retrieval
     * of all users is successful. The response includes a status indicating success, a message "success",
     * and the retrieved data (allUsers). If there is an error during the retrieval process, a JSON
     * response with status code 500 is returned, indicating an internal server error. The error message is
     * included in the
     */
    async FindAll(req: Request, res: Response) {
        try {
            const allUsers = await new UserRepo().RetrieveAll();

            return res.status(200).json({
                status: true,
                message: "success",
                data: allUsers,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal Error Server",
                error: `${error}`,
            });
        }
    }

    /**
     * This TypeScript function asynchronously finds a user by their ID and returns the user data if found,
     * or an error message if not found or if an internal server error occurs.
     * @param {Request} req - The `req` parameter in the `FindById` function stands for the request object,
     * which contains information about the HTTP request that was made. This object typically includes
     * details such as the request headers, parameters, body, query parameters, and more.
     * @param {Response} res - The `res` parameter in the `FindById` function represents the response
     * object in Express.js. It is used to send a response back to the client making the request. In the
     * provided code snippet, the `res` parameter is used to send JSON responses with status codes and data
     * back to the
     * @returns The `FindById` function is returning a JSON response with status code 200 in most cases. If
     * the user with the specified ID is found, it returns a JSON response with status true, a success
     * message, and the user data. If the user is not found, it returns a JSON response with status false
     * and a message indicating that the user was not found. If an error occurs during the
     */
    async FindById(req: Request, res: Response) {
        try {
            const id = req.params["id"];

            const user = await new UserRepo().RetrieveById(id);

            if (!user)
                return res.status(200).json({
                    status: false,
                    message: "User not found",
                });

            return res.status(200).json({
                status: true,
                message: "success",
                data: user,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal Error Server",
                error: `${error}`,
            });
        }
    }

    /**
     * The function `Create` handles the creation of a new user by verifying the email, checking for
     * existing users, encrypting the password, and saving the user data.
     * @param {Request} req - The `req` parameter in the `Create` function represents the request object,
     * which contains information about the HTTP request that triggered this function. This object
     * typically includes details such as the request headers, body, parameters, and other relevant
     * information sent by the client to the server. In this context, `
     * @param {Response} res - The `res` parameter in the `Create` function represents the response object
     * in Express.js. It is used to send a response back to the client making the request. In this
     * function, the response object is used to send JSON responses with status codes and messages based on
     * the outcome of the user creation
     * @returns The Create function returns a JSON response with a status and message based on the outcome
     * of the user creation process. If the email provided in the request body is already registered, it
     * returns a message indicating that the email is already registered. If the user is successfully
     * created, it returns a message indicating that the user was successfully created. In case of any
     * errors during the process, it returns a message indicating an
     */
    async Create(req: Request, res: Response) {
        try {
            const verific = await new UserRepo().VerificUser(req.body.email);

            console.log(verific);

            if (verific !== null)
                return res.status(200).json({
                    status: false,
                    message:
                        "this email is already registered, please try another one",
                });

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: await encryptPassword(req.body.password),
            });

            await new UserRepo().Save(user);

            return res.status(200).json({
                status: true,
                message: "successfully created user",
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal Error Server",
                error: `${error}`,
            });
        }
    }

    /**
     * This TypeScript function updates a user record in a database based on the provided request data.
     * @param {Request} req - Request object containing information about the HTTP request
     * @param {Response} res - The `res` parameter in the `Update` function is an instance of the
     * `Response` class. It is used to send the HTTP response back to the client after processing the
     * request. In this case, the response includes a status code, JSON data with a status message, and
     * potentially an error
     * @returns The Update function is returning a JSON response with status code 200 if the user update is
     * successful. The response includes a status field set to true, a message field with the text
     * "successfully updated user". If there is an error during the update process, a JSON response with
     * status code 500 is returned. The error response includes a status field set to false, a message
     * field with the text "
     */
    async Update(req: Request, res: Response) {
        try {
            const id = req.params["id"];

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            });

            await new UserRepo().Update(user, id);

            return res.status(200).json({
                status: true,
                message: "successfully updated user",
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal Error Server",
                error: `${error}`,
            });
        }
    }

    /**
     * This TypeScript function handles deleting a user by ID and returns a success message or an error
     * message.
     * @param {Request} req - Request object containing information about the HTTP request
     * @param {Response} res - The `res` parameter in the code snippet refers to the response object in
     * Node.js. It is used to send a response back to the client who made the request. In this case, the
     * `res` object is used to send a JSON response with status codes and messages after attempting to
     * delete a
     * @returns The Delete method is returning a JSON response with status code 200 if the user deletion is
     * successful. The response includes a status key set to true, a message key with the value
     * "successfully deleted user". If there is an error during the deletion process, the method returns a
     * JSON response with status code 500, a status key set to false, a message key with the value
     * "Internal Error Server
     */
    async Delete(req: Request, res: Response) {
        try {
            const id = req.params["id"];

            await new UserRepo().Delete(id);

            return res.status(200).json({
                status: true,
                message: "successfully deleted user",
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal Error Server",
                error: `${error}`,
            });
        }
    }

    /**
     * The function ChangePassword asynchronously updates a user's password and returns a success
     * message or an error message.
     * @param {Request} req - The `req` parameter in the `ChangePassword` function is an object
     * representing the HTTP request. It contains information about the request made by the client,
     * such as request headers, parameters, body, etc. In this function, `req` is used to extract the
     * `id` parameter from the
     * @param {Response} res - The `res` parameter in the `ChangePassword` function is an instance of
     * the Response object in Express.js. It is used to send a response back to the client making the
     * request. In this function, it is used to send a JSON response with status codes and messages
     * based on the outcome of
     * @returns The `ChangePassword` function is returning a JSON response with status code 200 if the
     * password update is successful. The response includes a status key set to true, a message key
     * with the value "successfully updated password". If there is an error during the process, it will
     * return a JSON response with status code 500, status key set to false, a message key with the
     * value "Internal Error
     */
    async ChangePassword(req: Request, res: Response) {
        try {
            const id = req.params["id"];

            const password = await encryptPassword(req.body.password);

            await new UserRepo().ChangePassword(id, password);

            return res.status(200).json({
                status: true,
                message: "successfully updated password",
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal Error Server",
                error: `${error}`,
            });
        }
    }

    /**
     * The function `StatusUserById` updates the status of a user by their ID and returns a success message
     * or an error message if there is an internal server error.
     * @param {Request} req - The `req` parameter in the `StatusUserById` function stands for the request
     * object, which contains information about the HTTP request that was made. This object includes
     * details such as the request headers, parameters, body, and other relevant data sent by the client to
     * the server. In this function,
     * @param {Response} res - The `res` parameter in the `StatusUserById` function is an object
     * representing the HTTP response that the server sends back to the client. It allows you to send data
     * back to the client, such as status codes, headers, and the response body. In this function, the
     * `res`
     * @returns The `StatusUserById` function is returning a JSON response with status code 200 if the
     * status update was successful. The response includes a status of true and a message indicating that
     * the status was successfully updated. If an error occurs during the process, a JSON response with
     * status code 500 is returned, indicating an internal server error. The error message is also included
     * in the response.
     */
    async StatusUserById(req: Request, res: Response) {
        try {
            const id = req.params["id"];

            await new UserRepo().StatusUser(id);

            return res.status(200).json({
                status: true,
                message: "successfully updated status",
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal Error Server",
                error: `${error}`,
            });
        }
    }
}

export default new UserController();
