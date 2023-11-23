import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import configVars from "../siteconfig";
import { InputMask } from '@react-input/mask';


async function addNewEmployee(obj) {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    };
    let ret = false;
    await fetch(configVars.url+'/addEmployee', options)
    .then(response => response.json())
    .then(data => {    
        if(data.is_success) {
            ret = true;
        }
    }).catch(error => console.error(error));

    return ret;
}

const AddEmployee = () => {
    const routeParams = useParams();
    
    useEffect(() => {
        if(routeParams.id) {
            findEmployee(routeParams.id);
        }
    },[routeParams.id]);
    
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [phone, setPhone] = useState('');
    let [id, setId] = useState('');
    const findEmployee = async (id) => {
        await fetch(configVars.url+'/findEmployee?id='+id)
        .then(response => response.json())
        .then(data => {    
            if(data) {
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setPhone(data.phone);
                setId(id);
            }
        }).catch(error => console.error(error));
    }

    
    const navigate = useNavigate();
    const inputChangeHandler = (identifier, value) => {
        if (identifier === 'firstname') {
            setFirstName(value)
        } else if(identifier === 'lastname') {
            setLastName(value)
        } else {
            setPhone(value);
        }
    }
    const addEmployeeHandler = (event) => {
        event.preventDefault();

        
        let empObj = {firstName:firstName, lastName: lastName,phone: phone, id:id?id:undefined}
        
        let ret = addNewEmployee(empObj);
        setFirstName('');
        setLastName('');
        if(ret){
            navigate('/employees');
        }
    }
    const cancelEmployeeHandler = () => {
        navigate('/employees')
    }

    return (
        <>
        <title>Add Employee</title>
        <div className="row">
            <form className="col-lg-6 mx-auto">
                <div className="row g-3">
                    <div className="col-6">
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={ (event) => inputChangeHandler('firstname', event.target.value) } />
                            <label >First Name</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-floating">
                            <input type="text" className="form-control"  placeholder="Last Name" value={lastName} onChange={ (event) => inputChangeHandler('lastname', event.target.value) }  />
                            <label >Last Name</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-floating">
                            {/* <input type="text" className="form-control"  placeholder="Last Name" value={lastName} onChange={ (event) => inputChangeHandler('lastname', event.target.value) }  /> */}
                            <InputMask mask="_____-_____" replacement={{ _: /\d/ }} className="form-control" placeholder="00000-00000" value={phone} onChange={ (event) => inputChangeHandler('phone', event.target.value) }/>
                            <label >Phone</label>
                        </div>
                    </div>
                    <div className="col-12" style={{ display: 'flex', justifyContent: 'end' }}>
                        <button className="btn btn-primary me-2" onClick={addEmployeeHandler}>Submit</button>
                        <button className="btn btn-primary" onClick={cancelEmployeeHandler}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default AddEmployee;