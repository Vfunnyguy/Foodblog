import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/alertType'
interface IProps {
    symbol:string
    body: string | string[]
    bgColor: string
  }
const Toast = ({symbol, body, bgColor}: IProps) => {
    const dispatch = useDispatch()
    const handleClose = () => {
      dispatch({ type: ALERT, payload: {} })
    }
    
    return (
        <div className={`snackbar ${bgColor}`}>
        <div className="symbol"onClick={handleClose}>{symbol}</div>
        <div className="msg">{
          typeof(body) === 'string'
             ? body
             : <ul className='toast-ul'>
               {
                 body.map((text, index) => (
                   <li key={index}>{text}</li>
                 ))
               }
             </ul>
           }
           </div>
        
      </div>
    )
}

export default Toast
