import { ParentContext } from "../App/App";
import './Home.css'
import React, {useContext} from 'react'

function Home() {
    const {items} = useContext(ParentContext)
    console.log(items)

    return (
        <div className="itemTableContainer">
            <h1 id="tableTitle">Item List:</h1>
            <table className="itemTable">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => 
                        <tr>
                            <td>{item.item_name}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home;