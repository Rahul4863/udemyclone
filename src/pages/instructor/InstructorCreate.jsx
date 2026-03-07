import React, { useState } from "react";
import * as bootstrap from "bootstrap";
import { useAuth } from "../../context/AuthContext";
import axiosUser from "../../utils/axiosUser";
import { toast } from "react-toastify";
import { baseurl } from "../../App";
export default function InstructorCreate() {
    const { user, setUser } = useAuth();
    const [editData, setEditData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        language: "",
        description: "",
        designation: "",
        photo: null
    });
    const IMAGE_BASE = baseurl + "/";
    const openEditModal = (user) => {
        setEditData({
            id: user.id,
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            language: user.language || "",
            description: user.description || "",
            photo: null
        });
        const modal = new bootstrap.Modal(
            document.getElementById("editModal")
        );
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
    const updateUser = async () => {
        try {
            const formData = new FormData();
            formData.append("name", editData.name);
            formData.append("email", editData.email);
            formData.append("phone", editData.phone);
            formData.append("language", editData.language);
            formData.append("description", editData.description);
            formData.append("designation", editData.designation)
            if (editData.photo) {
                formData.append("photo", editData.photo);
            }
            const res = await axiosUser.put("auth/update", formData);
            if (res.data.status === true) {
                toast.success(res.data.message);
                setUser(prev => ({
                    ...prev,
                    image: res.data.image,
                    ...editData
                }));

                bootstrap.Modal.getInstance(
                    document.getElementById("editModal")
                ).hide();
            }

        } catch (error) {
            console.error("Axios error:", error);
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update profile"
            );
        }
    };
    return (
        <div className="container mt-4">
            <h2 className="mb-4 fw-bold">Instructor Details</h2>
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead>
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
                            <tr>
                                <td>
                                    <img
                                        src={IMAGE_BASE + user?.image}
                                        className="rounded-circle"
                                        width="40"
                                    />
                                </td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.phone}</td>
                                <td>
                                    <span className="badge bg-primary">
                                        {user?.language}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => openEditModal(user)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Instructor</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input
                                className="form-control mb-2"
                                name="name"
                                value={editData.name}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                            <input
                                className="form-control mb-2"
                                name="designation"
                                value={editData.designation}
                                onChange={handleChange}
                                placeholder="Name"
                            />

                            <input
                                className="form-control mb-2"
                                name="email"
                                value={editData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />

                            <input
                                className="form-control mb-2"
                                name="phone"
                                value={editData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                            />

                            <select
                                className="form-select mb-2"
                                name="language"
                                value={editData.language}
                                onChange={handleChange}
                            >
                                <option value="">Select Language</option>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Gujarati</option>
                                <option>Marathi</option>
                            </select>

                            <textarea
                                className="form-control mb-2"
                                rows="3"
                                name="description"
                                value={editData.description}
                                onChange={handleChange}
                                placeholder="Description"
                            />

                            <input
                                type="file"
                                className="form-control"
                                name="photo"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={updateUser}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
