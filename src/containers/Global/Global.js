import React, {Component} from 'react'
import './Global.css'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import Moment from 'react-moment';

import WorldStats from '../../components/WorldStats/WorldStats'

export default class Global extends Component{

    state = {
        result: {
            "TotalConfirmed": 0,
            "TotalDeaths": 0,
            "TotalRecovered": 0,
            "ActiveCase": 0
        },
        date : {}
    }

    async componentDidMount(){
        var globalData = await axios.get("https://api.covid19api.com/summary");

        let covid = globalData.data.Global
        let dataDate = globalData.data.Date       
        this.setState({
            result: {
                "TotalConfirmed": covid.TotalConfirmed,
                "TotalDeaths": covid.TotalDeaths,
                "TotalRecovered": covid.TotalRecovered,
                "ActiveCase": covid.TotalConfirmed - (covid.TotalRecovered + covid.TotalDeaths)
            },
            date: dataDate
        })

    }

    
    render() {
        var Stats = Object.keys(this.state.result).map((key, index) =>{
            return <WorldStats 
                key = {index}
                about = {key}               
                total = {<NumberFormat value={this.state.result[key]} thousandSeparator={true} displayType="text"/>}
            />
        })

        var dateStat = JSON.stringify(this.state.date)
        // var onlyDate = dateStat.substring(1, 11);


        return (
            <div className="Global">
                <h1 className="heading">Covid-19 Tracker</h1>
                <p className="description">Information About Covid-19</p>
                <h1 className="DateStat">Date : 
                    <Moment format="DD/MM/YYYY">
                        <span>{dateStat}</span>
                    </Moment>
                </h1>

                <div className="word-stats">
                    
                    {Stats}
                </div>
            </div>
        )
    }

}
