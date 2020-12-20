import './Countries.css'
import React, { Component } from 'react'
import axios from 'axios'
import ArraySort from 'array-sort'
import NumberFormat from 'react-number-format'

import HeadingNames from '../../components/HeadingNames/HeadingNames'
import CounrtryDetails from '../../components/CountryDetails/CountryDetails'
import Spinner from '../../components/Spinner/Spinner'

export default class Countries extends Component {

    state = {
        countryDetails: [],
        searchedCountries: []
    }
    
    async componentDidMount(){
        var data = await axios.get("https://api.covid19api.com/summary")
        var countryDetails = data.data.Countries
        countryDetails = ArraySort(countryDetails, 'TotalConfirmed', {reverse: true})

        this.setState({countryDetails: countryDetails, status: true, selectedData: countryDetails})
    }

    ChangeSortValue = e => {
        const value = e.target.value
        let sortByReverse = true;

        if(value == "Hightest"){
            sortByReverse = true
        } else {
            sortByReverse = false;
        }

        let countryDetails = ArraySort(this.state.countryDetails, 'TotalConfirmed', {reverse: sortByReverse})

        this.setState({countryDetails: countryDetails, status: true})
    }

    ChangeSortByDeath = e => {
        const value = e.target.value
        let sortByReverse = true;

        if(value == "Hightest"){
            sortByReverse = true
        } else {
            sortByReverse = false;
        }

        let countryDetails = ArraySort(this.state.countryDetails, 'TotalDeaths', {reverse: sortByReverse})

        this.setState({countryDetails: countryDetails, status: true})

    }

    ChangeSortByRecover = e => {
        const value = e.target.value
        let sortByReverse = true;

        if(value == "Hightest"){
            sortByReverse = true
        } else {
            sortByReverse = false;
        }

        let countryDetails = ArraySort(this.state.countryDetails, 'TotalRecovered', {reverse: sortByReverse})

        this.setState({countryDetails: countryDetails, status: true})
    }

    searchCountry = e => {
        const value = e.target.value
        const countryDetails = this.state.countryDetails

        var FindSpecificCountry = []

        if(value){
            countryDetails.map(function(cur, index) {
                const finder = cur.Country.toLowerCase().search(value.toLowerCase())
                if(finder !== -1) {
                    FindSpecificCountry.push(countryDetails[index])
                }
            })

            FindSpecificCountry = ArraySort(FindSpecificCountry, 'TotalConfirmed', {reverse:true})
            this.setState({searchedCountries: FindSpecificCountry})

        } else {
            this.setState({countryDetails: countryDetails})
        }

        if(value.length === 0) {
            this.setState({selectedData: this.state.countryDetails})
        } else {
            this.setState({selectedData: this.state.searchedCountries})
        }

    }

    render() {

        const ChangeNumberToFormat = function(val) {
            return <NumberFormat value={val} thousandSeparator= {true} displayType="text" />
        }

        var countriesList = this.state.countryDetails.length > 0 ?
        this.state.selectedData.map(function(cur, index) {

            return  <CounrtryDetails
                        key = {index}
                        countryCode = {cur.CountryCode}
            
                        totalCases = {cur.TotalConfirmed > 0 ? ChangeNumberToFormat(cur.TotalConfirmed) : 'unreported'}
                        newCases = {cur.NewConfirmed > 0 ? ChangeNumberToFormat(cur.NewConfirmed) : 'unreported'}

                        totalDeaths = {cur.TotalDeaths > 0 ? ChangeNumberToFormat(cur.TotalDeaths) : 'unreported'}
                        newDeaths = {cur.NewDeaths > 0 ? ChangeNumberToFormat(cur.NewDeaths) : 'unreported'}

                        totalRecovered = {cur.TotalRecovered > 0 ? ChangeNumberToFormat(cur.TotalRecovered) : 'unreported'}
                        newRecovered = {cur.NewRecovered > 0 ? ChangeNumberToFormat(cur.NewRecovered) : 'unreported'}

                    />
        }) : null

        return (
            <div className="countries-stats">
                <h2 className="countries-stats-heading">Countries Stats</h2>
                <div className="Sort">
                    <div className="grid-container">
                        <div class="grid-item">
                            <label>Cases sort</label>
                            <select className="sort-by" onChange={this.ChangeSortValue}>
                                <option>Hightest</option>
                                <option>Lowest</option>
                            </select>   
                        </div>
                        <div class="grid-item">
                            <label>Deaths sort</label>
                            <select className="sort-by" onChange={this.ChangeSortByDeath}>
                                <option>Hightest</option>
                                <option>Lowest</option>
                            </select>   
                        </div>
                        <div class="grid-item">
                            <label>Recovered sort</label>
                            <select className="sort-by" onChange={this.ChangeSortByRecover}>
                                <option>Hightest</option>
                                <option>Lowest</option>
                            </select>   
                        </div>
                    </div>

                </div>
                <div className="Filtering">
                    <input type="text" placeholder="Enter Counrtry Name" onChange={this.searchCountry}/>
                    {/* <select className="sort-by" onChange={this.ChangeSortValue}>
                        <option>Hightest</option>
                        <option>Lowest</option>
                    </select>                     */}
                    <div className="slider-container">
                        <div className="slider">
                            <HeadingNames />

                            {this.state.countryDetails.length < 1 ? <Spinner/> : null}
                            {countriesList}
                        </div>
                    </div>

                    
                </div>
            </div>
        )
    }
}
