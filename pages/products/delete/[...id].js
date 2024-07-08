import Layout from '@/pages/layout'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const DeleteProduct = () => {
    const router = useRouter();
    const { id } = router.query;

    const goBack = () => {
        router.push('/products');
    }

    const deleteProduct = async () => {
        await axios.delete(`/api/products?id=${id}`);
        goBack();
    }
  return (
    <Layout>
        Do you really want to delete this product?
        <button className="btn-default" onClick={deleteProduct}>Yes</button>
        <button className="btn-red" onClick={goBack}>No</button>
    </Layout>
  )
}

export default DeleteProduct