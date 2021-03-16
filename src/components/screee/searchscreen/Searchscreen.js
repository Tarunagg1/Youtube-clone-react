import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { getvideosBySearch } from '../../../redux/action/video.action';
import { Container } from 'react-bootstrap';
import Horizontal from '../../horizontalvideo/Horizontal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


export default function Searchscreen() {    const query = useParams();

    const dispatch = useDispatch();
    const {loading,searchVideos} = useSelector(state => state.searchVideo);

    useEffect(() => {
       dispatch(getvideosBySearch(query.id));
    }, [query,dispatch])

    return (
        <Container>
        {!loading ? (
            searchVideos?.map(video => (
              <Horizontal
                 video={video}
                 key={video.id.videoId}
                 searchScreen
              />
           ))
        ) : (
           <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
              <Skeleton width='100%' height='160px' count={20} />
           </SkeletonTheme>
        )}
     </Container>
    )
}
