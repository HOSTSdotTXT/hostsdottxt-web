import Button from "../uikit/Button";
import { useState, useEffect } from "react";

export default function Home() {
  let [metrics, setMetrics] = useState();
  useEffect(() => {
    fetch("/api/v1/metrics")
      .then((resp) => resp.json())
      .then((resp) => setMetrics(resp));
  }, []);

  return (
    <div>
      <Button primary onClick={() => (document.location = "/zones")}>
        Zones
      </Button>
      <div>
        {metrics != null && (
          <p>
            Served {metrics.count} queries in the last 24 hours! 99% of those
            queries were served in under {(metrics.p99 / 1000).toPrecision(2)}ms
          </p>
        )}
      </div>
    </div>
  );
}
