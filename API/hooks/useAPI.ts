import { useState } from "react";
import { API_BASE_URL } from "../constacts";

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async (endpoint: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      return data;
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const post = async (endpoint: string, body: object) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { get, post, loading, error };
};
