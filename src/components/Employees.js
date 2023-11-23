import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

import configVars from "../siteconfig";
import EmployeeActionButtons from "./EmployeeActionButtons";
let changeStatusHandler;
let editEmployeeHandler;
let removeEmployeeHandler
const handleButtonClick = (v) => {	
    changeStatusHandler(v.id)
};
const editDeleteHandler = (v,row) => {
    if(v === 'E') {
        editEmployeeHandler(row.id);
    } else if(v === 'D') {
        removeEmployeeHandler(row.id)
    }
}
const columns = [
    {
        name: 'First Name',
        selector: row => row.first_name,
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: row => row.last_name,
        sortable: true,
    },
    {
        name: 'Phone',
        selector: row => row.phone,
        sortable: true,
    },
    {
        cell: (v) => <button onClick={() => handleButtonClick(v)}>{v.status}</button>,
        ignoreRowClick: true,
        allowoverflow: true,
        button: "true",
        name: 'Status',
        selector: '',
    },
    {
        name: 'Action',
        selector: '',
        cell: (v) =>  <EmployeeActionButtons row={v} onSubmit={editDeleteHandler}/>,
        ignoreRowClick: true,
        allowoverflow: true,
        button: "true",
    },
];

let tabledata = [];

const Employees = () => {
    const auth = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    function fetchEmployees() {
        fetch(configVars.url+"/getEmployees", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((response) => response.json())
        .then((data) => {
            tabledata = data;
            setEmployees(data)
        })
        .catch((error) => console.log(error));
    }
    useEffect(() => {
        fetchEmployees();
    },[]);
    changeStatusHandler = async (id) => {
        if(!auth) return;
        let obj = {id:id};
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        };
        let ret = false;
        await fetch(configVars.url+'/changeEmployeeStatus', options)
        .then(response => response.json())
        .then(data => {    
            if(data) {
                ret = true;
                fetchEmployees();
            }
        }).catch(error => console.error(error));
    
        return ret;
    }
    removeEmployeeHandler = async (id) => {
        let obj = {id:id};
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        };
        let ret = false;
        await fetch(configVars.url+'/removeEmployee', options)
        .then(response => response.json())
        .then(data => {    
            if(data) {
                ret = true;
                fetchEmployees();
            }
        }).catch(error => console.error(error));
    
        return ret;
    }
    editEmployeeHandler = (id) => {
        navigate('edit/'+id)
    }
    //=============
    
    //=============
    return (
        <>
        <div className="row">
            <div className="col text-end px-4" >
                {auth && <Link to="/employees/add" className="nav-item nav-link ">Add Employee</Link>}
            </div>
        </div>

        <div className="row pt-4">
            <div className="col text-start fw-bold" >First Name</div>
            <div className="col text-start fw-bold" >Last Name</div>
            <div className="col text-start fw-bold" >Phone</div>
            <div className="col text-start fw-bold" >Status</div>
            <div className="col text-start fw-bold" >Action</div>
        </div>
        {employees.map((emps) => (
            <div className="row py-1" key={emps.id}>
                <div className="col text-start">{emps.first_name}</div>
                <div className="col text-start">{emps.last_name}</div>
                <div className="col text-start">{emps.phone}</div>
                <div className="col text-start">
                    {auth && <Link to="/employees" className="nav-item nav-link " onClick={() => changeStatusHandler(emps.id)}>{emps.status}</Link>}
                    {!auth && emps.status}
                    
                </div>
                <div className="col text-start">
                    {auth &&  <button className="btn btn-info me-2" onClick={(() => editEmployeeHandler(emps.id))}>Edit</button> }
                    {auth &&  <button className="btn btn-danger" onClick={(() => removeEmployeeHandler(emps.id))}>Remove</button> }
                    {!auth &&  <button className="btn  me-2">Edit</button> }
                    {!auth &&  <button className="btn ">Remove</button> }
                </div>
            </div>
        ))}


        <DataTable columns={columns} data={tabledata} pagination  />
        </>
    )
    
}

export default Employees;