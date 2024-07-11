import Layout from "@/pages/layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/products?id=${id}`).then((res) => setProductInfo(res.data));
  }, [id]);

  return (
    <Layout>
      <h1>Update Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
};

export default EditProduct;
