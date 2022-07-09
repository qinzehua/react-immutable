import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forceCheck } from "react-lazyload";
import Slider from "../../components/slider";
import RecommendList from "../../components/list";
import Scroll from "../../baseUI/scroll";
import { Content } from "../../components/list/style";
import * as actionTypes from "./store/actionCreators";
import Loading from "../../baseUI/loading/index";

function Recommend(props) {
  const bannerList = useSelector((state) => {
    return state.getIn(["recommend", "bannerList"]);
  });
  const recommendList = useSelector((state) =>
    state.getIn(["recommend", "recommendList"])
  );
  const enterLoading = useSelector((state) =>
    state.getIn(["recommend", "enterLoading"])
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionTypes.getBannerList());
    dispatch(actionTypes.getRecommendList());
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
    </Content>
  );
}

export default React.memo(Recommend);
