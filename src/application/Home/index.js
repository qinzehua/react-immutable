import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import Player from "../Player";
import { Top, Tab, TabItem } from "./style";

function Home(props) {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeclassname="selected">
          <TabItem>
            <span> 推荐 </span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeclassname="selected">
          <TabItem>
            <span> 歌手 </span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeclassname="selected">
          <TabItem>
            <span> 排行榜 </span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
      <Player />
    </div>
  );
}

export default React.memo(Home);
