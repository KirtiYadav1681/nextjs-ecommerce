import Layout from "@/pages/layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DeleteProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productDetail, setProductDetail] = useState("");

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    await axios.delete(`/api/products?id=${id}`);
    goBack();
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/products?id=${id}`)
      .then((res) => setProductDetail(res.data));
  }, [id]);

  return (
    <Layout>
      <div className="text-center">
        <h3 className="text-lg my-4 font-semibold">
          Do you really want to delete &lsquo;<b>{productDetail?.title}</b>&rsquo;?
        </h3>
        <div>
          <button className="btn-default" onClick={deleteProduct}>
            Yes
          </button>
          <button className="btn-red" onClick={goBack}>
            No
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DeleteProduct;
