import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen,
} from "./store/actionCreators";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";

function Player(props) {
  const fullScreen = useSelector((state) =>
    state.getIn(["player", "fullScreen"])
  );
  const playing = useSelector((state) => state.getIn(["player", "playing"]));
  const currentSong1 = useSelector((state) =>
    state.getIn(["player", "currentSong"])
  ).toJS();
  const showPlayList = useSelector((state) =>
    state.getIn(["player", "showPlayList"])
  );
  const mode = useSelector((state) => state.getIn(["player", "mode"]));
  const currentIndex = useSelector((state) =>
    state.getIn(["player", "currentIndex"])
  );
  const playList = useSelector((state) =>
    state.getIn(["player", "playList"])
  ).toJS();
  const sequencePlayList = useSelector((state) =>
    state.getIn(["player", "sequencePlayList"])
  ).toJS();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlayingDispatch(data) {
    dispatch(changePlayingState(data));
  }
  function toggleFullScreenDispatch(data) {
    dispatch(changeFullScreen(data));
  }
  function togglePlayListDispatch(data) {
    dispatch(changeShowPlayList(data));
  }
  function changeCurrentIndexDispatch(index) {
    dispatch(changeCurrentIndex(index));
  }
  function changeCurrentDispatch(data) {
    dispatch(changeCurrentSong(data));
  }
  function changeModeDispatch(data) {
    dispatch(changePlayMode(data));
  }
  function changePlayListDispatch(data) {
    dispatch(changePlayList(data));
  }

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const currentSong = {
    al: {
      picUrl:
        "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
    },
    name: "木偶人",
    ar: [{ name: "薛之谦" }],
  };
  return (
    <div>
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        playing={playing}
        toggleFullScreen={toggleFullScreenDispatch}
        clickPlaying={clickPlaying}
      />
      <NormalPlayer
        song={currentSong}
        fullScreen={fullScreen}
        playing={playing}
        toggleFullScreen={toggleFullScreenDispatch}
        clickPlaying={clickPlaying}
      />
    </div>
  );
}

export default React.memo(Player);
