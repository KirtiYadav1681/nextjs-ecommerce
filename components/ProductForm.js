import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import Spinner from "./Spinner";

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
    try {
      if (_id) {
        await axios.put(`/api/products/${_id}`, data);
      } else {
        await axios.post("/api/products", data);
      }
      setGoToProducts(true);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  if (goToProducts) {
    router.push("/products");
    return null;
  }

  const uploadFile = async (e) => {
    setIsUploading(true);
    const file = e.target.files[0];
    try {
      let formData = new FormData();
      formData = { ...formData, files: file };

      const response = await axios.post("/api/upload-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "file-name": file.name,
        },
      });
      if (response.data.message === "Success") {
        setImages([...images, response.data.imgUrl]);
        console.log(response.data.imgUrl);
      } else {
        console.error("File upload failed", response.data);
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
    setIsUploading(false);
  };

  function updateImagesOrder(newImages) {
    setImages(newImages);
  }

  function setProductProperty(propertyName, value) {
    setProductProperties((prevProps) => ({
      ...prevProps,
      [propertyName]: value,
    }));
  }

  const fillPropertiesForCategory = () => {
    if (categories?.length > 0 && category) {
      const categoryInfo = categories.find((cat) => cat._id === category);
      const propertiesToFill = [...categoryInfo.properties];

      let parentCategory = categoryInfo.parent;
      while (parentCategory?._id) {
        const parentCategoryInfo = categories.find(
          (cat) => cat._id === parentCategory._id
        );
        propertiesToFill.push(...parentCategoryInfo.properties);
        parentCategory = parentCategoryInfo.parent;
      }

      return propertiesToFill;
    }
    return [];
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Add a new product"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      {fillPropertiesForCategory().map((property) => (
        <div key={property.name}>
          <label>
            {property.name[0].toUpperCase() + property.name.substring(1)}
          </label>
          <select
            value={productProperties[property.name] || ""}
            onChange={(e) => setProductProperty(property.name, e.target.value)}
          >
            {property.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
      <label>Photos</label>
      <div className="mb-2">
        <div className="flex gap-2 mb-2">
          {images.map((imageUrl, index) => (
            <div key={index} className="mr-2">
              <Image
                className="rounded-lg"
                src={imageUrl}
                alt={`Product Image ${index + 1}`}
                width={80}
                height={80}
              />
            </div>
          ))}
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
            name="image"
            type="file"
            onChange={(e) => uploadFile(e)}
            className="upload-input"
          />
        </label>
        {!images.length && <div>No photos in this product</div>}
      </div>
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in INR)</label>
      <input
        type="number"
        placeholder="Price"
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
        {"<- Back"}
      </button>
    </form>
  );
}
