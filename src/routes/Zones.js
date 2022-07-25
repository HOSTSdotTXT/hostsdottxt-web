import { styled } from "@stitches/react";
import { useEffect } from "react";
import { RequireAuth, useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

const Card = styled("div", {
  padding: "16px 48px",
  border: "1px solid black",
  flexBasis: "100%",
});

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
        <div style={{ padding: "0px 32px" }}>
          <h1>Available Zones</h1>
          <h2>Loading zones...</h2>
        </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <div style={{ padding: "0px 32px" }}>
        <h1>Available Zones</h1>
        <div style={{ display: "flex" }}>
          {data.map((zone) => {
            return (
              <a href={"/zones/" + zone.id}>
                <Card>{zone.id}</Card>
              </a>
            );
          })}
        </div>
      </div>
    </RequireAuth>
  );
}
