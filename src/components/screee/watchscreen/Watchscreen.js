import React,{useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import Videometadata from '../../videometadata/Videometadata';
import Horizontal from '../../horizontalvideo/Horizontal';
import './_watchscreen.scss';
import Comments from '../../comments//Comments';
import { useParams } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { getrelatedvideos, getvideobyid } from '../../../redux/action/video.action';


export default function Watchscreen() {
    const {id} = useParams();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getvideobyid(id));
        dispatch(getrelatedvideos(id));
    }, [dispatch , id])
    
    const {video,loading} = useSelector(state => state.selectvideo);
    const {relatedVideos} = useSelector(state => state.releatedVideo);
    // console.log(relatedVideos);
    return (
        <div>
            <Row>
                <Col lg={12}>
                    <div className="watchScreen__player">
                        <iframe src={`https://www.youtube.com/embed/${id}`} frameBorder='0' title={video?.snippet?.title} allowFullScreen width="100%" height="100%">
                        </iframe>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={8}>
                    {
                        loading === false ? <Videometadata video={video} videoid={id} /> : <h2>Loading...</h2>
                    }
                    <Comments totalComments={video?.statistics?.commentCount} videoId={id} />
                </Col>
                <Col lg={4} className="mt-4">
                    {
                       !loading && relatedVideos?.filter(video => video.snippet).map((video) => <Horizontal key={video.id.videoId} video={video} />)
                    }
                </Col>

            </Row>
        </div>
    )
}
