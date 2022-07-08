import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import LazyLoad, { forceCheck } from 'react-lazyload';

import Horizen from '../../baseUI/horizen-item';
import Scroll from '../../baseUI/scroll';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, ListContainer, List, ListItem } from "./style";
import {
    getSingerList,
    getHotSingerList,
    changeEnterLoading,
    changePageCount,
    refreshMoreSingerList,
    changePullUpLoading,
    changePullDownLoading,
    refreshMoreHotSingerList
} from './store/actionCreators';

function Singers(props) {
    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHotSingerList())
    }, [])

    let handleUpdateAlpha = (val) => {
        setAlpha(val);
        dispatch(changePageCount(0));
        dispatch(changeEnterLoading(true));
        dispatch(getSingerList(category, val));
    }

    let handleUpdateCatetory = (val) => {
        setCategory(val);
        dispatch(changePageCount(0));
        dispatch(changeEnterLoading(true));
        dispatch(getSingerList(val, alpha));
    }

    const handlePullUp = () => {
        // pullUpRefreshDispatch(category, alpha, category === '', pageCount);
    };

    const handlePullDown = () => {
        // pullDownRefreshDispatch(category, alpha);
    };

    const singerList = useSelector((state) => {
        return state.getIn(['singers', 'singerList'])
    })
    const singerListJS = singerList ? singerList.toJS() : []

    const RenderSingerList = () => {
        return (
            <List>
                {
                    singerListJS.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };

    return (
        <div>
            <NavContainer>
                <Horizen
                    list={categoryTypes}
                    title={"分类 (默认热门):"}
                    handleClick={(val) => handleUpdateCatetory(val)}
                    oldVal={category}></Horizen>
                <Horizen
                    list={alphaTypes}
                    title={"首字母:"}
                    handleClick={val => handleUpdateAlpha(val)}
                    oldVal={alpha}></Horizen>
            </NavContainer>
            <ListContainer>
                <Scroll 
                    pullUp={handlePullUp}  
                    
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}>
                    <RenderSingerList />
                </Scroll>
            </ListContainer>
        </div>
    )
}

export default React.memo(Singers);