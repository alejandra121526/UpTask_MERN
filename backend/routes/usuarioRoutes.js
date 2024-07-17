import express from "express";
const router = express.Router();

import { registrar, autenticar } from "../controllers/usuarioController.js"


//Autenticacion, registro y confirmacion  de usuarios
router.post('/', registrar);//Creacion de usuarios
router.post("/login", autenticar)


export default router;