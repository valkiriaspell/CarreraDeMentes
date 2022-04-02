import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { getAvatars } from "../../redux/actions";
import "../STYLES/avatars.css"
import Carousel from "react-elastic-carousel";
import Item from "./item.js";

function Avatars({setAvatar}){        
    const [number, setNumber] = useState(0)  
  
    
    const {avatars} = useSelector(state => state);
    
    console.log(avatars, "aqui avatars")
    
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 350, itemsToShow: 2 },
        { width: 568, itemsToShow: 3 },
        { width: 800, itemsToShow: 4 },
      ];   
    

    return (
        <div>
            <Carousel breakPoints={breakPoints}>
                {avatars?.map(a => 
                <Item><button onClick={() => setAvatar(a.imageUrl)} className="itemAvatar"><div className="itemAvatar"><img key={a.id} src={a.imageUrl} alt={a.id}></img></div></button></Item>)}         
        </Carousel>
        </div>
    )
}

export default Avatars;