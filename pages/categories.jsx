import React, { useEffect, useState } from "react";
import Layout from "./layout";
import axios from "axios";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  const fetchCategories = () => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    const propertyData = properties.map((p) => ({
      name: p.name,
      values: p.values.split(","),
    }));
    const data = { name, parentCategory, properties: propertyData };
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
    setProperties(
      category?.properties?.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete(`/api/categories?_id=${_id}`);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValueChange(index, property, newValue) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValue;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category "${editedCategory.name}"`
          : "Create a new category"}
      </label>
      <form onSubmit={(e) => addCategory(e)} className="pt-2">
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Enter new category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">No parent category</option>
            {categories?.length > 0 &&
              categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            className="btn-default text-sm mt-2"
            onClick={addProperty}
          >
            Add new property
          </button>
          {properties?.length > 0 &&
            properties?.map((property, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e. target.value)
                  }
                  placeholder="propert name (example:color)"
                />
                <input
                  type="text"
                  value={property.values}
                  onChange={(e) =>
                    handlePropertyValueChange(index, property, e. target.value)
                  }
                  placeholder="values, comma separated"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button className="btn btn-primary w-[150px]" type="submit">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Parent Category</th>
              <th style={{textAlign:"right", paddingRight:"24px"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0 &&
              categories?.map((category) => (
                <tr key={category._id}>
                  <td>{category?.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td
                    style={{
                      display: "flex",
                      gap:"8px",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      className="btn-default flex flex-row items-center justify-center gap-1"
                      onClick={() => editCategory(category)}
                    >
                      <MdEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-red flex flex-row items-center justify-center gap-1"
                    >
                      <MdOutlineDelete />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
