import React,{useState,useEffect} from 'react'
import Comment from '../comment/Comment';
import {useDispatch,useSelector} from 'react-redux';
import './_comments.scss';
import { addComment, getCommentsOfVideoById } from '../../redux/action/comment.action';

export default function Comments({videoId,totalComments}) {
   
   const [text,setText] = useState('');
   const dispatch = useDispatch();
  
  
   const handleComment= (e)=>{
      e.preventDefault();
      if(text === 0){
         return;
      }
      dispatch(addComment(videoId,text));
      setText('');
   }
   
   
   useEffect(() => {
      dispatch(getCommentsOfVideoById(videoId))
   }, [videoId,dispatch])

    const comments = useSelector(state => state.commentlist.comments);
    const _commets = comments?.map(com => com.snippet.topLevelComment.snippet);

    return (
        <div className='comments'>
        <p>{totalComments} Comments</p>
        <div className='my-2 comments__form d-flex w-100'>
           <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt='avatar' className='mr-3 rounded-circle' />
           <form onSubmit={handleComment} className='d-flex flex-grow-1'>
              <input
                 type='text'
                 className='flex-grow-1'
                 placeholder='Write a comment...'
                 value={text}
                 onChange={e => setText(e.target.value)}
              />
              <button className='p-2 border-0'>Comment</button>
           </form>
        </div>
        <div className='comments__list mt-4'>
           {
            _commets?.map((coment,i)=> (
               <Comment key={i}  Comment={coment} />
            ))
           }
        </div>
     </div>
    )
}
