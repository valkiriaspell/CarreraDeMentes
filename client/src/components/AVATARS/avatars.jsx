import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { getAvatars } from "../../redux/actions";
import "../STYLES/avatars.css"
import Carousel from "react-elastic-carousel";
import Item from "./item.js";

function Avatars({setAvatar}){        
    const [avatarSelected, setAvatarhere] = useState(false)  
  
    
    const {avatars} = useSelector(state => state);
    
    console.log(avatars, "aqui avatars")
    
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 350, itemsToShow: 2 },
        { width: 568, itemsToShow: 3 },
        { width: 800, itemsToShow: 4 },      
    ];   
    
const handleAvatar = (currentAvatar, currentIndex) => {
    console.log(currentIndex+1,"currentindex")
    setAvatar(currentIndex+1)
    
}
    return (
        <div>
            <Carousel breakPoints={breakPoints} pagination={false} onChange={(currentAvatar, currentIndex) => handleAvatar(currentAvatar, currentIndex)}>
                {avatars?.map(a => 
                <Item key={a.id}><div key={a.id} id= {a.id}  className="itemAvatar"><img key={a.id} src={a.imageUrl} alt={a.id}></img></div></Item>)}         
        </Carousel>
                
        </div>
    )
}

export default Avatars;