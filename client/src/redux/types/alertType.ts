import{IAlert}from '../../utils/Type'

export const ALERT='ALERT'
export interface IAlertType{
    type:typeof ALERT
    payload:IAlert
}