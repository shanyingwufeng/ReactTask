import React from "react";
import "./index.less";

function Table(props) {
    const column = props.column; // 表头
    const tableData = props.tableData; // 表格数据
    const operator = ["编辑", "删除"]; // 表格数据操作方式

    // operator: 判断是编辑还是删除操作
    // index: 判断点击的是哪一行数据
    const handleClick = (operator, index) => {
        props.operatorData(operator, index);
    };

    return (
        <table className="table">
            {/* 表头 */}
            <thead>
                <tr>
                    {column &&
                        column.map((item, index) => {
                            return (
                                <th key={item?.keyName || index}>
                                    {item?.valueName}
                                </th>
                            );
                        })}
                </tr>
            </thead>
            {/* 表格数据条数 */}
            <tbody>
                {tableData &&
                    tableData.map((item, index) => {
                        return (
                            <tr key={index}>
                                {column.map((_item, _index) => {
                                    return (
                                        <td key={_index}>
                                            {item[_item?.keyName]
                                                ? item[_item?.keyName]
                                                : operator.map(
                                                      (o_item, o_index) => {
                                                          return (
                                                              <span
                                                                  key={o_index}
                                                                  onClick={() =>
                                                                      handleClick(
                                                                          o_item,
                                                                          index +
                                                                              1
                                                                      )
                                                                  }
                                                              >
                                                                  {o_item}
                                                              </span>
                                                          );
                                                      }
                                                  )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}

export default Table;
