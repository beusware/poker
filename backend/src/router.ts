import { Router } from "express";
import * as constants from "./constants";

export const router: Router = Router();
const htmlpath = constants.paths.viewsDirectory;
const staticpath = constants.paths.staticDirectory;

// Poker
router.get(["/"], (_, res) => {
  res.sendFile(`${htmlpath}/lobby.html`);
});

// 404
router.get("*", (_, res) => {
  res.status(404).sendFile(`${htmlpath}/error.html`);
});
