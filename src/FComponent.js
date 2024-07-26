import {useEffect, useState} from "react";
import axios from "axios";

export function FComponent() {
    let [a, setA] = useState(0);
    let [b, setB] = useState(0);
    let [sum, setSum] = useState(0);
    let [div,setDiv] = useState(0);
    useEffect(() => {
        axios.get('https://api-kent.netlify.app/.netlify/functions/api/vn').then(x => {
            console.log(x)
        })
    }, []);
    return (
        <>
            <input type="number" value={a} onChange={(e) => {
                setA(+e.target.value)
            }}/>
            <input type="number" value={b} onChange={(e) => {
                setB(+e.target.value)
            }}/>
            <button onClick={() => {
                setSum(a + b)
            }}>
                +
            </button>
            <button onClick={() => {
                setDiv(a - b)
            }}>
                -
            </button>
            <h4>tong: {sum}</h4>
            <h4> hieu: {div}</h4>
        </>
    )
}

// lam 4 nut tinh + - * /