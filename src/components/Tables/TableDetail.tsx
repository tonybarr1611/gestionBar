import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import axios from "axios";
import "./TablesStyle.css";

function TableDetail({ open, tableIndex, tableInfo }: any) {
  const [productos, setProductos] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch product data from the API
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get/product"
        );
        const fetchedData = response.data.map((product: any) => ({
          id: product.idProducto,
          item: product.nombre,
          quantity: product.cantidadDispo,
          price: product.precio,
        }));
        setProductData(fetchedData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    if (open && tableIndex >= 0) {
      setProductos(tableInfo[tableIndex].productos);
    }
  }, [open, tableIndex, tableInfo]);

  const updateQuantityDB = async (productID: number, quantity: number) => {
    try {
      await axios.put(
        `http://localhost:8000/api/update/mesaD/${tableInfo[tableIndex].id}`,
        {
          idProducto: productID,
          cantidad: quantity,
        }
      );
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  const addProductDB = async (productID: number) => {
    try {
      await axios.post(`http://localhost:8000/api/create/mesaD`, {
        idMesa: tableInfo[tableIndex].id,
        idProducto: productID,
        cantidad: 1,
        precio: productData.find((product) => product.id === productID)?.price,
      });
    } catch (error) {
      console.error("Error adding product to table:", error);
    }
  };

  const sumToQuantity = async (productID: number, quantity: number) => {
    await updateQuantityDB(productID, quantity);
    setProductos((prevProductos) => {
      const updatedProductos = prevProductos
        .map((product) =>
          product[0] === productID
            ? [product[0], Math.max(product[1] + quantity, 0)]
            : product
        )
        .filter((product) => product[1] > 0);

      // Also update the main tableInfo to keep it in sync
      const updatedTableInfo = [...tableInfo];
      updatedTableInfo[tableIndex].productos = updatedProductos;
      console.log(updatedTableInfo);
      return updatedProductos;
    });
  };

  const addProduct = async (productID: number) => {
    const productExists = productos.some((product) => product[0] === productID);

    if (productExists) {
      await sumToQuantity(productID, 1);
      setProductos((prevProductos) =>
        prevProductos.map((product) =>
          product[0] === productID ? [product[0], product[1]] : product
        )
      );
    } else {
      await addProductDB(productID);
      setProductos((prevProductos) => [...prevProductos, [productID, 1]]);
    }
  };

  const getProductName = (productID: number) => {
    const product = productData.find((p) => p.id === productID);
    return product ? product.item : `Producto ${productID}`;
  };

  return (
    <div>
      <h1 id="tablesHeader">Detalle de mesa</h1>
      {open ? (
        <div id="menuMesa">
          <h5>Mesa: {tableIndex + 1}</h5>
          <ul id="productos">
            {productos.map((product: any) => (
              <li key={product[0]}>
                {getProductName(product[0])} - Cantidad:
                <button
                  className="transparentBtn"
                  onClick={() => sumToQuantity(product[0], 1)}
                >
                  <PlusCircle size={20} />
                </button>
                {product[1]}
                <button
                  className="transparentBtn"
                  onClick={() => sumToQuantity(product[0], -1)}
                >
                  <DashCircle size={20} />
                </button>
              </li>
            ))}
          </ul>
          <div className="scrollableDiv datatable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Artículo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.item}</td>
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>
                    <td>
                      <button
                        className="transparentBtn"
                        onClick={() => addProduct(data.id)}
                      >
                        <PlusCircle size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <h5>Seleccione una mesa para ver su detalle</h5>
        </div>
      )}
    </div>
  );
}

export default TableDetail;
