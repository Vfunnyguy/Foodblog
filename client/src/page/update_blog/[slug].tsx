import React from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from '../../utils/Type'
import Createblog from '../create_blog'
const Update = () => {
    const {slug}=useParams<IParams>()
    return (
        <div className='update_page'>
           <section className="update_content">
               <div className="update_body">
                <Createblog id={slug}/>
               </div>
           </section>
        </div>
    )
}

export default Update
