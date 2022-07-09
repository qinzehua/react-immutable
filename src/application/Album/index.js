import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CSSTransition } from "react-transition-group";
import { Container } from "./style";
import Header from "./../../baseUI/header/index";
import { useNavigate, useParams } from "react-router-dom";
import Scroll from "../../baseUI/scroll/index";
import { TopDesc, Menu, SongList, SongItem } from "./style";
import { getName, getCount, isEmptyObject } from "./../../api/utils";
import style from "../../assets/global-style";
import { changeEnterLoading, getAlbumList } from "./store/actionCreators";
import Loading from "../../baseUI/loading/index";

export const HEADER_HEIGHT = 45;

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const [title, setTitle] = useState("");
  const headerEl = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  let currentAlbumImm = useSelector((state) => {
    return state.getIn(["album", "currentAlbum"]);
  });
  const currentAlbum = currentAlbumImm ? currentAlbumImm.toJS() : {};

  const enterLoading = useSelector((state) => {
    return state.getIn(["album", "enterLoading"]);
  });

  useEffect(() => {
    const id = params.id;
    dispatch(changeEnterLoading(true));
    dispatch(getAlbumList(id));
  }, []);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    (pos) => {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = headerEl.current;
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );

  const RenderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {getCount(currentAlbum.subscribedCount)}
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const RenderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => {
        navigate(-1);
      }}
    >
      <Container>
        <Header
          ref={headerEl}
          handleClick={handleBack}
          isMarquee={isMarquee}
          title={title}
        ></Header>
        {enterLoading ? <Loading></Loading> : null}
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              <div>
                <RenderTopDesc />
                <RenderMenu />
              </div>
              <SongList>
                <div className="first_line">
                  <div className="play_all">
                    <i className="iconfont">&#xe6e3;</i>
                    <span>
                      {" "}
                      播放全部{" "}
                      <span className="sum">
                        (共 {currentAlbum.tracks.length} 首)
                      </span>
                    </span>
                  </div>
                  <div className="add_list">
                    <i className="iconfont">&#xe62d;</i>
                    <span>
                      {" "}
                      收藏 ({getCount(currentAlbum.subscribedCount)})
                    </span>
                  </div>
                </div>
                <SongItem>
                  {currentAlbum.tracks.map((item, index) => {
                    return (
                      <li key={index}>
                        <span className="index">{index + 1}</span>
                        <div className="info">
                          <span>{item.name}</span>
                          <span>
                            {getName(item.ar)} - {item.al.name}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </SongItem>
              </SongList>
            </div>
          </Scroll>
        ) : null}
      </Container>
    </CSSTransition>
  );
}
export default React.memo(Album);
