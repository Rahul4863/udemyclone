import DataTable from "react-data-table-component";
export default function TotalInstructor() {
    const columns = [
        { name: "ID", selector: row => row.id },
        { name: "Instructor Name", selector: row => row.name },
        { name: "Instructor Email", selector: row => row.email },
        { name: "Instructor Phone", selector: row => row.phone },
        { name: "Total Courses", selector: row => row.totalCourses },
        { name: "Total Students", selector: row => row.totalStudents },
        { name: "Created At", selector: row => row.date },
    ];
    const data = [
        { id: 1, name: "Rahul", email: "test@mail.com", phone: "1234567890", date: "12-12-2025", totalCourses: "5", totalStudents: "100" }
    ];
    return (
        <>
            <h2>Total Instructor</h2>

            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
            />
        </>
    );
}