import DataTable from "react-data-table-component";
export default function TotalInstructor() {
    const columns = [
        { name: "Instructor Name", selector: row => row.name },
        { name: "Instructor Email", selector: row => row.email },
        { name: "Instructor Phone", selector: row => row.phone },
        { name: "Total Courses", selector: row => row.totalCourses },
        { name: "Created At", selector: row => row.date },
    ];
    const data = [
        { name: "Rahul", email: "test@mail.com", phone: "1234567890", date: "12-12-2025", totalCourses: "5" }
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