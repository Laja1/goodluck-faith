import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ViewOrdersTable from './ViewOrdersTable';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  imageUrl: Yup.string()
    .url("Invalid image URL")
    .required("Image URL is required"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  description: Yup.string().required("Description is required"),
});

export default function AdminPage() {
  const [admin, setAdmin] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
        navigation.navigate('/')
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://localhost:5300/api/user", config)
      .then((res) => {
        if (res.data.message === "unauthorized") {
          setAdmin([]);
          // Redirect to the home page or show an error message
        } else {
          setAdmin(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5300/api/product", config)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

       axios
      .get("http://localhost:5300/api/order", config)
      .then((res) => {
        console.log(res.data)
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 const handleDelete = async (productId) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
       navigation.navigate('/')
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:5300/api/product/${productId}`, config);
      setProducts((prevProducts) => prevProducts.filter((item) => item.id !== productId));
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex">
                    <button onClick={()=>handleDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <Formik
          initialValues={{
            name: "",
            imageUrl: "",
            price: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const token = window.localStorage.getItem("token");
            if (!token) {
              console.log("Token not found");
              return;
            }

            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            axios
              .post("http://localhost:5300/api/product", values, config)
              .then((res) => {
                console.log(res);
                resetForm();
                // Add the new product to the products state
                setProducts([...products, res.data]);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              <div>
                <label htmlFor="name" className="font-bold">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="font-bold">
                  Image URL
                </label>
                <Field
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="price" className="font-bold">
                  Price
                </label>
                <Field
                  type="number"
                  name="price"
                  id="price"
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="description" className="font-bold">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  rows="3"
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Product
              </button>
            </Form>
          )}
        </Formik>
      </div>


      <h2 className="text-2xl font-bold mb-4">View Orders</h2>
      <ViewOrdersTable order={order} />
    </div>
  );
}