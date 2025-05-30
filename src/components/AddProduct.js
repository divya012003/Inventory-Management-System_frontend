import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/products", form);
      navigate("/products");
    } catch (error) {
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 480px;
          margin: 3rem auto;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 10px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: white;
        }
        h2 {
          text-align: center;
          color: #1e40af;
          margin-bottom: 1.5rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        label {
          font-weight: 600;
          color: #374151;
        }
        input {
          padding: 0.65rem 1rem;
          font-size: 1rem;
          border: 2px solid #cbd5e1;
          border-radius: 6px;
          transition: border-color 0.3s ease;
        }
        input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 5px #2563eb;
        }
        button {
          background-color: #1e40af;
          color: white;
          padding: 0.75rem;
          font-weight: 700;
          font-size: 1.1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #2563eb;
        }
        @media (max-width: 500px) {
          .container {
            margin: 2rem 1rem;
          }
        }
      `}</style>

      <div className="container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            placeholder="Brief Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            placeholder="Available Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Price (₹)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Price per unit"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            placeholder="Category (e.g. Electronics)"
            value={form.category}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
