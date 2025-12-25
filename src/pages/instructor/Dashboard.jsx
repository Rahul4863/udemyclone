import "./Dashboard.css";
import { FaShoppingCart, FaUsers, FaDollarSign, FaChartBar } from "react-icons/fa";

const users = [
  {
    name: "Elena Smith",
    email: "elena387@gmail.com",
    phone: "9876543210",
    created_at: "03 Sep 2024",
    img: "https://i.pravatar.cc/40?img=15"
  },
  {
    name: "Nelson Gold",
    email: "nelson556@gmail.com",
    phone: "9865321478",
    created_at: "26 Jul 2024",
    img: "https://i.pravatar.cc/40?img=10"
  },
  {
    name: "Grace Mitchell",
    email: "grace79@gmail.com",
    phone: "9988776655",
    created_at: "12 May 2024",
    img: "https://i.pravatar.cc/40?img=32"
  },
  {
    name: "Spencer Robin",
    email: "leo124@gmail.com",
    phone: "9090909090",
    created_at: "15 Aug 2024",
    img: "https://i.pravatar.cc/40?img=20"
  }
];

export default function Dashboard() {
  return (
    <>
      <h2 className="dashboard-title">Instructor Dashboard</h2>

      {/* ===== Top Stats Cards ===== */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="icon purple">
            <FaShoppingCart />
          </div>
          <h4>Total Courses</h4>
          <h2>25</h2>
          <p className="increase">Increased By 2.56% ↑</p>
        </div>

        <div className="stat-card">
          <div className="icon pink">
            <FaUsers />
          </div>
          <h4>Total Students</h4>
          <h2>1,286</h2>
          <p className="increase">Increased By 0.34% ↑</p>
        </div>

        <div className="stat-card">
          <div className="icon green">
            <FaDollarSign />
          </div>
          <h4>Total Revenue</h4>
          <h2>$34,241</h2>
          <p className="increase">Increased By 7.66% ↑</p>
        </div>

        <div className="stat-card">
          <div className="icon orange">
            <FaChartBar />
          </div>
          <h4>Total Sales</h4>
          <h2>1,756</h2>
          <p className="decrease">Decreased By 0.74% ↓</p>
        </div>

      </div>


      {/* ===== USERS TABLE CARD ===== */}
      <div className="users-card">

        <div className="users-header">
          <h3>Recent Users</h3>
          <button className="view-btn">View All</button>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>
                  <div className="user-info">
                    <img src={u.img} alt="" />
                    <span>{u.name}</span>
                  </div>
                </td>

                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.created_at}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </>
  );
}
