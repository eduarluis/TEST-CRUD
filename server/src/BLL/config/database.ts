import { Sequelize } from "sequelize-typescript";

//Entities
import { User } from "../entities/User";

/**
 * Class that encapsulates the database connections and settings using Sequelize.
 */
export default class Database {
    public sequelize: Sequelize | undefined;

    // Declare variables for connecting to the PostgreSQL database using environment variables.
    private DB_DATABASE = process.env.DB_DATABASE as string;
    private DB_HOST = process.env.DB_HOST as string;
    private DB_USER = process.env.DB_USER as string;
    private DB_PASSWORD = process.env.DB_PASSWORD as string;
    private DB_PORT = parseInt(process.env.DB_PORT || "5432", 10);

    /**
     * Constructor automatically initiates a connection to PostgreSQL when a Database object is created.
     */
    constructor() {
        this.connectionToPostgresSQL();
    }

    /**
     * The function establishes a connection to a PostgreSQL database using Sequelize in a TypeScript
     * environment.
     */
    private async connectionToPostgresSQL() {
        this.sequelize = new Sequelize({
            database: this.DB_DATABASE,
            username: this.DB_USER,
            password: this.DB_PASSWORD,
            host: this.DB_HOST,
            port: this.DB_PORT,
            dialect: "postgres",
            logging: false, 
            models: [User], 
        });

        // Attempt to authenticate with the database
        this.sequelize.authenticate()
            .then(() => {
                console.log("Connection to SQL database established successfully.");
            })
            .catch((err) => {
                console.error("Unable to connect to the SQL database:", err);
            });
    }
}

