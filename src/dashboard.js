import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  DataTable,
  Frame,
  Icon,
  Link,
  Page,
  Select,
  useBreakpoints,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { ArrowRightMinor } from "@shopify/polaris-icons";
import { Loading } from "@shopify/polaris";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Equals");
  const [page, setPage] = useState(1);
  const [selected2, setSelected2] = useState("10");
  const [total, setTotal] = useState("Loading....");
  const [loading, setLoading] = useState(false);

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Equals", value: "Equals" },
    { label: "Not Equals", value: "Not Equals" },
  ];

  const handleSelectChange2 = useCallback((value) => setSelected2(value), []);

  const options2 = [
    { label: 15, value: "15" },
    { label: 20, value: "20" },
    { label: 30, value: "30" },
  ];
  const rows = [
    [
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />,
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />,
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />,
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />,
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />,
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />,
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />,
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />,
    ],
  ];
  const [selectedRows, setSelectedRows] = useState(rows);

  const fetchhandler = () => {
    setLoading(true);
    var data = {
      activePage: page,
      count: selected2,
    };
    var url = new URL(
      "https://fbapi.sellernext.com/frontend/admin/getAllUsers/"
    );
    for (let k in data) {
      url.searchParams.append(k, data[k]);
    }

    // console.log(url);
    fetch(url, {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("apiKey"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.count);
        setTotal(data.data.count);
        if (data.success) {
          let tempRow = [...rows];
          data.data.rows.map((it, i) => {
            let tempArr = [];
            tempArr.push(it.user_id);
            tempArr.push(it.catalog);
            tempArr.push(it.username);
            tempArr.push(it.email);
            tempArr.push(it.shopify_plan);
            tempArr.push(it.updated_at);
            tempArr.push(it.created_at);
            tempArr.push(it.shop_url);
            tempRow.push(tempArr);
          });
          setSelectedRows([...tempRow]);
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    fetchhandler();
  }, [page, selected2]);
  var res;
  return (
    <>
      <div className="logo">Dashboard</div>
      <div className="logout">
        {" "}
        <a href="#" onClick={() => navigate("/")}>
          SignOut
        </a>
      </div>
      <div className="dashboard">
        <Page
          title={`Showing from ${(res =
            (page - 1) * Number(selected2) + 1)} to ${
            res + Number(selected2 - 1)
          } of ${total} Users`}
        >
          <Card sectioned>
            <Page>
              {" "}
              <div className="btns">
                <Button
                  onClick={() => {
                    setPage((prev) => prev - 1);
                  }}
                  disabled={page === 1 ? 1 : 0}
                >
                  <Icon source={ArrowLeftMinor} color="base" />
                </Button>
                <span>Results</span>
                <Button
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                >
                  <Icon source={ArrowRightMinor} color="base" />
                </Button>
                <Select
                  options={options2}
                  onChange={handleSelectChange2}
                  value={selected2}
                  placeholder="Rows per page"
                />
              </div>
            </Page>

            <Page>
              <Button interactive destructive>
                View Columns
              </Button>
            </Page>
          </Card>
        </Page>
        <Page>
          <Card>
            {loading && (
              <div className="App">
                <Button loading></Button>
              </div>
            )}
            <DataTable
              columnContentTypes={[
                "text",
                "numeric",
                "numeric",
                "numeric",
                "numeric",
                "numeric",
                "numeric",
                "numeric",
              ]}
              headings={[
                "userId",
                "Catalog",
                "Shop domain",
                "Shop email",
                "Shop plan name",
                "Updated at",
                "Created at",
                "Shops myshopify domain",
              ]}
              rows={selectedRows}
            />
            {loading && (
              <>
                <div style={{ height: "100px" }}>
                  <Frame>
                    <Loading />
                  </Frame>
                </div>
              </>
            )}
          </Card>
        </Page>
      </div>
    </>
  );
};
