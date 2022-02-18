import React, { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { AdminNewsService } from "../service";
import { IPaginatedBody, IGetShortNewsResponse, IShortNewsVM } from "../types";

import Loader from "../../../common/loader";
import { Popconfirm, Table, TableProps } from "antd";
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import { toast } from "react-toastify";

const AdminNewsList = () => {
  const { fetchNews, fetchNewsCategories, setNewsUpdate } = useActions();
  const service = new AdminNewsService();
  const { news, isUpdate } = useTypedSelector((x) => x.adminNews);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    {
      title: "Картинка",
      dataIndex: "imagePath",
      width: "20%",
      render: (url: string) => (
        <img
          src={`/Images/${url ? url : "/default/noImage.jpg"}`}
          alt="Картинка не знайдена"
        ></img>
      ),
    },
    {
      title: "Заголовок",
      dataIndex: "title",
      sorter: (a: IShortNewsVM, b: IShortNewsVM) => a.title > b.title,
    },
    {
      title: "Категорія",
      dataIndex: "categoryName",
    },
    {
      title: "Дата добавлення",
      dataIndex: "date",
      render: (date: Date) => <span>{dateFormat(date, "yyyy-mm-dd")}</span>,
      sorter: (a: IShortNewsVM, b: IShortNewsVM) => a.date > b.date,
    },
    {
      title: "Дії",
      dataIndex: "actions",
      render: (a: any, record: IShortNewsVM) => (
        <Popconfirm title="Sure?" onConfirm={() => console.log(record)}>
          Delete
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    if (!news || news?.news.length == 0 || isUpdate) {
      handleNewsFetch();
    }
  }, []);

  const handleNewsFetch = async () => {
    try {
      setLoading(true);
      const paginatedBody: IPaginatedBody = { pageCount: 1, pageSize: 10 };
      await fetchNews(paginatedBody);
      await fetchNewsCategories();
      setLoading(false);
    } catch (ex) {
      if (axios.isAxiosError(ex)) {
        toast.error(ex.message);
      }
      toast.error(ex as string);
    }
  };
  return (
    <div className="adminNewsList">
      {loading && <Loader />}
      <h1>News list</h1>
      <Table
        size="large"
        //@ts-ignore
        columns={columns}
        //@ts-ignore
        dataSource={news?.news}
        rowKey="slug"
        pagination={false}
      />
    </div>
  );
};
export default AdminNewsList;
