import React,{useState} from 'react'
import './_category.scss';
import {useDispatch} from 'react-redux'
import {getpopularvideos, getvideosByCategory} from '../../redux/action/video.action';

let keyword = [
    'All',
    'jquery',
    'ajax   ',
    'react',
    'html',
    'css',
    'javascript',
    'query',
    'php',
    "bootstrap",
    "sap",
    "asp",
    "c#",
    "vb.net",
    "cisco",
    "Cyber Security",
    "Ethical hacking",
    "Aws"
];

export default function Category() {
    const [ActiveElement, setActiveElement] = useState("All");
    const dispatch = useDispatch();

    const handelclick = (val)=>{
        setActiveElement(val);
        if(val === 'All')
            dispatch(getpopularvideos());
        else
            dispatch(getvideosByCategory(val));
    }

    return (
       <div className="categorybar">
           {
                keyword.map((val,i)=> (
                    <span className={ActiveElement === val ? "active" : ""} onClick={()=> handelclick(val)} key={i}>{val}</span>
                ))
           }
       </div>
    )
}
