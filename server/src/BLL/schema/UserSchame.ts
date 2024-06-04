import { z } from "zod";

/* The `UserCreateSchema` constant is defining a schema using Zod for validating the data structure of
a user creation request. It specifies the expected structure of the data that should be provided
when creating a new user. */
export const UserCreateSchema = z.object({
    body: z.object({
        name: z.string().min(3, { message: "the name must contain at least 3 characters" }), // Ensures that the name has at least 1 character.
        password: z.string().min(1, { message: "the password must contain at least 1 characters" }), // Ensures that the password has at least 1 character.
        phone: z.string().min(1, { message: "the phone must contain at least 1 characters" }), // Ensures that the password has at least 1 character.
        email: z.string().email({ message: "Invalid email format" }), // Validates that the email field has a valid email format.
    }),
});

/* The `UserUpdateSchema` constant is defining a schema using Zod for validating the data structure of
an update user request. It specifies the expected structure of the data that should be provided when
updating a user. */
export const UserUpdateSchema = z.object({
    params: z.object({ id: z.string() }),
    body: z.object({
        name: z.string().min(3, { message: "the name must contain at least 3 characters" }), // Ensures that the name has at least 1 character.
        phone: z.string().min(1, { message: "the phone must contain at least 1 characters" }), // Ensures that the password has at least 1 character.
        email: z.string().email({ message: "Invalid email format" }), // Validates that the email field has a valid email format.
    }),
});

/* The `ChangePasswordSchema` constant is defining a schema using Zod for validating the data structure
of a change password request. */
export const ChangePasswordSchema = z.object({
    params: z.object({ id: z.string() }),
    body: z.object({
        password: z.string().min(1, { message: "the password must contain at least 1 character" }), // Ensures that the password has at least 1 character.
    }),
});
