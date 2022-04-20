import React from "react";
import { useSelector } from "react-redux";
import "../STYLES/avatars.css"
import Carousel from "react-elastic-carousel";
import Item from "./item.js";


function Avatars({setAvatar}){     
    
    
    const {avatars} = useSelector(state => state);
    
      const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 350, itemsToShow: 2 },
        { width: 568, itemsToShow: 3 },
        { width: 800, itemsToShow: 4 },      
    ];   
    
const handleAvatar = (currentAvatar, currentIndex) => {    
    setAvatar(currentAvatar.item.children.key)
    
}
    return (
        <div>
            <Carousel breakPoints={breakPoints} pagination={false} onChange={(currentAvatar, currentIndex) => handleAvatar(currentAvatar, currentIndex)}>
                {avatars?.map(a => 
                <Item key={a.id}><div key={a.id} id= {a.id}  className="itemAvatar"><img  width={150} height={150} key={a.id} src={a.imageUrl} alt={a.id}></img></div></Item>)}         
        </Carousel>
                
        </div>
    )
}

export default Avatars;