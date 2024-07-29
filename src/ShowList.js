import {Component} from "react";
import axios from "axios";

export default class ShowList extends Component {
    constructor() {
        super();
        this.state = {
            listCovid: [],
            inpSearch: '',
        }
    }

    componentDidMount() {
        axios.get('https://api-kent.netlify.app/.netlify/functions/api/vn').then(x => {
            let arr = [];
            console.log(x.data.detail);
            for (const key in x.data.detail) {
                arr.push(x.data.detail[key])
            }
            this.setState({listCovid: arr})
        })
    }

    render() {
        return (
            <>
                <input value={this.state.inpSearch}
                       onChange={(e) => {
                           this.setState({inpSearch: e.target.value});
                       }}/>
                <hr/>
                <button onClick={() => {
                    axios.get('https://api-kent.netlify.app/.netlify/functions/api/vn').then(x => {
                        let arr = [];
                        console.log(x.data.detail);
                        for (const key in x.data.detail) {
                            arr.push(x.data.detail[key])
                        }
                        arr = arr.sort((a, b) => a.cases - b.cases)
                        this.setState({listCovid: arr})
                    })
                }}>
                    Tang dan
                </button>
                <button onClick={() => {
                    axios.get('https://api-kent.netlify.app/.netlify/functions/api/vn').then(x => {
                        let arr = [];
                        console.log(x.data.detail);
                        for (const key in x.data.detail) {
                            arr.push(x.data.detail[key])
                        }
                        arr = arr.sort((a, b) => - a.cases + b.cases)
                        this.setState({listCovid: arr})
                    })
                }}>
                    Giam dan
                </button>
                <hr/>
                {this.state.listCovid.map(e => (
                    <>
                        {e.name.toUpperCase().includes(this.state.inpSearch.toUpperCase()) &&
                            <h4>Name: {e.name}, Cases {e.cases}, Death: {e.deaths}</h4>}
                    </>
                ))}

            </>
        )
    }
}
//Tìm kiếm theo tên tỉnh
// Nút hiện 5 tỉnh có cases cao nhất
// Nút hiện 5 tỉnh có deaths cao nhất
// Nút sắp xếp theo cases tăng dần, giảm dần
// Nút sắp xếp theo deaths tăng dần, giảm dần