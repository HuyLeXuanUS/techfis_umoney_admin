import { useEffect, useState } from "react";
import { Table } from "antd";
import { apiGetUsers } from "../../services/network/user_api";
import { render } from "@testing-library/react";

const AccountManage = () => {
  const [dataSource, setDataSource] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await apiGetUsers();
      if (response && response.data) {
        setDataSource(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (text, record) => `${record.firstname} ${record.lastname}`, 
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      align: "right",
      render: (roles) => roles.join(', '), 
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (text, record) => `${record.amount.toLocaleString()} ${record.userCurrency}`,

    },
  ];
  
  return (
    <div className="">
      <div className="flex flex-row h-fit gap-10">
        <div className="flex flex-col w-1/3 gap-2">
          <label htmlFor="start-date" className="font-semibold">
            Full Name
          </label>
          <input
            type="text" placeholder="Full Name"
            className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-slate-700"
          />
        </div>
        <div className="flex flex-col justify-end items-end ">
          <button className="flex flex-col justify-end items-end px-8 py-3 h-fit bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg focus:outline-none font-semibold">Search</button>
        </div >

      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        className="pt-10"
      />
    </div>
  );
}

export default AccountManage
