import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";

export const useDcsCommand = () => {
  const [submitting, setSubmitting] = useState(false);
  const [responses, setResponses] = useState([]);

  const submitCommand = async (command) => {
    try {
      setSubmitting(true);
      const { data } = await axios.get("http://localhost:12080/api/", {
        params: { command: btoa(command) },
      });
      setResponses([...responses, [new Date().toISOString(), data]]);
      showNotification({
        message: "Successfully Submitted",
        color: "green",
      });
    } catch (e) {
      showNotification({
        title: "Failed to Submit Command",
        message: e.toString(),
        color: "red",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { submitCommand, responses, submitting };
};
