import AppDispatcher from './AppDispatcher.js';
import BankConstants from './BankConstants.js';


export function createAccount(){
    AppDispatcher.dispatch({
        type: BankConstants.CREATED_ACCOUNT,
        ammount: 0
    });
}

export function depositIntoAccount(ammount){
    AppDispatcher.dispatch({
        type: BankConstants.DEPOSITED_INTO_ACCOUNT,
        ammount: ammount
    });
}

export function withdrawFromAccount(ammount){
    AppDispatcher.dispatch({
        type: BankConstants.WITHDREW_FROM_ACCOUNT,
        ammount: ammount
    });
}


