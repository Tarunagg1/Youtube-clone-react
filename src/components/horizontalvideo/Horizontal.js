
import React, { useEffect, useState } from 'react'
import './_horizontal.scss'

import { AiFillEye } from 'react-icons/ai'

import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import request from '../../Api'


export default function Horizontal({video}) {
    const history = useHistory();

    const [views, setviews] = useState(null)
    const [duration, setduration] = useState(null);
    const [channelicon, setchannelicon] = useState(null)
    const {id,snippet:{title,channelId,channelTitle,description,publishedAt,thumbnails}} = video;

    useEffect(() => {
        const get_videos_details = async () => {
            const { data: { items } } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: id.videoId
                }
            });
            setduration(items[0].contentDetails.duration);
            setviews(items[0].statistics.viewCount)
        }
        get_videos_details();
    }, [id.videoId])

    const runvideo = ()=>{
        history.push('/watch/'+id.videoId);
    }
    
    useEffect(() => {
        const get_channel_icon = async () => {
            const { data: { items } } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId
                }
            });
            setchannelicon(items[0].snippet.thumbnails.default.url)
        }
        get_channel_icon();
    }, [channelId])

    


    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss');


    return (
        <Row className='py-2 m-1 videoHorizontal align-items-center' onClick={runvideo}>
            <Col
                xs={6}
                md={4}
                className='videoHorizontal__left'>
                <LazyLoadImage
                    src={thumbnails.medium.url}
                    effect='blur'
                    className='videoHorizontal__thumbnail'
                    wrapperClassName='videoHorizontal__thumbnail-wrapper'
                />
                <span className="video__duration">{_duration}</span>

            </Col>
            <Col
                xs={6}
                md={6}
                className='p-0 videoHorizontal__right'>
                <p className='mb-1 videoHorizontal__title'>{title}</p>

                <div className='videoHorizontal__details'>
                    <AiFillEye /> {numeral(views).format('0.a')} Views •
                        {moment(publishedAt).fromNow()}
                </div>

                <p className='mt-1 videoHorizontal__desc'>{description}</p>

                <div className='my-1 videoHorizontal__channel d-flex align-items-center'>
                    {/* <LazyLoadImage src={channelicon} effect='blur' /> */}

                    <p className='mb-0'>{channelTitle}</p>
                </div>
            </Col>
        </Row>
    )
}
