import React from 'react'
import moment from 'moment'
import './_comment.scss';

export default function Comment({Comment:{authorDisplayName,authorProfileImageUrl,textDisplay,updatedAt}}) {
    return (
        <div className="comment p-2 d-flex">
            <img src={authorProfileImageUrl} alt='avatar' className='mr-3 rounded-circle' />
            <div className='comment__body'>
            <p className='mb-1 comment__header'>
               {authorDisplayName} • {moment(updatedAt).fromNow()}
            </p>
            <p className='mb-0'>{textDisplay}</p>
         </div>
        </div>
    )
}
