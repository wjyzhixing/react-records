import React, { Component } from 'react';
import Record from './Record';
//import $ from 'jquery';
//import axios from 'axios'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox';

class Records extends Component {
  constructor(){
    super();
    this.state = {
      error:null,
      isLoaded:false,
      records : []
    }
  }

  /*
  componentDidMount(){
    $.getJSON("http://5ca46b258bae720014a963f3.mockapi.io/api/v1/records").then(
      response => this.setState({
        records:response,
        idLoaded:true
    }),
      error => this.setState({
        idLoaded:true,
        error
      })
    )
  }
  */

  componentDidMount(){
    RecordsAPI.getAll().then(
      response => this.setState({
        records:response.data,
        idLoaded:true
    })
    ).catch(
      error => this.setState({
        idLoaded:true,
        error
      })
    )
  }

  addRecord(record){
    this.setState({
      error:null,
      isLoaded:false,
      records:[
        ...this.state.records,
        record
      ]
    })
  }

  updateRecord(record,data){
    // console.log(record)
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item,index)=>{
      if(index !== recordIndex){
        return item;
      }

      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records:newRecords
    })
  }

  deteleRecord(record){
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item,index) => index !== recordIndex);
    this.setState({
      records:newRecords
    })
  }

  credits(){
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    })

    return credits.reduce((prev,curr)=>{
      return prev + Number.parseInt(curr.amount,0)
    },0)
  }

  debits(){
    let credits = this.state.records.filter((record) => {
      return record.amount < 0;
    })

    return credits.reduce((prev,curr) => {
      return prev + Number.parseInt(curr.amount,0)
    },0)
  }

  balance(){
    return this.credits()+this.debits()
  }

  render() {
    const {error,records,isLoaded} = this.state;
    let recordsComponent;

    if(error){
      recordsComponent =  <div>Error:{error.responseText}</div>;
    }
    else if(isLoaded){
      recordsComponent = <div>Loading ...</div>
    }
    else{
      recordsComponent =  (
        <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
               {records.map((record,index)=>(
                <Record 
                  key={index} 
                  record={record} 
                  handleEditRecord={this.updateRecord.bind(this)} 
                  handleDeleteRecord={this.deteleRecord.bind(this)}
                />)
                )}
              </tbody>
            </table>
        </div>
      );
    }

    return (
      <div>
          <h2>Records</h2>
          <div className="row mb-3">
            <AmountBox text="Credit" type="success" amount={this.credits()} />
            <AmountBox text="Debit" type="danger" amount={this.debits()} />
            <AmountBox text="Balance" type="info" amount={this.balance()} />
          </div>
          <RecordForm handleNewRecord={this.addRecord.bind(this)}></RecordForm>
          {recordsComponent}
      </div>
    )
  }
}

export default Records;
