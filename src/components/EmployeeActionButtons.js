import { useSelector } from 'react-redux';
const EmployeeActionButtons = (props) => {
    const auth = useSelector((state) => state.auth.isAuthenticated);
    const clickHandler = (v) => {
        if(!auth) return;
        props.onSubmit(v,props.row);
    }
    return (
        <>
        <button onClick={() => clickHandler('E')}>Edit</button>
        <button onClick={() => clickHandler('D')}>Delete</button>
        </>
    )
}
export default EmployeeActionButtons;