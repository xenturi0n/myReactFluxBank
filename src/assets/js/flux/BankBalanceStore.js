import {EventEmitter} from 'events';
import AppDispatcher from './AppDispatcher.js';
import BankConstants from './BankConstants.js';

class BankBalanceStore extends EventEmitter{
    constructor(){
        super();        
        this.state={
            balance: 0,
            inputAmmountValue: '',
            inputAmmountValidationMessage: '',
            inputAmmountIsValid: true
        };
    }

    getState(){
        return this.state;
    }

    validateInputAmmount(ammount){
        if(isNaN(ammount)){
            return false;
        }else{
            return true;
        }
    }

    handleActions(action){
        let valid = undefined;
        switch(action.type){
            case BankConstants.CREATED_ACCOUNT:
                this.state.balance=0;
                this.emit('change');
                break;

            case BankConstants.DEPOSITED_INTO_ACCOUNT:
                if (this.validateInputAmmount(this.state.inputAmmountValue)){
                    this.state.inputAmmountValidationMessage= "";
                    this.state.inputAmmountIsValid=true;
                    this.state.balance = Number(this.state.balance) + Number(this.state.inputAmmountValue);
                    this.emit('change');
                }
                break;

            case BankConstants.WITHDREW_FROM_ACCOUNT:
                valid = this.validateInputAmmount(this.state.inputAmmountValue);
                
                if (valid){
                    if(Number(this.state.balance) - Number(this.state.inputAmmountValue)<0){
                        this.state.inputAmmountValidationMessage= "El saldo es insuficiente para retirar esta cantidad";
                        this.state.inputAmmountIsValid=false;
                        this.emit('change');
                    }else {
                        this.state.inputAmmountValidationMessage= "";
                        this.state.inputAmmountIsValid=true;
                        this.state.balance = Number(this.state.balance) - Number(this.state.inputAmmountValue);
                        this.emit('change');
                    }                    
                }
                break;

            case BankConstants.INPUT_AMMOUNT_CHANGED:
                this.state.inputAmmountValue= Number(action.ammount);

                valid= this.validateInputAmmount(Number(action.ammount));
                this.state.inputAmmountValidationMessage= valid ? '' : "Debes introducir un numero valido";
                this.state.inputAmmountIsValid= valid ? true : false;

                this.emit('change');
                break;
        }
    }
}


const bankBalanceStore = new BankBalanceStore;
AppDispatcher.register(bankBalanceStore.handleActions.bind(bankBalanceStore));


export default bankBalanceStore;