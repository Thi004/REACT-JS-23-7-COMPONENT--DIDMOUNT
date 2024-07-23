import {Component} from "react";
import axios from "axios";

export default class Product extends Component {
    constructor() {
        super();
        this.state = {
            product: [
                {id: '1', name: 'Television', price: 200},
                {id: '2', name: 'Fan', price: 600},
                {id: '3', name: 'Table', price: 400},
            ],
            newProduct: [
                {id: '', name: '', price: ''}
            ],
            list: []
        }
    }

    componentDidMount() {
        axios.get('https://api-kent.netlify.app/.netlify/functions/api/vn').then(y => {
            let arr = [];
            for (const key in y.data.detail) {
                arr.push(y.data.detail[key])
            }
            this.setState({list: arr})
        })
    }

    render() {
        return (
            <>
                {this.state.list.map(e => (
                    <h4>{e.name},{e.cases}</h4>
                ))}
                <hr/>
                <h1 style={{color: 'green'}}>DANH SÁCH SẢN PHẨM</h1>
                <input onChange={(e) => {
                    let searchList = this.state.product.filter(x => x.name.includes(e.target.value));
                    this.setState({product: searchList});
                }}/>
                <br/>
                <button onClick={() => {
                    let list = this.state.product.sort((a, b) => a.price - b.price);
                    this.setState({product: list})
                }}
                >Tăng dần
                </button>
                <button onClick={() => {
                    let list = this.state.product.sort((a, b) => -a.price + b.price);
                    this.setState({product: list})
                }}
                >Giảm dần
                </button>
                {this.state.product.map(e => (
                    <div>
                        <h2>{e.name} : {e.price}</h2>
                    </div>
                ))}
                <hr/>
                <input value={this.state.newProduct.id} onChange={(e) => {
                    this.setState({newProduct: {...this.state.newProduct, id: e.target.value}})
                }}
                />
                <input value={this.state.newProduct.name} onChange={(e) => {
                    this.setState({newProduct: {...this.state.newProduct, name: e.target.value}})
                }}
                />
                <input value={this.state.newProduct.price} onChange={(e) => {
                    this.setState({newProduct: {...this.state.newProduct, price: e.target.value}})
                }}
                />
                <button onClick={() => {
                    this.setState({
                        product: [...this.state.product, this.state.newProduct],
                        newProduct: {id: '', name: '', price: ''}
                    })
                }}
                >Add New
                </button>

            </>
        )
    }
}