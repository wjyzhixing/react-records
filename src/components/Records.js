import React, { Component } from 'react';
import Record from './Record';

class Records extends Component {
  constructor(){
    super();
    this.state = {
      records : [
        {
          "id":1,
          "date":"2019-04-03",
          "title":"收入",
          "amount":20
        },
        {
          "id":2,
          "date":"2019-04-04",
          "title":"大富翁",
          "amount":100
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <h2>Records</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
             {this.state.records.map((record,index)=><Record key={index} record={record} />)}
            </tbody>
          </table>
      </div>
    );
  }
}

export default Records;
