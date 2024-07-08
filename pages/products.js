import React, { useEffect, useState } from "react";
import Layout from "./layout";
import Link from "next/link";
import axios from "axios";
import { MdEdit, MdOutlineDelete  } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link className="btn-primary" href="/products/new">
        Add new product
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <th>Product name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link href={`/products/edit/${product._id}`} className="btn-default">
                  <MdEdit />
                  Edit
                </Link>
                <Link href={`/products/delete/${product._id}`} className="btn-red">
                  <MdOutlineDelete  />
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
