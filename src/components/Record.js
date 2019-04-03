import React,{ Component } from 'react';

class Record extends Component {
    render(){
        return (
            <tr key={this.props.record.id}>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
            </tr>
        );
    }
}

export default Record;