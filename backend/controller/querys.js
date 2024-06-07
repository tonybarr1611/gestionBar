import producto from '../models/productoModel.js';
import recibo from '../models/reciboModel.js';
import reciboDetalle from '../models/reciboDetalleModel.js';
import mesaD from '../models/mesaDetalleModel.js';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';


export const getTableTotal = async (req, res) => {
    try {
        const mesaDetalles = await mesaD.find({ idMesa: req.params.idMesa });
        let total = 0;
        for (let i = 0; i < mesaDetalles.length; i++) {
            total += mesaDetalles[i].total;
        }
        res.status(200).json({ total });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const transMesaRecibo = async (req, res) => {
    req.params.idMesa = req.params.idMesa;
    try {
        const mesaDetalles = await mesaD.find({ idMesa: req.params.idMesa });
        let total = 0;
        for (let i = 0; i < mesaDetalles.length; i++) {
            total += mesaDetalles[i].total;
        }
        var maxIDRecibo;
        if ((await recibo.countDocuments()) === 0) {
            maxIDRecibo = 0;
        } else {
            maxIDRecibo = (await recibo.find().sort({ idRecibo: -1 }).limit(1))[0].idRecibo;
        }
        const newRecibo = new recibo({
            _id: new mongoose.Types.ObjectId(),
            idRecibo: maxIDRecibo + 1,
            fecha: req.body.fecha,
            monto: total,
            estado: req.body.estado,
            comprador: req.body.comprador
        });
        await newRecibo.save();

        for (let i = 0; i < mesaDetalles.length; i++) {
            const newReciboDetalle = new reciboDetalle({
                _id: new mongoose.Types.ObjectId(),
                idRecibo: newRecibo.idRecibo,
                idProducto: mesaDetalles[i].idProducto,
                cantidad: mesaDetalles[i].cantidad,
                precio: mesaDetalles[i].precio,
                total: mesaDetalles[i].total
            })
            await newReciboDetalle.save();
        }
        await mesaD.deleteMany({ idMesa: req.params.idMesa });
        res.status(201).json(newRecibo);
    } catch (error) {
        console.error('Error creating recibo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const montoTotal = async (req, res) => {

    try {
        const recibos = await recibo.find();
       
        const today = new Date();
        const todayRecibos = recibos.filter(recibo => recibo.fecha.getDate() === today.getDate() && recibo.fecha.getMonth() === today.getMonth() && recibo.fecha.getFullYear() === today.getFullYear());

        let total = 0; 
        
        for (let i = 0; i < todayRecibos.length; i++) {
            total += todayRecibos[i].monto;
        }
        res.status(200).json({ total });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const cantidadTotal = async (req, res) => {

    try {
        const recibos = await recibo.find();
       
        // filters the recibos and returns only the ones that, as fecha, have the same day as the current day
        const today = new Date();
        const todayRecibos = recibos.filter(recibo => recibo.fecha.getDate() === today.getDate() && recibo.fecha.getMonth() === today.getMonth() && recibo.fecha.getFullYear() === today.getFullYear());
        let total = todayRecibos.length;

        res.status(200).json({ total });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const resumenProductos = async (req, res) => {
    try {
        const productos = await producto.find();
        let resumen = [];
        const recibos = await recibo.find();
        const today = new Date();
        const todayRecibos = recibos.filter(recibo => recibo.fecha.getDate() === today.getDate() && recibo.fecha.getMonth() === today.getMonth() && recibo.fecha.getFullYear() === today.getFullYear());

        const todayRecibosDetalles = await reciboDetalle.find({ idRecibo: { $in: todayRecibos.map(recibo => recibo.idRecibo) } });
        for (let i = 0; i < productos.length; i++) {
            let cantidad = 0;
            let monto = 0;
            for (let j = 0; j < todayRecibosDetalles.length; j++) {
                if (productos[i].idProducto === todayRecibosDetalles[j].idProducto) {
                    cantidad += todayRecibosDetalles[j].cantidad;
                    monto += todayRecibosDetalles[j].total;
                }
            }
            resumen.push({
                idProducto: productos[i].idProducto,
                nombre: productos[i].nombre,
                cantidad: cantidad,
                monto: monto
            });
        }
        
        resumen.sort((a, b) => b.monto - a.monto);
        resumen = resumen.filter(producto => producto.cantidad > 0);
        res.status(200).json(resumen);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const sendEmail = async (req, res) => {
    try {
      const { supplierName, supplierEmail } = req.body;
      const pdfFile = req.file;
      console.log(pdfFile);
      console.log(supplierName);
      console.log(supplierEmail);
  
      if (!pdfFile) {
        return res.status(400).send("No file uploaded.");
      }
  
      // Setup Nodemailer transporter
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Replace with your email
          pass: process.env.EMAIL_PASS, // Replace with your email password
        },
      });
  
      // Email options
      let mailOptions = {
        from: `"Bar Bam" <${process.env.EMAIL_USER}>`, // Replace with your email
        to: supplierEmail,
        subject: `Solicitud para ${supplierName}`,
        text: `Se adjunta la solicitud en formato PDF.`,
        attachments: [
          {
            filename: "solicitud.pdf",
            content: pdfFile.buffer,
            contentType: "application/pdf",
          },
        ],
      };
  
      // Send email
      let info = await transporter.sendMail(mailOptions);
  
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).send("Error sending email.");
    }
  };

export default { montoTotal, cantidadTotal, resumenProductos, transMesaRecibo, getTableTotal, sendEmail };