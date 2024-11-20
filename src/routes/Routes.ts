import express from "express";
import cors from "cors";
import Login from "../auth/login/login";
import ingressosController from "../controller/ingressos.controller";
import eventosController from "../controller/eventos.controller";

//iniciando a app com express
export const App = express();
App.use(express.json());
App.use(express.urlencoded({extended:true}));
App.use(cors({
  origin:'*',
  methods:['POST', 'PUT', 'GET'],
  credentials:true,
  allowedHeaders:['Authorization', 'Bearer']
}))

App.post('/auth/login', Login);
App.get('/ingressos', ingressosController.List);
App.get('/ingressos/:id', ingressosController.getIngressosById);
App.put('/ingressos', ingressosController.UpdateStatus)
App.get('/eventos', eventosController.List);

