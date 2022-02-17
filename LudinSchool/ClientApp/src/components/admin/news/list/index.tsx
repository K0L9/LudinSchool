import React, { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { NewsService } from "./service";
import { IPaginatedBody, IGetShortNewsResponse, IShortNews } from "./types";

import Loader from "../../../common/loader";
import { Popconfirm, Table, TableProps } from "antd";
import dateFormat, { masks } from "dateformat";

const AdminNewsList = () => {
  const { fetchNews, fetchNewsCategories } = useActions();
  const service = new NewsService();
  const [newsPage, setNewsPage] = useState<IGetShortNewsResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    {
      title: "Image",
      dataIndex: "imagePath",
      width: "20%",
      render: (url: string) => (
        <img src={`/Images/${url ? url : "/default/noImage.jpg"}`}></img>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a: IShortNews, b: IShortNews) => a.title > b.title,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
    },
    {
      title: "Date added",
      dataIndex: "date",
      render: (date: Date) => <span>{dateFormat(date, "yyyy-mm-dd")}</span>,
      sorter: (a: IShortNews, b: IShortNews) => a.date > b.date,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (a: any, record: IShortNews) => (
        <Popconfirm title="Sure?" onConfirm={() => console.log(record)}>
          Delete
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetchNewsCategories();
    const paginatedBody: IPaginatedBody = { pageCount: 1, pageSize: 10 };
    service.fetchNews(paginatedBody).then((response) => {
      setNewsPage(response);
      setLoading(false);
    });
  }, []);
  console.log("A: ", newsPage?.news);
  return (
    <div className="adminNewsList">
      {loading && <Loader />}
      <h1>News list</h1>
      <Table
        size="large"
        //@ts-ignore
        columns={columns}
        //@ts-ignore
        dataSource={newsPage?.news}
        rowKey="slug"
        pagination={false}
      />
    </div>
  );
};
export default AdminNewsList;
