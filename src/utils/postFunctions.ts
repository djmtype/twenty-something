// sort by date
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort(
    (a: any, b: any) =>
      new Date(b.data.date && b.data.date).valueOf() -
      new Date(a.data.date && a.data.date).valueOf(),
  );
  return sortedArray;
};


// filter by status
export const filterByStatus = (array: any[]) => {
  const filteredArray = array.filter((item: any) => 
    item.data.status === "publish"
  );
  return filteredArray;
};
