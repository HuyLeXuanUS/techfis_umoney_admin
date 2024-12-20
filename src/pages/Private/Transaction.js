import { useEffect, useState } from "react";
import { Table } from "antd";
import { apiGetTransactions } from "../../services/network/transaction_api";

const Transaction = () => {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setpage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchTransactions = async () => {
    try {
      const response = await apiGetTransactions(page, pageSize);
      console.log("response", response.data.transactions);
      if (response && response.data) {
        setDataSource(response.data.transactions);
        setTotal(response.data.total);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, pageSize]);

  const handleFilter = () => {
    fetchTransactions();
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => id.substring(0, 10) + "...",
    },
    {
      title: "Sender Name",
      dataIndex: "senderName",
      key: "senderName",
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      key: "receiverName",
    },
    {
      title: "Send Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      align: "right",
      render: (amount) => `${amount.toLocaleString()}`,
    },
    {
      title: "Send Currency",
      dataIndex: "sendCurrency",
      key: "sendCurrency",
      align: "right",
    },
    {
      title: "Receive Amount",
      dataIndex: "receiveAmount",
      key: "receiveAmount",
      align: "right",
      render: (amount) => `${amount.toLocaleString()}`,
    },
    {
      title: "Receive Currency",
      dataIndex: "receiveCurrency",
      key: "receiveCurrency",
      align: "right",
    },
    {
      title: "Exchange Rate",
      key: "exchangeRate",
      align: "right",
      render: (_, record) =>
        `1 ${record.sendCurrency} = ${record.exchangeRate} ${record.receiveCurrency}`,
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      align: "right",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-row h-fit gap-10">
        <div className="flex flex-col w-1/3 gap-2">
          <label htmlFor="start-date" className="font-semibold">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-slate-700"
          />
        </div>

        <div className="flex flex-col w-1/3 gap-2">
          <label htmlFor="end-date" className="font-semibold">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-slate-700"
          />
        </div>
        <div className="flex flex-col justify-end items-end">
          <button
            onClick={handleFilter}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg focus:outline-none font-semibold"
          >
            Filter
          </button>
        </div>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        className="pt-10"
        pagination={{
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setpage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};

export default Transaction;
