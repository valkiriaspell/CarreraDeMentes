import React from "react";
import { useSelector } from "react-redux";
import s from "../STYLES/preGameRoom.module.css";
import corona from "../IMG/corona.png";
import Delete from "../IMG/x-button.png";
import readyDark from "../IMG/readyDark.png";
import readyGreen from "../IMG/readyGreen2.png";

const ListPlayers = ({ expelPlayer }) => {
  const { preRoomUsers, user } = useSelector((state) => state);

  function handleExpectPlayer(e) {
    //validate that player is not ready before to expel him out of the room
    const userToExpel = preRoomUsers?.users.findIndex(
      (user) => user.id === e.target.id
    );
    preRoomUsers?.users[userToExpel].ready !== true && expelPlayer(e);
  }

  return (
    <div className={s.containerPlayers}>
      <ul className={s.allPlayers}>
        {user?.host === true
          ? preRoomUsers?.users?.map((us) => {
              return (
                <div className={s.contentPlayer}>
                  <div className={s.contentAvatar}>
                    <img src={us?.avatars?.[0]?.imageUrl} alt="Avatar" />
                  </div>
                  <div>
                    <li key={`${us.id}2`}>
                      {user?.id !== us?.id && (
                        <button
                          id={us.id}
                          onClick={handleExpectPlayer}
                          key={`${us.id}3`}
                          className={s.buttonExpulsar}
                        >
                          <img src={Delete} alt="Delete" width={25} />
                        </button>
                      )}

                      {user?.id === us?.id && (
                        <div key={`${user.id}4`} className={s.coronaHost}>
                          <img src={corona} alt="corona" />
                        </div>
                      )}
                      <div
                        style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                      >
                        {us.name}
                      </div>
                      <div className={s.readyButton}>
                        {us.ready ? (
                          <img
                            key={us.id}
                            id={us.id}
                            src={readyGreen}
                            alt="ready"
                          />
                        ) : (
                          <img
                            key={us.id}
                            id={us.id}
                            src={readyDark}
                            alt="ready"
                          />
                        )}
                      </div>
                    </li>
                  </div>
                </div>
              );
            })
          : preRoomUsers?.users?.map((us) => {
              return (
                <li key={`${us.id}6`}>
                  {us.host === true && (
                    <div key={`${user.id}4`} className={s.coronaHost}>
                      <img src={corona} alt="corona" />
                    </div>
                  )}
                  <div key={`${us.id}7`}>{us.name}</div>
                  <img
                    src={us?.avatars?.[0]?.imageUrl}
                    alt="Avatar"
                    width={30}
                  />
                  {us.ready ? (
                    <img key={us.id} id={us.id} src={readyGreen} alt="ready" />
                  ) : (
                    <img key={us.id} id={us.id} src={readyDark} alt="ready" />
                  )}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default ListPlayers;
