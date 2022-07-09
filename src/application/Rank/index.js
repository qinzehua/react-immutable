import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterIndex, filterIdx } from "../../api/utils";
import { getRankList } from "./store";
import Loading from "../../baseUI/loading";
import { List, ListItem, SongList, Container } from "./style";
import Scroll from "../../baseUI/scroll/index";
import { useNavigate, Outlet } from "react-router-dom";

function Rank(props) {
  const rankList = useSelector((state) => {
    return state.getIn(["rank", "rankList"]);
  });
  const loading = useSelector((state) => {
    return state.getIn(["rank", "loading"]);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRankList());
  }, []);

  let rankListJS = rankList ? rankList.toJS() : [];
  let globalStartIndex = filterIndex(rankListJS);
  let officialList = rankListJS.slice(0, globalStartIndex);
  let globalList = rankListJS.slice(globalStartIndex);

  const navigate = useNavigate();
  const enterDetail = (detail) => {
    navigate(`/rank/${detail.id}`);
  };

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item) => {
          return (
            <ListItem
              key={item.id}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            {" "}
            官方榜{" "}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {" "}
            全球榜{" "}
          </h1>
          {renderRankList(globalList, true)}
          {loading ? <Loading></Loading> : null}
        </div>
      </Scroll>
      <Outlet />
    </Container>
  );
}
export default React.memo(Rank);
