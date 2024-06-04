import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// Define `validate` as a higher-order function that takes a Zod schema (`schema`) and returns an Express middleware.
const validate =
    (schema: AnyZodObject) =>
    // The middleware takes `req` (request), `res` (response), and `next` (function to pass control to the next middleware).
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Attempts to asynchronously validate the request data using the Zod schema.
            // `parseAsync` checks `body`, `query`, and `params` of the `req` object.
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            // If the validation is successful, pass control to the next middleware in the chain.
            return next();
        } catch (error: any) {
            // Catches any errors thrown by `parseAsync` if the validation fails.
            // Parses the error message (assuming it's a JSON string) to obtain error details.
            const message_error = JSON.parse(error.message);

            // Responds with a 400 HTTP status (Bad Request) and sends an error message.
            return res.status(400).json({
                status: "bad request", // Indicates that the request was incorrect.
                message: message_error[0].message, // Sends the first error message from Zod.
            });
        }
    };

export default validate;
