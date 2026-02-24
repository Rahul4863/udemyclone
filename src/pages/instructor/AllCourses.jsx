import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosUser from "../../utils/axiosUser";
import { toast } from "react-toastify";
function AllCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isTrending, setIsTrending] = useState(false);
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosUser.get("/course/all");

      if (res.data?.status) {
        setCourses(res.data.data || []);
      } else {
        toast.error(res.data?.message || "Failed to fetch courses");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      name: "Course Title",
      selector: (row) => row.title,
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
      selector: (row) => row.students || 0,
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
    {
      name: "Add Section",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/instructor/course/${row.id}/section`)}
        >
          Add Section
        </button>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/instructor/create/${row.id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const handleSaveTrending = async () => {
    try {
      // Example API (adjust if needed)
      await axiosUser.post("/course/update-trending", {
        course_id: selectedCourse.id,
        trending: isTrending,
      });

      toast.success("Trending status updated");

      // update UI instantly
      setCourses((prev) =>
        prev.map((course) =>
          course.id === selectedCourse.id
            ? { ...course, trending: isTrending }
            : course
        )
      );

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("trendingModal")
      );
      modal.hide();
    } catch (error) {
      toast.error("Failed to update trending status");
    }
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
          data={courses}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="No courses found"
        />
      </div>

      {/* ================= TRENDING MODAL ================= */}
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
              <p className="fw-semibold mb-2">
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
                disabled={!selectedCourse}
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
