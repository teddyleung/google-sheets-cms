const formatSheetDataRow = (data) => {
  if (data.length > 1) {
    const headers = data[0];
    const rows = data.slice(1);
    return rows.map(row => headers.reduce((rowObj, col, index) => {
      return { ...rowObj, [col]: row[index] };
    }, {}));
  } else {
    return [];
  }
};

const formatSheetDataCol = (data) => {
  if (data.length > 0) {
    return data.reduce((obj, row) => {
      if (!row[0]) {
        return obj;
      } else {
        return { ...obj, [row[0]]: row[1] || '' };
      }
    }, {})
  } else {
    return [];
  }
};

const formatSheetData = (data, dir) => {
  return dir === 'COL' ? formatSheetDataCol(data) : formatSheetDataRow(data);
};

module.exports = formatSheetData;