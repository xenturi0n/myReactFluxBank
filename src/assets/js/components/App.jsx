import React, { Component } from 'react';
import {render} from 'react-dom';

import bankBalanceStore from '../flux/BankBalanceStore.js';
import * as BankActions from '../flux/BankActions.js';

class App extends Component{
    constructor(){
        super();
        BankActions.createAccount();
        this.state = bankBalanceStore.getState();
        this.counter=0;
    }

    componentDidMount(){
        bankBalanceStore.on('change', this.handleStoreChange.bind(this));
    }

    handleStoreChange(){
        this.setState(bankBalanceStore.getState());
    }

    deposit(){
        BankActions.depositIntoAccount(Number(this.refs.cantidad.value));
    }

    withdraw(){
        BankActions.withdrawFromAccount(Number(this.refs.cantidad.value));
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-4">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                Your Balance is <span class="label label-danger">{this.state.balance}</span>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <input type="text" 
                                               className="form-control" 
                                               placeholder="Cantidad" 
                                               ref="cantidad"
                                               onChange={()=>{console.log("change")}}/>
                                    </div>                                    
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="btn-group" role="group">

                                            <button type="button" 
                                                    className="btn btn-danger" 
                                                    onClick={this.withdraw.bind(this)}>
                                                Retirar
                                            </button>

                                            <button type="button" 
                                                    className="btn btn-success" 
                                                    onClick={this.deposit.bind(this)}>
                                                Depositar
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;