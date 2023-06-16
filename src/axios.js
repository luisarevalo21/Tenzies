import axios from "axios";

export default axios.create({
  baseURL: "https://tenzies-b03c1-default-rtdb.firebaseio.com/",
});
export const fetchRecords = async () => {
  return axios.get("https://tenzies-b03c1-default-rtdb.firebaseio.com/records.json").then(data => {
    const arr = [];

    for (let key in data.data) {
      arr.push({ ...data.data[key], id: key });
    }

    return arr;
  });
  // .then(data => data);
};

export const postNewRecord = async data => {
  //   console.log("data inside post record", data);
  const res = await axios.post("https://tenzies-b03c1-default-rtdb.firebaseio.com/records.json", data);
  console.log(res);
};
