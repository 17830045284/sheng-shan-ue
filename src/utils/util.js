import * as XLSX from "xlsx";
import dayjs from "dayjs";
// 对时间做处理
function convertExcelDateFormat(defaultValue, columnName) {
  if (columnName?.endsWith("Time")) {
    return dayjs(dayjs(defaultValue).valueOf() + 43200).format(
      "YYYY-MM-DD HH:mm:ss",
    );
  } else if (["analysisReason", "checkSuggestion"].includes(columnName)) {
    return defaultValue.replace(/\n/g, "<br>");
  }
  return defaultValue;
}
// 加载excel文件
export function loadXLSX(path, name) {
  return new Promise((resolve, reject) => {
    fetch(path)
      .then((value) => {
        return value.blob();
      })
      .then((result) => {
        let reader = new FileReader();
        reader.readAsBinaryString(result);
        reader.onload = (e) => {
          const data = e.target.result;
          const excelFile = XLSX.read(data, {
            type: "binary",
            cellDates: true, //设为true，将天数的时间戳转为时间格式
          });
          // <表/所有>
          let total = [];
          for (let i = 0; i < excelFile.SheetNames.length; i++) {
            const sheets = XLSX.utils.sheet_to_json(
              excelFile.Sheets[excelFile.SheetNames[i]],
              { raw: true },
            );
            total = sheets.map((item) => {
              item.value = convertExcelDateFormat(item.value, item.key);
              return item;
            });
          }
          reader.abort();
          reader = null;
          resolve({ name, data: total });
        };
      });
  });
}
