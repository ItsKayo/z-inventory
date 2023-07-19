import { useContext, useEffect, useState} from "react";
import { ParentContext } from "../App/App";
import { Link, useNavigate} from 'react-router-dom'
import './Item.css'

function Item() {
    const {items, auth} = useContext(ParentContext)
    const [item, setItem] = useState([])
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate()

    let link = window.location.href;
    let linkArr = link.split('/');
    let linkItem = linkArr.pop()

    useEffect(() => {
        for (let i=0; i < items.length; i++) {
            if (items[i].item_name === linkItem) {
                setItem(items[i])
            }
        }
        setName(item.item_name)
        setDescription(item.description)
        setQuantity(item.quantity)
    }, [item, items, linkItem])

    const handleEdit = async () => {
        const edit = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                item_name: name,
                description: description,
                quantity: quantity
            })
        }

        await fetch(`http://localhost:3001/items/${item.id}`, edit)
            .then(() => alert('Item updated'))
            .catch(err => alert(`Error: ${err} \n Item could not be updated`))
    }

    const renderInfo = () => {
        if (auth === true && edit === false) {
            return( 
                <div className="page">
                    <div className="formContainer">
                        <form className="addForm" >
                            <div className="formItem">
                                <label>Item Name:</label>
                                <input id='name' type='text' value={item.item_name} readonly disabled></input>
                            </div>
                            <div className="formItem">
                                <label>Description:</label>
                                <textarea id='description' type='text' value={item.description} readonly disabled></textarea>
                            </div>
                            <div className="formItem">
                                <label>Quantity:</label>
                                <input id='quantity' type='number' value={item.quantity} readonly disabled></input>
                            </div>
                        </form>
                    </div>
                    <div className="buttonsContainer">
                        <div className="addItemButtons">
                            <button id="back" onClick={() => navigate('/inventory')}><span class="material-symbols-outlined">arrow_back</span></button>
                            <button onClick={() => setEdit(true)}><span class="material-symbols-outlined">edit</span></button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (auth === true && edit === true) {
            return( 
                <div className="page">
                    <div className="formContainer">
                        <form className="addForm" >
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
                                <input id='quantity-edit' type='number' required min='0' placeholder='Quantity' onChange={e => setQuantity(e.target.value)}></input>
                            </div>
                        </form>
                    </div>
                     <div className="buttonsContainer">
                        <div className="addItemButtons">
                            <button onClick={() => setEdit(false)}><span class="material-symbols-outlined">close</span></button>
                            <button onClick={() => {handleEdit(); navigate('/inventory'); window.location.reload()}}><span class="material-symbols-outlined">done</span></button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return( 
                <div className="page">
                    <div className="formContainer">
                        <form className="addForm" >
                            <div className="formItem">
                                <label>Item Name:</label>
                                <input id='name' type='text' value={item.item_name} readonly disabled></input>
                            </div>
                            <div className="formItem">
                                <label>Description:</label>
                                <textarea id='description' type='text' value={item.description} readonly disabled></textarea>
                            </div>
                            <div className="formItem">
                                <label>Quantity:</label>
                                <input id='quantity' type='number' value={item.quantity} readonly disabled></input>
                            </div>
                        </form>
                    </div>
                    <div className="buttonsContainer">
                        <div className="addItemButtons">
                            <button onClick={() => navigate('/')}><span class="material-symbols-outlined">home</span></button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            {renderInfo()}
        </div>
    )
}

export default Item;