import React, { useState } from "react";
import Layout from "../layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

const NewProduct = () => {

  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
};

export default NewProduct;
