import React, { useState } from "react";
import {
  makeStyles,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import data from "./data";
import { Clear, Edit, Search } from "@material-ui/icons";
const useStyle = makeStyles({
  table: {
    background: "white",
    borderRadius: ".5rem",
  },
  tableHeader: {
    textAlign: "left",
    border: "1px solid #dddddd",
    background: "#004f9a",
    color: "white",
  },
  tableRow: {
    textAlign: "left",
    border: "1px solid #dddddd",
  },
  tablecell: {
    whiteSpace: "nowrap",
    textAlign: "left",
    padding: "12px 8px",
    border: "1px solid #dddddd",
  },
  tableContainer: {
    width: "100%",
    overflow: "auto",
  },
  editbutton: {
    color: "white",
  },
  bulkEditInput: {
    border: "2px solid black",
    "&:focus ": {
      outline: "none",
    },
    padding: "0",
  },
});
function Home() {
  const classes = useStyle();
  const [activeBulkEditRows, setActiveBulkEditRows] = useState([]);
  const [activeBulkEditCol, setActiveBulkEditCol] = useState("");
  const [bulkEditFrom, setBulkEditFrom] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const BulkEditCols = [
    "contact",
    "personalEmailAddress",
    "userID",
    "hardware",
    "configuredMachine",
    "batchAllocation",
    "shipmentLot",
    "hardwareStatus",
  ];
  const handleCheckbox = (id) => {
    let pos = activeBulkEditRows.indexOf(id);
    if (pos === -1) {
      activeBulkEditRows.push(id);
    } else {
      activeBulkEditRows.splice(pos, 1);
      delete bulkEditFrom[id];
    }
    setActiveBulkEditRows([...activeBulkEditRows]);
  };
  const buldEditInputHandler = (e, id) => {
    setBulkEditFrom({
      ...bulkEditFrom,
      [id]: {
        [e.target.name]: e.target.value,
      },
    });
  };
  return (
    <>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableHeader}>
              {Object.entries(data[0]).map((item, index) => {
                if (BulkEditCols.indexOf(item[0]) !== -1) {
                  return (
                    <th className={classes.tablecell} key={index}>
                      {item[0]}
                      <IconButton
                        className={classes.editbutton}
                        onClick={() => {
                          if (activeBulkEditCol === "") {
                            setActiveBulkEditCol(item[0]);
                          } else {
                            setActiveBulkEditCol("");
                            setBulkEditFrom({});
                            activeBulkEditRows([]);
                          }
                        }}
                      >
                        <Edit style={{ padding: "0" }} />
                      </IconButton>
                    </th>
                  );
                } else {
                  if (item[0] === "WMRCId") {
                    return (
                      <th className={classes.tablecell} key={index}>
                        {activeSearch === "WMRCId" ? (
                          <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        ) : (
                          item[0]
                        )}
                        <IconButton
                          className={classes.editbutton}
                          onClick={() => {
                            if (activeSearch === "") {
                              setActiveSearch("WMRCId");
                            } else {
                              setActiveSearch("");
                            }
                            setSearchValue("");
                          }}
                        >
                          {activeSearch === "WMRCId" ? <Clear /> : <Search />}
                        </IconButton>
                      </th>
                    );
                  } else if (item[0] === "startDate") {
                    return (
                      <th className={classes.tablecell} key={index}>
                        {activeSearch === "startDate" ? (
                          <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        ) : (
                          item[0]
                        )}
                        <IconButton
                          className={classes.editbutton}
                          onClick={() => {
                            if (activeSearch === "") {
                              setActiveSearch("startDate");
                            } else {
                              setActiveSearch("");
                            }
                            setSearchValue("");
                          }}
                        >
                          {activeSearch === "startDate" ? (
                            <Clear />
                          ) : (
                            <Search />
                          )}
                        </IconButton>
                      </th>
                    );
                  } else {
                    return (
                      <th className={classes.tablecell} key={index}>
                        {item[0]}
                      </th>
                    );
                  }
                }
              })}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((el) => {
                if (activeSearch === "WMRCId") {
                  return new RegExp("^" + searchValue, "i").test(el.WMRCId);
                } else {
                  return new RegExp("^" + searchValue, "i").test(el.startDate);
                }
                return true;
              })
              .map((row, index) => {
                return (
                  <tr className={classes.tableRow} key={index}>
                    {Object.entries(row).map((item, index) => {
                      if (index === 0) {
                        return (
                          <th
                            className={classes.tablecell}
                            style={{ minWidth: "100px" }}
                            key={index}
                          >
                            {activeBulkEditCol !== "" ? (
                              <Checkbox
                                checked={
                                  activeBulkEditRows.indexOf(item[1]) !== -1
                                }
                                onChange={() => handleCheckbox(item[1])}
                                style={{
                                  padding: "0",
                                  margin: "0",
                                  height: "1rem",
                                }}
                              />
                            ) : (
                              ""
                            )}
                            {item[1]}
                          </th>
                        );
                      } else {
                        return (
                          <th className={classes.tablecell} key={index}>
                            {activeBulkEditCol === item[0] &&
                            activeBulkEditRows.indexOf(row["WMRCId"]) !== -1 ? (
                              <input
                                type="text"
                                name={item[0]}
                                value={
                                  bulkEditFrom[row["WMRCId"]]
                                    ? bulkEditFrom[row["WMRCId"]][item[0]]
                                    : item[1]
                                }
                                onChange={(e) =>
                                  buldEditInputHandler(e, row["WMRCId"])
                                }
                                className={classes.bulkEditInput}
                              />
                            ) : (
                              item[1]
                            )}
                          </th>
                        );
                      }
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
