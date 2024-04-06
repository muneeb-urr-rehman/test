import { LoadingOutlined } from "@ant-design/icons";
import { Divider, Skeleton, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input/Input";
import List from "../components/List/List";
import { clearData } from "../redux/actions/appAction";
import { AppMiddleware } from "../redux/middlware/AppMiddleware";
import styles from "./Home.module.css";

const Home = () => {
  const [search, setsearch] = useState("");
  const [location, setlocation] = useState("");
  // const [Loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  let timeout = useRef(null);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 70, color: "blueviolet" }} spin />
  );
  const usersList = useSelector((state) => state.AppReducer?.Users);
  const paginateCount = useSelector((state) => state.AppReducer?.paginateCount);

  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setSkip(skip + 1);
    dispatch(
      AppMiddleware.getUsers(
        skip + 1,
        location ? location : undefined,
        search ? search : undefined
      )
    )
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      dispatch(clearData());
      loadMoreData();
    }, 1000);
  }, [search, location]);

  return (
    <div>
      <div className={styles.upper_view}>
        <div className={styles.sub_div}>
          <h2 className={styles.heading}>Users</h2>
          <div style={{ display: "flex" }}>
            <Input
              placeholder={"Search user ..."}
              value={search}
              onChange={(e) => {
                setSkip(0);
                setsearch(e.target.value);
              }}
            />
            <Input
              placeholder={"Search location ..."}
              value={location}
              onChange={(e) => {
                setSkip(0);
                setlocation(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* {loading ? (
        <div className={styles.loader}>
          <Spin indicator={antIcon} />
        </div>
      ) : ( */}
        <div
          id="scrollableDiv"
          style={{
            height: "75vh",
            marginBottom: "20px",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            dataLength={usersList?.length}
            next={loadMoreData}
            hasMore={usersList?.length < paginateCount}
            loader={<Skeleton loading={loading} avatar paragraph={{ rows: 4 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List options={usersList} />
          </InfiniteScroll>
        </div>
      {/* )} */}
    </div>
  );
};

export default Home;
