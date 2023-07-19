import { useContext, useState} from "react";
import { ParentContext } from "../App/App";
import './AddItem.css'
import {useNavigate, Link} from 'react-router-dom'

function AddItem() {
    const {loggedInUser} = useContext(ParentContext)
    const [name, setName]= useState('')
    const [description, setDescription]= useState('')
    const [quantity, setQuantity]= useState(0)
    const navigate = useNavigate()

    const handleAdd = async () => {
        const newItem = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: loggedInUser.id,
                item_name: name,
                description: description,
                quantity: quantity
            })
        }

        await fetch('http://localhost:3001/items', newItem)
            .then(() => alert('Item added'))
            .catch(err => alert(`Error: ${err} \n Item could not be added`))
    }

    return (
        <div className="formContainerAdd">
            <form className="addForm" >
                <h1 id='formTitle'>Add Item</h1>
                <div className="formItem">
                    <label>Item Name:</label>
                    <input id='name-edit' type='text' required placeholder='Item Name' onChange={e => setName(e.target.value)}></input>
                </div>
                <div className="formItem">
                    <label>Description:</label>
                    <textarea id='description-edit' type='text' required placeholder='Description' onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="formItem">
                    <label>Quantity:</label>
                    <input id='quantity-edit' type='number'  required min='0' placeholder='Quantity' onChange={e => setQuantity(e.target.value)}></input>
                </div>
                <div class="addMenuButtons">
                    <button id="backButton" onClick={() => navigate('/inventory')}><span class="material-symbols-outlined">arrow_back</span></button>
                    <button id="addButton" onClick={() => {handleAdd(); navigate('/inventory'); window.location.reload()}}><span class="material-symbols-outlined">add</span></button>
                </div>
            </form>
        </div>
    )
}

export default AddItem