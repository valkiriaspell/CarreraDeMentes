import React from "react";
import "../STYLES/home.modules.css";
import { BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";

function Social() {
  return (
    <div>
      <ul className="social-icons" id="prueba">
        <li>
          <a
            href="http://www.facebook.com/sharer.php?u=https://www.zoopertrivia.com/"
            target="blanck"
          >
            <i>
              <BsFacebook />
            </i>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.zoopertrivia.com/"
            target="blanck"
          >
            <i>
              <BsLinkedin />
            </i>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/intent/tweet?text=juega%20conmigo&url=https://www.zoopertrivia.com/&hashtags=ZooPerTrivia"
            target="blanck"
          >
            <i>
              <BsTwitter />
            </i>
          </a>
        </li>
        <li>
          <a
            href="https://api.whatsapp.com/send?text=https://www.zoopertrivia.com/"
            target="blanck"
          >
            <i>
              <BsWhatsapp />
            </i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Social;
