import React, { useEffect, useState, useContext } from "react";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEdit, FaTrash, FaHeart } from 'react-icons/fa'; 


const ProductList = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const storedToken = token || localStorage.getItem("token");
      const res = await axios.get("/products", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
      alert(err?.response?.data?.msg || "Failed to fetch products");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        });
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.msg || "Failed to delete product");
      }
    }
  };

  const addToWishlist = async (productId) => {
    if (!token) {
      alert("Please log in to add to wishlist");
      return;
    }
    try {
      await axios.post(
        `/wishlist/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Added to wishlist!");
      navigate("/wishlist");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to add to wishlist");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  return (
    <>
      <style>{`
        .container {
          max-width: 960px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: Arial, sans-serif;
        }
        h2 {
          color: #1e3a8a;
          margin-bottom: 1rem;
        }
        a.add-product {
          display: inline-block;
          margin-bottom: 1rem;
          background-color: #2563eb;
          background: linear-gradient(to right, #86a8e7, #d16ba5);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        a.add-product:hover {
          background-color: #1d4ed8;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
          border-radius: 10px;
          overflow: hidden;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px 15px;
          text-align: left;
        }
        th {
          background-color: #2563eb;
          color: white;
          font-weight: 600;
        }
        tbody tr:hover {
          background-color: #f1f5f9;
        }
        button {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          margin: 0 2px;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #1d4ed8;
        }
        button.delete {
          background-color: #ef4444;
        }
          button.edit {
          background-color: white;
        }
        button.delete:hover {
          background-color: #dc2626;
        }
        @media (max-width: 600px) {
          table, thead, tbody, th, td, tr {
            display: block;
          }
          th {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
          tr {
            margin-bottom: 1rem;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 10px;
          }
          td {
            border: none;
            position: relative;
            padding-left: 50%;
            white-space: pre-wrap;
            text-align: right;
          }
          td::before {
            position: absolute;
            top: 10px;
            left: 15px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            font-weight: 600;
            text-align: left;
            content: attr(data-label);
          }
          button {
            margin-top: 8px;
            width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <h2>Product List</h2>
        <Link className="add-product" to="/add">
          Add Product
        </Link>
        <br></br>
        <Link className="add-product" to="/wishlist">
          wishlist
        </Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td data-label="Name">{p.name}</td>
                <td data-label="Description">{p.description}</td>
                <td data-label="Quantity">{p.quantity}</td>
                <td data-label="Price">₹{p.price}</td>
                <td data-label="Category">{p.category}</td>
                <td data-label="Actions">
  <Link to={`/edit/${p._id}`} style={{ color: 'green', marginRight: '10px', fontSize: '18px' }} title="Edit">
    <FaEdit />
  </Link>
  
  <button 
    onClick={() => deleteProduct(p._id)} 
    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'orange', fontSize: '18px', marginRight: '10px' }} 
    title="Delete"
  >
    <FaTrash />
  </button>
  
  <button 
    onClick={() => addToWishlist(p._id)} 
    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red', fontSize: '18px' }} 
    title="Add to Wishlist"
  >
    <FaHeart />
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
