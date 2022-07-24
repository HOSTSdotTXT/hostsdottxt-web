import { useEffect } from "react";
import { RequireAuth, useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

export default function Zones() {
  const auth = useAuth();

  const { data, loading, error } = useFetch("/api/v1/zones", {
    headers: {
      Authorization: auth.token,
    },
  });

  if (loading) {
    return (
      <RequireAuth>
        <h1>Available Zones</h1>
        <h2>Loading zones...</h2>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <h1>Available Zones</h1>
      {data.map((zone) => {
        return <a href={"/zones/"+zone.id}>{zone.id}</a>;
      })}
    </RequireAuth>
  );
}
