import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Video from '../../video/Video'
import Category from '../../category/Category';
import { useDispatch, useSelector } from 'react-redux';
import { getpopularvideos,getvideosByCategory } from '../../../redux/action/video.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../skeleton/SkeletonVideo';


export default function Homescreen() {
    const dispatch = useDispatch();
    const { videos, activeCategory,loading } = useSelector(state => state.homeVideos)   

    useEffect(() => {
        dispatch(getpopularvideos())
    }, [dispatch])
    

    const fetchData = ()=>{
        if(activeCategory === 'All')
            dispatch(getpopularvideos());    
        else
            dispatch(getvideosByCategory());
    }
    return (
        <Container>
            <Category />
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={<div className="spinner-border text-danger d-block mx-auto"></div>}
                className="row">
                <Row>
                    {!loading ?
                        videos.map((vid) => (

                            <Col lg={3} md={4}>
                                <Video key={vid.id} video={vid} />
                            </Col>
                        ))
                        : [...Array(20)].map(()=> <Col lg={180} md={4}><SkeletonVideo /></Col>)
                    }
                </Row>
            </InfiniteScroll>
        </Container>
    )
}
