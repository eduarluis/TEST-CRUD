import { Application, Request, Response } from "express";
import UserRoute from "./UserRoute";

/**
 * Configures and attaches routes to the provided Express application.
 * This function centralizes the routing logic, making it easier to manage and understand.
 *
 * @param app The Express Application to which the routes will be attached.
 */
export function setupRoutes(app: Application): void {
    // Define a route for the root URL which provides a welcome message.
    app.route("/").get((req: Request, res: Response) => {
        res.json({ message: "Welcome" }); // Sends a JSON response with a welcome message
    });

    app.use("/api/v1/user", UserRoute);
}
