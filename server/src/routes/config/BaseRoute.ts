import { Router } from "express";
import { IRouter } from "./IRoute";

/* This code snippet is defining an abstract class named `BaseRoutes` that implements the `IRouter`
interface. The class has a property `router` of type `Router` from the Express library. */
export default abstract class BaseRoutes implements IRouter{

    public router: Router;

    constructor()
    {
        this.router = Router();
        this.routes();
    }

    abstract routes(): void;

}
