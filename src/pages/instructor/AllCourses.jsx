import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function AllCourses() {
  const navigate = useNavigate();

  // ===== TABLE COLUMNS =====
  const columns = [
    {
      name: "Course Title",
      selector: (row) => row.title,
      sortable: true
    },
    {
      name: "Subtitle",
      selector: (row) => row.subtitle,
      sortable: true
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`badge ${row.status === "Published" ? "bg-success" : "bg-warning text-dark"
            }`}
        >
          {row.status}
        </span>
      ),
      sortable: true
    },
    {
      name: "Students",
      selector: (row) => row.students,
      sortable: true,
      right: true
    },
  ];

  // ===== SAMPLE DATA (Replace with API later) =====
  const data = [
    {
      id: 1,
      title: "Full Stack Web Development",
      subtitle: "Learn MERN Stack",
      status: "Published",
      students: 1200
    },
    {
      id: 2,
      title: "React Mastery",
      subtitle: "Build Real Projects",
      status: "Draft",
      students: 540
    }
  ];

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
          defaultSortField="title"
        />
      </div>
    </div>
  );
}

export default AllCourses;
