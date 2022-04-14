import axios from 'axios'


export const getList = async () => {
    const { data } = await axios.get(`/amount/get-list`);
    return data;
}

export const getById = async (id) => {
  const { data } = await axios.get(`/amount/get-by-id?`, { params: { Id: id }});
  return data;
}

export const create = async (amount) => {
  const { data } = await axios.post(`amount/create`, { Amount: amount });
  return data;
}

export const edit = async (params) => {
  const { data } = await axios.put(`amount/edit`, { Id: params.id, Amount: params.amount });
  return data;
}


export const coinCalcApi = {
  getList,
  getById,
  create,
  edit
};