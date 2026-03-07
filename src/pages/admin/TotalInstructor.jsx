import DataTable from "react-data-table-component";
import axiosAdmin from "../../utils/axiosAdmin";
import { useEffect, useState } from "react";
export default function TotalInstructor() {
    const [instructor, setInstructor] = useState([]);
    useEffect(() => {
        axiosAdmin.get("/admin/instructor-view").then((res) => {
            console.log(res.data.data);
            setInstructor(res.data.data);
        });
    }, []);

    const columns = [
        { name: "ID", selector: row => row.id },
        { name: "Instructor Name", selector: row => row.name },
        { name: "Instructor Email", selector: row => row.email },
        { name: "Instructor Phone", selector: row => row.phone },

        { name: "Created At", selector: row => row.created_at?.split("T")[0] },
    ];
    return (
        <>
            <h2>Total Instructor</h2>

            <DataTable
                columns={columns}
                data={instructor}
                pagination
                highlightOnHover
            />
        </>
    );
}