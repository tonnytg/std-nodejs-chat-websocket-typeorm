import { Router, Request, Response } from "express"
import {SettingsController} from "./controllers/SettingsController";

const routes = Router()

// GET -> Busca
// POST -> Criação -> Routes Params: parametro de rotas, Query Params: Filtros, Body Params: vem no corpo
// PUT -> Alteração
// DELETE -> Deletar
// PATCH -> Alterar

const settingController = new SettingsController();

routes.post('/settings', settingController.create)

export { routes }