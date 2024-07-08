import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    if (_id) {
      await axios.put(`/api/products`, { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    return router.push("/products");
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="add a new product"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Price (in INR)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}
