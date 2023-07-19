import { useContext } from "react";
import { ParentContext } from "../App/App";
import { Link, useNavigate } from 'react-router-dom'

function Inventory() {
    const { items, loggedInUser } = useContext(ParentContext)
    const navigate = useNavigate()

    const removeItem = (id) => {
        fetch(`http://localhost:3001/items/${id}`, { method: 'DELETE' })
            .then(() => { setTimeout(alert('Item deleted'), 3000); window.location.reload() })
            .catch(err => alert(`Error: ${err} \n Item could not be deleted`))
    }

    return (
        <div className="itemTableContainer">
            <h1 id="tableTitle">Inventory:</h1>
            <table className="itemTable">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        if (item.user_id === loggedInUser.id) {
                            return (
                                <tr>
                                    <td><Link to={`/item/${item.item_name}`}>{item.item_name}</Link></td>
                                    <td className="quantTable">{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <button onClick={() => removeItem(item.id)}><span class="material-symbols-outlined">delete</span></button>
                                </tr>
                            )
                        }
                    })}
                    <button onClick={() => navigate('/additem')}><span class="material-symbols-outlined">add</span></button>
                </tbody>
            </table>
        </div>
    )
}

export default Inventory