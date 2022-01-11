import React from 'react'
import { Link,useParams } from 'react-router-dom'
import { IBlog, IParams,RootStore } from '../../utils/Type'
import {useDispatch ,useSelector}from'react-redux'

interface IProps{
    blog:IBlog
}
const CardSearch:React.VFC<IProps> = ({blog}) => {

    return (
        <div>
            
        </div>
    )
}

export default CardSearch
