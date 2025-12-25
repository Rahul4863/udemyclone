import DataTable from "react-data-table-component";

export default function Students(){

  const columns = [
    { name:"Student Name", selector: row => row.name },
    { name:"Email", selector: row => row.email },
    { name:"Course", selector: row => row.course },
    { name:"Purchase Date", selector: row => row.date },
  ];

  const data = [
    { name:"Rahul", email:"test@mail.com", course:"React", date:"12-12-2025" }
  ];

  return(
    <>
      <h2>Purchased Students</h2>

      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </>
  );
}
