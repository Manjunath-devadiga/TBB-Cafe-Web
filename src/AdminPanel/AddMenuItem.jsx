import { useState, useEffect } from "react";
import { MENU_TYPES, CATEGORY } from "../config/menuConfig";

export default function AddMenuItem() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    type: "Veg",
    discount: 0,
    image: "",
  });

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);


  const fetchItems = () => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingItem) {
      await fetch(`http://localhost:5000/api/menu/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("Item Updated!");
    } else {
      await fetch("http://localhost:5000/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("Item Added!");
    }

    // RESET
    setForm({
      name: "",
      price: "",
      category: "",
      type: "Veg",
      discount: 0,
      image: "",
    });

    setEditingItem(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/menu/${id}`, {
      method: "DELETE",
    }); fetchItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm(item);
  };

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3">
        {editingItem ? "Edit Item" : "Add Item"}
      </h3>

      <form onSubmit={handleSubmit} className="p-4 border rounded">

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <select
          className="form-control mb-2"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
              category: "",
            })
          }
        >
          {MENU_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {CATEGORY[form.type] && (
          <select
            className="form-control mb-2"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {CATEGORY[form.type]?.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        )}
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Discount %"
          value={form.discount}
          onChange={(e) =>
            setForm({ ...form, discount: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Image URL or /images/item.jpg"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button className="btn btn-dark w-100">
          {editingItem ? "Update Item" : "Add Item"}
        </button>

      </form>
      <div className="mt-4">
        <h4>Menu Items</h4>

        {items.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between align-items-center border p-2 mb-2"
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
                <strong>{item.name}</strong>
                <br />
                ₹{item.price} | {item.type}
              </div>

            </div>

            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item.id)}
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