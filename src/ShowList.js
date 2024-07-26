import {Component} from "react";
import axios from "axios";

export default class ShowList extends Component {
    constructor() {
        super();
        this.state = {
            listCovid: [],
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
                {this.state.listCovid.map(e => (
                    <h4>{e.name},{e.cases}</h4>
                ))}
                <hr/>

            </>
        )
    }
}