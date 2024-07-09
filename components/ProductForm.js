import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [category, setCategory] = useState(existingCategory || "");
  const [categories, setCategories] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      // update
      await axios.put(`/api/products`, { ...data, _id });
    } else {
      // create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    return router.push("/products");
  }

  async function uploadImages(e) {
    setIsUploading(true);
    const files = e.target?.files;
    if (files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("files", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
    setIsUploading(false);
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories?.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
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
      <label>Category</label>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">Uncategorized</option>
        {categories?.length > 0 &&
          categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div key={p.name}>
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(e) => setProductProp(p.name, e.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>Photos</label>
      <div className="mb-2">
        <div className="flex gap-2 mb-2">
          {/* <ReactSortable
            list={images}
            className="flex gap-2"
            setList={updateImagesOrder}
          > */}
          {images?.length > 0 &&
            images.map((link, index) => (
              <div key={index} className="mr-2">
                <Image
                  className="rounded-lg"
                  src={link}
                  width={0}
                  height={0}
                  alt={link}
                  sizes="80px"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            ))}
          {/* </ReactSortable> */}
          {isUploading && (
            <div className="h-[80px] flex items-center justify">
              <Spinner />
            </div>
          )}
        </div>
        <label className="upload-btn">
          <MdOutlineFileUpload size={20} />
          <span>Upload</span>
          <input
            type="file"
            onChange={(e) => uploadImages(e)}
            className="upload-input"
          />
        </label>
        {!images?.length && <div>No photos in this product</div>}
      </div>
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
      <button
        className="btn-primary"
        style={{ marginLeft: "10px" }}
        onClick={() => setGoToProducts(true)}
      >
        {`<- Back`}
      </button>
    </form>
  );
}
