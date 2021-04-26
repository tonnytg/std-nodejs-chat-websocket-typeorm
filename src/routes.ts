import { Router, Request, Response } from "express"
import {SettingsController} from "./controllers/SettingsController";
import {UsersController} from "./controllers/UsersController";
import {MessagesController} from "./controllers/MessagesController";

const routes = Router()

// GET -> Busca
// POST -> Criação -> Routes Params: parametro de rotas, Query Params: Filtros, Body Params: vem no corpo
// PUT -> Alteração
// DELETE -> Deletar
// PATCH -> Alterar

const settingController = new SettingsController();
const usersControlers = new UsersController();
const messagesControlers = new MessagesController();

routes.post('/settings', settingController.create);
routes.post('/users', usersControlers.create);
routes.post('/messages', messagesControlers.create);
routes.get('/messages/:id', messagesControlers.showByUser);

export { routes }