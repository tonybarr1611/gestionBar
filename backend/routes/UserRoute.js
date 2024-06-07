import express from 'express';
import {fetchP, createP, updateP, eraseP} from '../controller/producto.js';
import {fetchR, createR, updateR, eraseR} from '../controller/recibo.js';
import {fetchRD, createRD, updateRD} from '../controller/reciboDetalle.js';
import {fetchS, createS, updateS, eraseS} from '../controller/proveedor.js';
import {fetchM, cambiarEstado, deleteM, createM} from '../controller/mesa.js';
import {fetchMD, fetchOneMD, createMD, updateMD, eraseMD} from '../controller/mesaDetalle.js';
import {montoTotal, cantidadTotal, resumenProductos, transMesaRecibo, getTableTotal} from '../controller/querys.js';
import axios from 'axios';
import { get } from 'mongoose';
const route = express.Router();

//Querys
route.get('/get/total', montoTotal) ; 
route.get('/get/resumen', resumenProductos);
route.get('/get/cantidad', cantidadTotal);
route.post('/transMesaRecibo/:idMesa', transMesaRecibo);
route.get('/get/tableTotal/:idMesa', getTableTotal);

//mesa 
route.get('/get/mesa', fetchM);
route.put('/update/mesa/:idMesa', cambiarEstado);
route.delete('/delete/mesa/:idMesa', deleteM);
route.post('/create/mesa', createM);

//mesaDetalle
route.get('/get/mesaD', fetchMD);
route.get('/get/mesaD/:idMesa', fetchOneMD);
route.post('/create/mesaD', createMD);
route.put('/update/mesaD/:idMesa', updateMD);
route.delete('/delete/mesaD/:_id', eraseMD);

//productos
route.get('/get/product', fetchP);
route.post('/create/product', createP);
route.put('/update/product/:idProducto', updateP);
route.delete('/delete/product/:idProducto', eraseP);

//recibos
route.get('/get/recibo', fetchR);
route.post('/create/recibo', createR);
route.put('/update/recibo/:idRecibo', updateR);
route.delete('/delete/recibo/:idRecibo', eraseR);


//reciboDetalle
route.get('/get/RD', fetchRD);
route.post('/create/RD', createRD);
route.put('/update/RD/:nombre', updateRD);
//proveedores
route.get('/get/proveedor', fetchS);
route.post('/create/proveedor', createS);
route.put('/update/proveedor/:name', updateS);
route.delete('/delete/proveedor/:name', eraseS);



export default route;