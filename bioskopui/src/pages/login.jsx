import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom'
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import {connect} from 'react-redux'
import {LoginSuccessAction} from './../redux/actions'
import Loader from 'react-loader-spinner'

class Login extends Component {
    state = {
        error:'',
        loading:false
    }

    onLoginClick=()=>{
        var username=this.refs.username.value//mendapatkan value dari inputan
        var password=this.refs.password.value
        this.setState({loading:true})//saat proses loading diubah jadi true
        Axios.get(`${APIURL}users?username=${username}&password=${password}`)//axios get untuk mandapatkan data dri API data users yang mana username dan password dari input sama dengan dari API
        .then(res=>{//res adalah resut dari axios.get
            if(res.data.length){//jika res.data.length true
                localStorage.setItem(`${username}`,res.data[0].id)//username dan id data ke[0] dimasukan ke localstorage
                this.props.LoginSuccessAction(res.data[0])//id data dimasukan ke login succes
            }else{//jika tidak maka error
                this.setState({error:'salah masukin pass woy'})
            }
            this.setState({loading:false})//loading diubah jadi false
        }).catch((err)=>{//jika gagal maka error
            console.log(err)
            this.setState({loading:false})//loading diubah jadi true
        })
    }

    render() {
        if(this.props.AuthLog){
            return <Redirect to={'/'}/>
        } 
        return (
            <div>
                <div className=' mt-3 d-flex justify-content-center'>
                    <div style={{width:'500px',border:'1px solid black'}} className='rounded p-2'>
                        <h1>Login</h1>
                        <div className='p-1' style={{borderBottom:'1px solid black'}}>
                            <input type="text" className='username' style={{border:'transparent',width:'100%',fontSize:'20px'}} ref='username' placeholder='username bro'/>
                        </div>
                        <div className='p-1' style={{borderBottom:'1px solid black'}}>
                            <input type="password" className='username' style={{border:'transparent',width:'100%',fontSize:'20px'}} ref='password' placeholder='pass bro'/>
                        </div>
                        {this.state.error===''?
                            null
                            :
                            <div className="alert alert-danger mt-2">
                                {this.state.error} <span onClick={()=>this.setState({error:''})} className='float-right font-weight-bold'>X</span>
                            </div>
                    
                        }
                        <div className='mt-4'>
                            {this.state.loading?
                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                />
                                :
                                <button className='btn btn-primary' onClick={this.onLoginClick}>Login</button>
                            }
                        </div>
                        <div className='mt-2'>
                            belum ada akun ?<Link> Register </Link> aja mbak/mas
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login
    }
}


export default connect(MapstateToprops,{LoginSuccessAction}) (Login);