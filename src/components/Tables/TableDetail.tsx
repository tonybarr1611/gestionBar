import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import "./TablesStyle.css";

function TableDetail({ open, tableIndex, tableInfo }: any) {
  const [productos, setProductos] = useState<any[]>([]);

  const mockProductData = [
    {
      id: 1,
      item: "Apple iPhone 13",
      type: "Electronics",
      name: "Smartphone",
      quantity: 50,
      price: 999,
    },
    {
      id: 2,
      item: "Nike Air Max",
      type: "Footwear",
      name: "Running Shoes",
      quantity: 200,
      price: 120,
    },
    {
      id: 3,
      item: "Sony WH-1000XM4",
      type: "Electronics",
      name: "Noise Cancelling Headphones",
      quantity: 150,
      price: 350,
    },
    {
      id: 4,
      item: "Samsung Galaxy Tab S7",
      type: "Electronics",
      name: "Tablet",
      quantity: 75,
      price: 650,
    },
    {
      id: 5,
      item: "Dell XPS 13",
      type: "Electronics",
      name: "Laptop",
      quantity: 60,
      price: 1200,
    },
    {
      id: 6,
      item: "Adidas Ultraboost",
      type: "Footwear",
      name: "Running Shoes",
      quantity: 180,
      price: 180,
    },
    {
      id: 7,
      item: "Apple Watch Series 7",
      type: "Electronics",
      name: "Smartwatch",
      quantity: 130,
      price: 399,
    },
    {
      id: 8,
      item: "Bose QuietComfort 35 II",
      type: "Electronics",
      name: "Noise Cancelling Headphones",
      quantity: 90,
      price: 299,
    },
    {
      id: 9,
      item: "Google Nest Hub",
      type: "Electronics",
      name: "Smart Display",
      quantity: 110,
      price: 129,
    },
    {
      id: 10,
      item: "Canon EOS R6",
      type: "Electronics",
      name: "Mirrorless Camera",
      quantity: 40,
      price: 2500,
    },
    {
      id: 11,
      item: "Levi's 501 Original",
      type: "Clothing",
      name: "Jeans",
      quantity: 300,
      price: 70,
    },
    {
      id: 12,
      item: "Sony PlayStation 5",
      type: "Electronics",
      name: "Gaming Console",
      quantity: 55,
      price: 499,
    },
    {
      id: 13,
      item: "Amazon Echo Dot",
      type: "Electronics",
      name: "Smart Speaker",
      quantity: 210,
      price: 50,
    },
    {
      id: 14,
      item: "Microsoft Surface Pro 7",
      type: "Electronics",
      name: "2-in-1 Laptop",
      quantity: 80,
      price: 899,
    },
    {
      id: 15,
      item: "Fitbit Charge 5",
      type: "Electronics",
      name: "Fitness Tracker",
      quantity: 140,
      price: 179,
    },
    {
      id: 16,
      item: "Instant Pot Duo",
      type: "Home Appliances",
      name: "Pressure Cooker",
      quantity: 170,
      price: 99,
    },
    {
      id: 17,
      item: "Kindle Paperwhite",
      type: "Electronics",
      name: "E-Reader",
      quantity: 90,
      price: 129,
    },
    {
      id: 18,
      item: "Dyson V11",
      type: "Home Appliances",
      name: "Cordless Vacuum Cleaner",
      quantity: 65,
      price: 599,
    },
    {
      id: 19,
      item: "Nikon Z6",
      type: "Electronics",
      name: "Mirrorless Camera",
      quantity: 50,
      price: 1800,
    },
    {
      id: 20,
      item: "GoPro HERO9",
      type: "Electronics",
      name: "Action Camera",
      quantity: 75,
      price: 399,
    },
    {
      id: 21,
      item: "Ray-Ban Wayfarer",
      type: "Accessories",
      name: "Sunglasses",
      quantity: 230,
      price: 150,
    },
    {
      id: 22,
      item: "The North Face Jacket",
      type: "Clothing",
      name: "Winter Jacket",
      quantity: 120,
      price: 250,
    },
    // Add more mock data here
  ];

  useEffect(() => {
    if (open && tableIndex >= 0) {
      setProductos(tableInfo[tableIndex].productos);
    }
  }, [open, tableIndex, tableInfo]);

  const sumToQuantity = (productID: number, quantity: number) => {
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
      // TODO - Update database
      console.log(updatedTableInfo);
      return updatedProductos;
    });
  };

  const addProduct = (productID: number) => {
    setProductos((prevProductos) => {
      const productExists = prevProductos.some(
        (product) => product[0] === productID
      );

      if (productExists) {
        return prevProductos.map((product) =>
          product[0] === productID ? [product[0], product[1] + 1] : product
        );
      } else {
        return [...prevProductos, [productID, 1]];
      }
    });
  };

  const getProductName = (productID: number) => {
    const product = mockProductData.find((p) => p.id === productID);
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
                  <th>Tipo</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mockProductData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.item}</td>
                    <td>{data.type}</td>
                    <td>{data.name}</td>
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
