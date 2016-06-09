import {EventEmitter} from 'events';
import AppDispatcher from './AppDispatcher.js';
import BankConstants from './BankConstants.js';

class BankBalanceStore extends EventEmitter{
    constructor(){
        super();
        this.balance=0;
    }
    getState(){
        return {balance: this.balance}
    }

    handleActions(action){
        switch(action.type){
            case BankConstants.CREATED_ACCOUNT:
                this.balance=0;
                this.emit('change');
                break;

            case BankConstants.DEPOSITED_INTO_ACCOUNT:
                this.balance = this.balance + action.ammount;
                this.emit('change');
                break;

            case BankConstants.WITHDREW_FROM_ACCOUNT:
                this.balance = this.balance - action.ammount;
                this.emit('change');
                break;
        }
    }
}


const bankBalanceStore = new BankBalanceStore;
AppDispatcher.register(bankBalanceStore.handleActions.bind(bankBalanceStore));


export default bankBalanceStore;