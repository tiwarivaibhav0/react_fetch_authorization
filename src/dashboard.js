import {
  Button,
  Card,
  DataTable,
  Frame,
  Icon,
  Page,
  Select,
  TextField,
} from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { ArrowRightMinor } from "@shopify/polaris-icons";
import { Loading } from "@shopify/polaris";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selected2, setSelected2] = useState("10");
  const [total, setTotal] = useState("Loading....");
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Does Not Contains", value: "4" },
    { label: "Starts With", value: "5" },
    { label: "Ends With", value: "6" },
  ];

  const handleSelectChange2 = useCallback((value) => setSelected2(value), []);

  const options2 = [
    { label: 15, value: "15" },
    { label: 20, value: "20" },
    { label: 30, value: "30" },
  ];
  const [firstrow, setfirstrow] = useState(Array(8).fill("1"));
  const [firstrowInp, setfirstrowInp] = useState([
    ["user_id"],
    ["catalog"],
    ["username"],
    ["shops.email"],
    ["shopify_plan"],
    ["updated_at"],
    ["created_at"],
    ["shop_url"],
  ]);
  console.log(firstrow);
  const rows = useMemo(() => {
    let tempFirstRow = [];
    Array(8)
      .fill(0)
      .map((item, i) => {
        let firstRowContent = (
          <>
            {" "}
            <Select
              options={options}
              onChange={(d) => {
                firstrow[i] = d;
                setfirstrow([...firstrow]);
              }}
              value={firstrow[i]}
            />
            <TextField
              value={firstrowInp[i][1]}
              onChange={(e) => {
                firstrowInp[i][1] = e;
                setfirstrowInp([...firstrowInp]);
              }}
            />{" "}
          </>
        );
        tempFirstRow.push(firstRowContent);
      });
    return tempFirstRow;
  });

  const [selectedRows, setSelectedRows] = useState([]);
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
    firstrowInp.map((it, i) => {
      if (it[1])
        url.searchParams.append(`filter[${it[0]}][${firstrow[i]}]`, it[1]);
    });
    console.log(url);
    fetch(url, {
      headers: {
        accept: "application/json",
        authorization: "Bearer " + sessionStorage.getItem("apiKey"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.count);
        if (data.success) {
          setTotal(data.data.count);

          let tempRow = [];
          data.data.rows.map((it, i) => {
            tempRow.push([
              it.user_id,
              it.catalog,
              it.username,
              it.email,
              it.shopify_plan,
              it.updated_at,
              it.created_at,
              it.shop_url,
            ]);
          });
          setSelectedRows([...tempRow]);
          setLoading(false);
        } else {
          document.write("Error: Couldn't process your request");
          //
        }
      });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchhandler();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [page, selected2, firstrowInp]);

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
              rows={[rows, ...selectedRows]}
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
