import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function AllCourses() {
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isTrending, setIsTrending] = useState(false);
  const columns = [
    {
      name: "Course Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Subtitle",
      selector: (row) => row.subtitle,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`badge ${row.status === "Published"
            ? "bg-success"
            : "bg-warning text-dark"
            }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Students",
      selector: (row) => row.students,
      sortable: true,
      right: true,
    },
    {
      name: "Trending",
      cell: (row) => (
        <button
          className={`btn btn-sm ${row.trending ? "btn-success" : "btn-outline-secondary"
            }`}
          data-bs-toggle="modal"
          data-bs-target="#trendingModal"
          onClick={() => {
            setSelectedCourse(row);
            setIsTrending(row.trending);
          }}
        >
          {row.trending ? "Trending" : "Not Trending"}
        </button>
      ),
    },
  ];

  // ===== SAMPLE DATA =====
  const data = [
    {
      id: 1,
      title: "Full Stack Web Development",
      subtitle: "Learn MERN Stack",
      status: "Published",
      students: 1200,
      trending: true,
    },
    {
      id: 2,
      title: "React Mastery",
      subtitle: "Build Real Projects",
      status: "Draft",
      students: 540,
      trending: true,
    },
  ];
  const handleSaveTrending = () => {
    console.log("Course ID:", selectedCourse.id);
    console.log("Trending:", isTrending);
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("trendingModal")
    );
    modal.hide();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Courses</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/instructor/create")}
        >
          + Add New Course
        </button>
      </div>

      <div className="shadow-sm border rounded p-2 bg-white">
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>

      {/* ===== TRENDING MODAL ===== */}
      <div
        className="modal fade"
        id="trendingModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Trending Course</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <p className="fw-semibold">
                {selectedCourse?.title}
              </p>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                />
                <label className="form-check-label">
                  Mark as Trending
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveTrending}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AllCourses;
