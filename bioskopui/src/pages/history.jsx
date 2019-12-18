import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {Table,ModalHeader,ModalBody,ModalFooter,Modal} from 'reactstrap'
import {url} from '../components/url'
import {Button, ButtonGroup} from 'reactstrap'
import Numeral from 'numeral'

class History extends Component {
    state = { 
        datahistory:[],
        indexdetail:0,
        modaldetail:0
     }

     componentDidMount(){
        Axios.get(`${url}orders?_expand=movie&userId=${this.props.UserId}&bayar=true`)
        .then((res)=>{
            var datahistory=res.data
            console.log(res.data)
            
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() { 
        return (  
            <div>
                 <center style={{marginBottom:'450px'}}>
                        <Table style={{width:1000}} >
                            <thead>
                                <tr>
                                    <th style={{width:100}}>No.</th>
                                    <th style={{width:100}}>Tanggal</th>
                                    <th style={{width:100}}>Title</th>
                                    <th style={{width:100}}>Jam</th>
                                    <th style={{width:100}}>Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {this.renderfilm()} */}
                            </tbody>
                            <tfoot>
                                
                            </tfoot>
                        </Table>
                       
                    </center>

                
            </div>
        );
    }
}
 
export default History;