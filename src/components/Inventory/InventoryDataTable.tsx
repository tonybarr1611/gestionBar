import Table from "react-bootstrap/Table";
import InventoryData from "./InventoryData";

function InventoryDataTable() {
  const mockData = [
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

  return (
    <div>
      <Table striped bordered hover data-bs-theme="dark">
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
          {mockData.map((data) => (
            <InventoryData key={data.id} {...data} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default InventoryDataTable;
