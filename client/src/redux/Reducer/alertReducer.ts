import {ALERT}from '../types/alertType'
import {IAlert}from '../../utils/Type'
 const alertReducer=(state:IAlert={},action:any):IAlert=>{
    switch(action.type){
        case ALERT:
            return action.payload
        default:
            return state

    }
}
export default alertReducer