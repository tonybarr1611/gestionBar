import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./RequestsStyle.css";

function RequestsForm() {
  const mockSupplierData = [
    {
      id: 1,
      name: "Cervecería de Costa Rica",
      email: "cerveceria@fifco.com",
      phone: 123123123,
    },
    {
      id: 2,
      name: "Coca Cola",
      email: "costarica@cocacola.com",
      phone: 456456456,
    },
    {
      id: 3,
      name: "PepsiCo",
      email: "contact@pepsico.com",
      phone: 789789789,
    },
    {
      id: 4,
      name: "Nestlé",
      email: "info@nestle.com",
      phone: 101010101,
    },
    {
      id: 5,
      name: "Procter & Gamble",
      email: "support@pg.com",
      phone: 111111111,
    },
    {
      id: 6,
      name: "Unilever",
      email: "customer.service@unilever.com",
      phone: 121212121,
    },
    {
      id: 7,
      name: "Kimberly-Clark",
      email: "service@kimberly-clark.com",
      phone: 131313131,
    },
    {
      id: 8,
      name: "Johnson & Johnson",
      email: "contact@jnj.com",
      phone: 141414141,
    },
    {
      id: 9,
      name: "Colgate-Palmolive",
      email: "info@colpal.com",
      phone: 151515151,
    },
    {
      id: 10,
      name: "General Mills",
      email: "support@generalmills.com",
      phone: 161616161,
    },
    {
      id: 11,
      name: "Mars, Inc.",
      email: "contact@mars.com",
      phone: 171717171,
    },
    {
      id: 12,
      name: "Mondelez International",
      email: "service@mondelez.com",
      phone: 181818181,
    },
    {
      id: 13,
      name: "Kraft Heinz",
      email: "info@kraftheinz.com",
      phone: 191919191,
    },
    {
      id: 14,
      name: "Danone",
      email: "contact@danone.com",
      phone: 202020202,
    },
    {
      id: 15,
      name: "Heineken",
      email: "info@heineken.com",
      phone: 212121212,
    },
    {
      id: 16,
      name: "L'Oreal",
      email: "customer.service@loreal.com",
      phone: 222222222,
    },
  ];

  const [chosenSuppliers, setChosenSupplier] = useState<any[]>([]);

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
    const product = mockProductData.find((p) => p.id === productID);
    return product ? product.item : `Producto ${productID}`;
  };

  const getProduct = (productID: number) => {
    return mockProductData.find((p) => p.id === productID);
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
            {mockSupplierData.map((supplier) => (
              <div className="gridItem">
                <Form.Check
                  key={"supplier" + supplier.id.toString()}
                  type="checkbox"
                  label={supplier.name}
                  id={"supplier" + supplier.id.toString()}
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
                  <th>Tipo</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mockProductData.map((data) => (
                  <tr key={"tableProduct" + data.id.toString()}>
                    <td>{data.id}</td>
                    <td>{data.item}</td>
                    <td>{data.type}</td>
                    <td>{data.name}</td>
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
