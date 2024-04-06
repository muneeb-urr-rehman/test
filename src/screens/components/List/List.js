import React, { useCallback } from "react";
import styles from ".//List.module.css";
import Card from "../Card/Card";
import { List } from "antd";

const Listx = (props) => {
  const renderItem = useCallback((item) => (
    <List.Item>
      <Card item={item} />
    </List.Item>
  ));
  return (
    <div className={styles.row}>
      {/* {
                props?.options?.map((item , index) => {
                    return (
                        <Card item={item} index={index} />
                    );
                })
            } */}

      <List
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={props?.options?.length > 0 ? props?.options : []}
        renderItem={renderItem}
      />
    </div>
  );
};

export default Listx;
