import { useEffect, useState } from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

const getCommand = (item) => `
local function getMeta (data) 
    local meta = {}

    for k,v in pairs(data) do
        local t = type(v)

        if t == 'string' or t == 'number' or t == 'nil' or t == 'boolean' then
            meta[k] = v
        else
            meta[k] = type(v)
        end
    end
    return meta
end

return getMeta(${item})
`;

export const useExplorer = (item) => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      setFetching(true);
      const { data } = await axios.get("http://localhost:12080/api", {
        params: { command: btoa(getCommand(item)) },
      });
      setData(data);
      showNotification({
        message: "Success",
        color: "green",
      });
    } catch (e) {
      showNotification({
        title: "Failed",
        message: e.toString(),
        color: "red",
      });
    } finally {
      setFetching(false);
    }
  };

  return { data, fetchData, fetching, clearData: () => setData(undefined) };
};
