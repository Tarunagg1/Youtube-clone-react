import React, { useEffect, useState } from 'react'
import { AiFillEye } from "react-icons/ai"
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral'
import request from '../../Api';
import './_video.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';



export default function Video({ video }) {

    const [views, setviews] = useState(null)
    const [duration, setduration] = useState(null);
    const [channelicon, setchannelicon] = useState(null)

    const { id, snippet: { channelId, channelTitle, publishedAt, title, thumbnails: { medium: { url } } } } = video;
   
    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')
    
    const history = useHistory()

    const _videoId = id?.videoId || id

    const handelClick = ()=>{
        history.push(`/watch/`+_videoId);
    }

    useEffect(() => {
        const get_videos_details = async () => {
            const { data: { items } } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: _videoId
                }
            });
            setduration(items[0].contentDetails.duration);
            setviews(items[0].statistics.viewCount)
        }
        get_videos_details();
    }, [_videoId])

    
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

    

    return (
        <>
            <div className="video" onClick={handelClick}>
                <div className="video__top">
                    <LazyLoadImage src={url} effect="blur" />
                    <span className="video__duration">{_duration}</span>
                </div>
                <p className="video__title">
                    {title}
                </p>
                <div className="video__details">
                    <span>
                        <AiFillEye /> {numeral(views).format("0.a")} Views •{" "}
                    </span>
                    <span className="px-2">{moment(publishedAt).fromNow()}</span>
                </div>
                <div className="video__channel">
                    <LazyLoadImage src={channelicon} effect="blur" />
                    <p>{channelTitle}</p>
                </div>
            </div>
        </>
    )
}
