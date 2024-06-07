import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./RequestsStyle.css";

function RequestsForm() {
  const [chosenSuppliers, setChosenSupplier] = useState<any[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get/proveedor");
        const data = await response.json();
        const mappedData = data.map((supplier: any) => ({
          _id: supplier._id,
          id: supplier.idProveedor,
          name: supplier.nombre,
          email: supplier.correo,
          phone: supplier.telefono,
        }));
        setSuppliers(mappedData); // Handling JSON response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get/product");
        const data = await response.json();
        const mappedData = data.map((product: any) => ({
          _id: product._id,
          id: product.idProducto,
          item: product.nombre,
          quantity: product.cantidadDispo,
          price: product.precio,
        }));
        setProducts(mappedData); // Handling JSON response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSuppliers();
    fetchProducts();
  }, []);

  const sumToQuantity = (productID: number, quantity: number) => {
    setProductos((prevProductos) => {
      const updatedProductos = prevProductos
        .map((product) =>
          product[0] === productID
            ? [product[0], Math.max(product[1] + quantity, 0)]
            : product
        )
        .filter((product) => product[1] > 0);

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
    const product = products.find((p) => p.id === productID);
    return product ? product.item : `Producto ${productID}`;
  };

  const getProduct = (productID: number) => {
    return products.find((p) => p.id === productID);
  };

  const getSummary = () => {
    const tipoSolicitudElement = document.querySelector(
      'input[name="tipoSolicitud"]:checked'
    ) as HTMLInputElement;

    const tipoSolicitudValue = tipoSolicitudElement
      ? tipoSolicitudElement.value
      : null;

    const summary = {
      type: tipoSolicitudValue?.toString(),
      suppliers: chosenSuppliers,
      products: productos.map((product) => {
        const productData = getProduct(product[0]);
        return {
          id: product[0],
          name: productData?.item,
          quantity: product[1],
          price: productData?.price,
        };
      }),
    };

    console.log(summary);
    return summary;
  };

  return (
    <div id="inventoryForm">
      <h1 id="manipulateProductHeader">Enviar solicitud</h1>
      <div className="formContainer">
        <Form className="bg-body-tertiary" data-bs-theme="dark">
          <Form.Label>
            <h2>Tipo de solicitud:</h2>
          </Form.Label>
          <div key="inline-radio" className="mb-3 gridContainer">
            <div className="gridItem">
              <Form.Check
                inline
                label="Cotización"
                name="tipoSolicitud"
                value={"Cotización"}
                type="radio"
                id="cotizacion"
                defaultChecked
              />
            </div>
            <div className="gridItem">
              <Form.Check
                inline
                label="Pedido"
                name="tipoSolicitud"
                value={"Pedido"}
                type="radio"
                id="solicitud"
              />
            </div>
          </div>
          <Form.Label>
            <h2>Proveedores:</h2>
          </Form.Label>
          <div className="gridContainer scrollableContainer bordered padding">
            {suppliers.map((supplier) => (
              <div className="gridItem" key={supplier.id}>
                <Form.Check
                  type="checkbox"
                  label={supplier.name}
                  id={"supplier" + supplier.id}
                  onChange={() => {
                    if (chosenSuppliers.includes(supplier)) {
                      setChosenSupplier(
                        chosenSuppliers.filter((s) => s.id !== supplier.id)
                      );
                    } else {
                      setChosenSupplier([...chosenSuppliers, supplier]);
                    }
                    console.log(chosenSuppliers);
                  }}
                />
              </div>
            ))}
          </div>
          <Form.Label>
            <h2>Productos:</h2>
          </Form.Label>
          <ul id="productos" className="bordered marginContainer">
            {productos.map((product: any) => (
              <li key={"product" + product[0].toString()} className="padding">
                {getProductName(product[0])} - Cantidad:
                <button
                  type="button"
                  className="transparentBtn"
                  onClick={() => sumToQuantity(product[0], 1)}
                >
                  <PlusCircle size={20} />
                </button>
                {product[1]}
                <button
                  type="button"
                  className="transparentBtn"
                  onClick={() => sumToQuantity(product[0], -1)}
                >
                  <DashCircle size={20} />
                </button>
              </li>
            ))}
          </ul>
          <br />
          <p style={{ paddingLeft: "2.2%" }}>
            Agregue productos usando la siguiente tabla
          </p>
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
                {products.map((data) => (
                  <tr key={"tableProduct" + data.id.toString()}>
                    <td>{data.id}</td>
                    <td>{data.item}</td>
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>
                    <td>
                      <button
                        type="button"
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
          <div className="BtnContainer">
            <Link to={"/solicitudes/resumen"} state={{ summary: getSummary() }}>
              <Button className="submitBtn" id="submitB">
                Agregar
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RequestsForm;
