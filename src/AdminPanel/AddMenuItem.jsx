import { useState, useEffect } from "react";

export default function AddMenuItem() {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    type: "",
    discount: 0,
    image: "",
  });

  const [editingItem, setEditingItem] =
    useState(null);

  // FETCH ITEMS

  const fetchItems = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/menu"
      );

      const data = await res.json();

      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // DYNAMIC TYPES

  const menuTypes = [
    ...new Set(items.map((i) => i.type)),
  ];

  // DYNAMIC CATEGORIES

  const categories = [
    ...new Set(
      items
        .filter((i) => i.type === form.type)
        .map((i) => i.category)
    ),
  ];

  // SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingItem
      ? `http://localhost:5000/api/menu/${editingItem.id}`
      : "http://localhost:5000/api/menu";

    const method = editingItem
      ? "PUT"
      : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert(
      editingItem
        ? "Item Updated!"
        : "Item Added!"
    );

    setForm({
      name: "",
      price: "",
      category: "",
      type: "",
      discount: 0,
      image: "",
    });

    setEditingItem(null);

    fetchItems();
  };

  // DELETE

  const handleDelete = async (id) => {
    await fetch(
      `http://localhost:5000/api/menu/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchItems();
  };

  // EDIT

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm(item);
  };

  return (
    <div className="container py-4">

      <h3 className="text-center mb-4">
        {editingItem
          ? "Edit Item"
          : "Add Item"}
      </h3>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm"
      >

        <input
          className="form-control mb-3"
          placeholder="Item Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

        {/* TYPE */}

        <input
          className="form-control mb-3"
          placeholder="Type"
          list="types"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
              category: "",
            })
          }
        />

        <datalist id="types">
          {menuTypes.map((type) => (
            <option
              key={type}
              value={type}
            />
          ))}
        </datalist>

        {/* CATEGORY */}

        <input
          className="form-control mb-3"
          placeholder="Category"
          list="categories"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <datalist id="categories">
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            />
          ))}
        </datalist>

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Discount %"
          value={form.discount}
          onChange={(e) =>
            setForm({
              ...form,
              discount: e.target.value,
            })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
            })
          }
        />

        <button className="btn btn-dark w-100">
          {editingItem
            ? "Update Item"
            : "Add Item"}
        </button>
      </form>

      {/* ITEMS */}

      <div className="mt-5">
        <h4 className="mb-3">
          Menu Items
        </h4>

        {items.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
          >

            <div className="d-flex align-items-center gap-3">

              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div>
                <strong>
                  {item.name}
                </strong>

                <div>
                  ₹{item.price} |{" "}
                  {item.type} |{" "}
                  {item.category}
                </div>
              </div>
            </div>

            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() =>
                  handleEdit(item)
                }
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  handleDelete(item.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}