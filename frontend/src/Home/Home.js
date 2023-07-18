import { ParentContext } from "../App/App";
import './Home.css'
import React, {useContext} from 'react'

function Home() {
    const {users, items} = useContext(ParentContext)

    const getInventoryManager = (userid) => {
        for (let i=0; i < users.length; i++) {
            if (users[i].id === userid) {
                return <td>{`${users[i].first_name} ${users[i].last_name}`}</td>
            }
        }
    }

    return (
        <div className="itemTableContainer">
            <h1 id="tableTitle">Item List:</h1>
            <table className="itemTable">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Inventory Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => 
                        <tr>
                            <td>{item.item_name}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            {getInventoryManager(item.user_id)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home;