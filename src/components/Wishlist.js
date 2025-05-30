import React, { useEffect, useState, useContext } from "react";
import axios from "../axios";
import { AuthContext } from "../context/AuthContext";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(wishlistItems.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove from wishlist");
    }
  };

  if (!wishlistItems.length) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Your wishlist is empty.</p>;
  }

  return (
    <>
      <style>{`
        .wishlist-container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f9fafb;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h2 {
          text-align: center;
          color: #1e40af;
          margin-bottom: 1.5rem;
        }
        .wishlist-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }
        .wishlist-table th,
        .wishlist-table td {
          border: 1px solid #ddd;
          padding: 12px 16px;
          text-align: left;
        }
        .wishlist-table th {
          background-color: #2563eb;
          color: white;
          font-weight: 600;
        }
        .wishlist-table tbody tr:hover {
          background-color: #f1f5f9;
        }
        button {
          background-color: #ef4444;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #dc2626;
        }
        @media (max-width: 600px) {
          .wishlist-table th, .wishlist-table td {
            padding: 8px 10px;
          }
          .wishlist-table {
            font-size: 0.9rem;
          }
          button {
            padding: 6px 10px;
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="wishlist-container">
        <h2>Your Wishlist</h2>
        <table className="wishlist-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th style={{ width: "110px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map(({ _id, product }) => (
              <tr key={_id}>
                <td>{product.name}</td>
                <td>
                  {product.description?.length > 100
                    ? product.description.substring(0, 100) + "..."
                    : product.description}
                </td>
                <td>
                  <button onClick={() => removeFromWishlist(product._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Wishlist;
