// Import required modules
import "dotenv/config";  // Loads environment variables from a .env file
import express, { Application } from "express";  // Imports express and its Application interface
import morgan from "morgan";  // Imports morgan for HTTP request logging
import cors from "cors";  // Imports CORS to allow cross-origin requests

// Import database configuration
import Database from "./BLL/config/database";  // Imports the Database configuration class

// Import routing configuration
import { setupRoutes } from "./routes";  // Imports the function to setup application routes

/**
 * Class responsible for creating and configuring the Express application.
 */
class App {
    public app: Application;  // Declares the app variable of type Application

    constructor() {
        this.app = express();  // Assigns express instance to our app variable

        this.middleware();  // Initialize middleware
        this.database();  // Initialize database connection
        this.routes();  // Initialize routes
    }

    /**
     * Establishes the database connection and synchronizes models.
     */
    protected database() {
        const db = new Database();
        db.sequelize?.sync();  // Synchronize all models with the database
    }

    /**
     * Configures middleware for the application.
     */
    protected middleware() {
        this.app.use(express.json());  // Support JSON-encoded bodies
        this.app.use(express.urlencoded({ extended: true }));  // Support URL-encoded bodies
        this.app.use(morgan("dev"));  // Enable HTTP request logging with morgan
        this.app.use(cors());  // Enable all CORS requests
    }

    /**
     * Configures application routes.
     */
    protected routes(): void {
        setupRoutes(this.app);  // Setup routes using the imported setupRoutes function
    }
}

// Determine the port to listen on
const port = process.env.PORT || 3000;  // Use the PORT environment variable or default to 3000

// Instantiate the App class and start listening for HTTP requests
const server = new App().app;  // Create a new App instance and extract the Express application

server.listen(port, () => {
    console.log(`Server running on port ${port}`);  // Log the port the server is running on
});
