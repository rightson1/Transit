import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
const getItem = (id) => axios.get(`/api/items`);
export const useItemQuery = (id) => {
  return useQuery("items", () => getItem(), {
    select: (data) => data.data,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });
};
const addItem = (category) => axios.post("/api/items", category);
export const useNewItem = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onSuccess: () => {
      queryClient.refetchQueries("items");
    },
  });
};

const getSingleItem = (id) => axios.get(`/api/items/single/${id}`);
export const useSingleItemQuery = (id) =>
  useQuery(["item", id], () => getSingleItem(id), {
    select: (data) => data.data,
    enabled: !!id,
    cacheTime: 1000 * 60 * 60,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 60 * 24,
    onSuccess: (data) => {
      console.log("single item", data);
    },
  });

const updateItem = ({ id, ...item }) => {
  return axios.put(`/api/items?id=${id}`, item);
};
export const useUpdateItem = (id) => {
  const queryClient = useQueryClient();
  return useMutation(updateItem, {
    onSuccess: () => {
      console.log("refetching");
      queryClient.refetchQueries(["item", id]), getSingleItem(id);
    },
  });
};
const deleteItem = (id) => axios.delete(`/api/items?id=${id}`);
export const useDeleteItem = (id) => {
  const queryClient = useQueryClient();
  return useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.refetchQueries("items"), getItem();
    },
  });
};
