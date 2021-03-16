import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { getVideosByChannel } from '../../../redux/action/video.action';

export default function Subscriptionscreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideosByChannel());
    }, [dispatch])
    return (
        <div>
            <h1>iju</h1>
        </div>
    )
}
