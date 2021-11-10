import { useState, useEffect } from "react";

const CheckBox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);
    const checkedIds = [...checked]
    const handleToggle = id => () => {
        //return -1 or first index
        const foundId = checked.indexOf(id)
        if (foundId === -1) {
            checkedIds.push(id)
        }
        else {
            checkedIds.splice(foundId, 1)
        }
        setChecked(checkedIds);
        handleFilters(checkedIds)
    }
    useEffect(() => {
        // alert(JSON.stringify(checked))
    }, [checked])
    return categories.map(category => (
        <li className="list-unstyled" key={category._id}>
            <input
                onChange={handleToggle(category._id)}
                type="checkbox"
                value={checked.indexOf(category._id === -1)}
                className="form-check-input"
            />
            <label className="from-check-label">{category.name}</label>
        </li>
    ))
}

export default CheckBox
