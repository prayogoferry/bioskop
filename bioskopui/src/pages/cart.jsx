import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {Table,ModalHeader,ModalBody,ModalFooter,Modal} from 'reactstrap'
import {url} from '../components/url'
import {Button, ButtonGroup} from 'reactstrap'
import Numeral from 'numeral'

class Cart extends Component {
    state = {
        datacart:[],
        modaldetail:false,
        indexdetail:0,
        modalhistori:false,
        bayar:false
    }


    componentDidMount(){
        Axios.get(`${url}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
        .then((res)=>{
            var datacart=res.data
            var qtyarr=[]
            console.log(res.data)
            res.data.forEach(element => {
                qtyarr.push(Axios.get(`${url}ordersDetails?orderId=${element.id}`))
            });
            var qtyarrfinal=[]
            console.log(qtyarr)
            Axios.all(qtyarr)
            .then((res1)=>{
                res1.forEach((val)=>{
                    qtyarrfinal.push(val.data)
                })
                console.log(qtyarrfinal)
                var datafinal=[]
                datacart.forEach((val,index)=>{
                    datafinal.push({...val,qty:qtyarrfinal[index]})
                })
                console.log(datafinal)
                this.setState({
                    datacart:datafinal
                })
            }).catch((err)=>{

            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    totalharga=()=>{
        var total=0
        this.state.datacart.map((val)=>{
            return total+=val.totalharga
        })
        total='Rp.'+Numeral(total).format('0,0')+',00'
        return total
    }

    // onCheckout=(index)=>{
    //     this.setState({bayar:true})
    //     datacart.push({bayar})
    //     Axios.post(`${url}transaction`, datacart)
    //     .then((res)=>{

    //     })
        
    // }


    renderCart=()=>{
        if(this.state.datacart!==null){
            if(this.state.datacart.length===0){
                return (<tr>
                    <td>belum ada barang di Cart</td>
                </tr>)
            }
            return this.state.datacart.map((val,index)=>{
                return(
                    <tr key={index}>
                        <td style={{width:100}}>{index+1}</td>
                        <td style={{width:300}}>{val.movie.title}</td>
                        <td style={{width:100}}>{val.jadwal}</td>
                        <td style={{width:100}}>{val.qty.length}</td>
                        <td style={{width:100}}>{'Rp. '+Numeral(val.totalharga).format('0,0')+',00'}</td>
                        <td style={{width:100}}>

                        <ButtonGroup>
                        <Button color='primary'  onClick={()=>this.setState({modaldetail:true,indexdetail:index})}>Detail</Button>
                         <Button color='secondary'>CheckOut</Button>
                         <Button color='danger'>Cancel</Button>
                        </ButtonGroup>

                           
                            </td>
                        
                    </tr>
                )  
            })
        }
    }
    render() {
        if(this.props.UserId){
            return (

                // modaldetailstart
                <div>
                    <Modal isOpen={this.state.modaldetail} toggle={() => {  this.setState({ modaldetail: false }); }}>
                
                <ModalHeader>Details</ModalHeader>
                <ModalBody>
                  <Table >
                    <tbody>
                      <tr>
                        <th>No.</th>
                        <th>Seat</th>
                      </tr>
                    </tbody>

                    <tbody>
                      {this.state.datacart !== null && this.state.datacart.length !== 0//data bukan null dan panjang data bukan 0
                        ? this.state.datacart[this.state.indexdetail].qty.map((val, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{"abcdefghijklmnopqrstuvwxyz".toUpperCase()[val.row] + [val.seat + 1]}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>

                  </Table>
                </ModalBody>
              </Modal>

              {/* modalhistoristart */}

              {/* <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}> */}



                    <center style={{marginBottom:'450px'}}>
                        <Table style={{width:1000}} >
                            <thead>
                                <tr>
                                    <th style={{width:100}}>No.</th>
                                    <th style={{width:100}}>Title</th>
                                    <th style={{width:100}}>Jadwal</th>
                                    <th style={{width:100}}>Jumlah</th>
                                    <th style={{width:100}}>Total Harga</th>
                                    <th style={{width:100}}>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot>
                                <tr>
                                <td>Total Keseluruhan</td>
                                <td></td>
                                <td></td>
                                <td>{this.totalharga()}</td>
                                <td></td>
                                </tr>
                            </tfoot>
                        </Table>
                       
                    </center>
                </div>
              );
        }
        return(
            <div>Loading</div>
        )
    }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login,
        UserId:state.Auth.id
    }
}
export default connect(MapstateToprops) (Cart);