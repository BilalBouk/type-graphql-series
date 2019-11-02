import { Response } from "express";
import { createAuthorsLoader } from "../utils/authorsLoader";

export interface MyContext {
  req: any;
  res: Response;
  authorsLoader: ReturnType<typeof createAuthorsLoader>;
}
