import React, { useState } from "react";
import * as bootstrap from "bootstrap";

export default function InstructorCreate() {

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Rahul Soni",
            email: "rahul@gmail.com",
            phone: "9876543210",
            language: "English",
            description: "Instructor of Web Development",
            photo: ""
        },
    ]);

    const [editData, setEditData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        language: "",
        description: "",
        photo: ""
    });

    const openEditModal = (user) => {
        setEditData(user);
        const modal = new bootstrap.Modal(document.getElementById("editModal"));
        modal.show();
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setEditData({ ...editData, photo: files[0] });
        } else {
            setEditData({ ...editData, [name]: value });
        }
    };

    const updateUser = () => {
        setUsers(users.map(u => u.id === editData.id ? editData : u));
        bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4 fw-bold">Instructor Details</h2>

            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body">

                    <table className="table table-hover align-middle">
                        <thead className="custom-thead">
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Language</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>
                                        <img
                                            src="https://via.placeholder.com/40"
                                            className="rounded-circle"
                                            alt="avatar"
                                        />
                                    </td>
                                    <td className="fw-semibold">{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.phone}</td>
                                    <td>
                                        <span className="badge bg-primary px-3 py-2">
                                            {u.language}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-primary btn-sm"
                                            onClick={() => openEditModal(u)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-design">

                        <div className="modal-header modal-header-design">
                            <h5 className="modal-title text-white">Edit Instructor</h5>
                            <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body p-4">

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input type="text" className="form-control form-control-lg"
                                        name="name" value={editData.name}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input type="email" className="form-control form-control-lg"
                                        name="email" value={editData.email}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Phone</label>
                                    <input type="text" className="form-control form-control-lg"
                                        name="phone" value={editData.phone}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Language</label>
                                    <select className="form-select form-select-lg"
                                        name="language" value={editData.language}
                                        onChange={handleChange}>
                                        <option>English</option>
                                        <option>Hindi</option>
                                        <option>Gujarati</option>
                                        <option>Marathi</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label fw-semibold">Description</label>
                                    <textarea className="form-control"
                                        rows={3}
                                        name="description"
                                        value={editData.description}
                                        onChange={handleChange}></textarea>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Profile Photo</label>
                                    <input type="file" className="form-control" name="photo" />
                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary px-4" data-bs-dismiss="modal">
                                Close
                            </button>

                            <button className="btn btn-success px-4" onClick={updateUser}>
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
