import axios from "axios";
import { IDisco } from "../types/crud";

export const getDiscData = async (token: string): Promise<IDisco[]> => {
  try {
    const response = await axios.get(
      "https://6484f21dee799e3216272712.mockapi.io/disquera/disco",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateDisc = async (token: string, data: IDisco) => {
  const response = await axios.put(
    `https://6484f21dee799e3216272712.mockapi.io/disquera/disco/${data.id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  const discos = getDiscData(token);
  return discos;
};

export const deleteDisc = async (
  token: string,
  id: number
): Promise<IDisco[]> => {
  await axios.delete(
    `https://6484f21dee799e3216272712.mockapi.io/disquera/disco/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const discos = getDiscData(token);
  return discos;
};

export const createDisc = async (
  token: string,
  data: IDisco
): Promise<IDisco[]> => {
  await axios.post(
    "https://6484f21dee799e3216272712.mockapi.io/disquera/disco",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const discos = getDiscData(token);
  return discos;
};
