import UserController from "../controllers/UserController";

import BaseRoutes from "./config/BaseRoute";

import validate from "../middleware/validate";

import {
    ChangePasswordSchema,
    UserCreateSchema,
    UserUpdateSchema,
} from "../BLL/schema/UserSchame";

class UserRoute extends BaseRoutes {
    routes(): void {
        // Route to get all users.
        this.router.get("/", UserController.FindAll);

        // Route to get a specific user by their ID.
        this.router.get("/:id", UserController.FindById);

        // Route to create a new user.
        this.router.post(
            "/",
            validate(UserCreateSchema),
            UserController.Create
        );

        // Route to update an existing user.
        this.router.patch(
            "/:id",
            validate(UserUpdateSchema),
            UserController.Update
        );

        // Route to delete a user.
        this.router.delete("/:id", UserController.Delete);

        // Route to change a user's password.
        this.router.post(
            "/change-password/:id",
            validate(ChangePasswordSchema),
            UserController.ChangePassword
        );

        // Route to change a user's status.
        this.router.post("/state/:id", UserController.StatusUserById);
    }
}

export default new UserRoute().router;
