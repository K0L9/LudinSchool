import React, { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { AdminNewsService } from "../service";
import { IPaginatedBody, IGetShortNewsResponse, IShortNewsVM } from "../types";

import Loader from "../../../common/loader";
import { Popconfirm, Table, Button } from "antd";
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import { toast } from "react-toastify";

const AdminNewsList = () => {
  const { fetchNews, fetchNewsCategories, setNewsUpdate } = useActions();
  const service = new AdminNewsService();
  const { news, isUpdate } = useTypedSelector((x) => x.adminNews);
  const { newsCategories } = useTypedSelector((x) => x.newsCategories);
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
      filters: newsCategories.map((x) => {
        return { text: x.name, value: x.name };
      }),

      onFilter: (value: string, record: IShortNewsVM) =>
        record.categoryName == value,
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
        <div className="buttonGroup">
          <Popconfirm
            title={`Ви впевнені що хочете видалити ${record.title}?`}
            onConfirm={() => console.log(record)}
          >
            <Button htmlType="button" type="default" className="buttonDanger">
              Видалити
            </Button>
          </Popconfirm>
          <Popconfirm
            title={`Ви впевнені що хочете видалити ${record.title}?`}
            onConfirm={() => console.log(record)}
          >
            <Button htmlType="button" type="default" className="buttonInfo">
              Редагувати
            </Button>
          </Popconfirm>
        </div>
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
