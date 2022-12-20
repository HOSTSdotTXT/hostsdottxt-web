import { useEffect, useState } from 'react'

export default function Home() {
  let [metrics, setMetrics] = useState()
  useEffect(() => {
    fetch('/api/v1/metrics')
      .then((resp) => resp.json())
      .then((resp) => setMetrics(resp))
  }, [])

  return (
    <div>
      <div>
        {metrics && metrics.count && (
          <p>
            Served {metrics.count} queries in the last 24 hours! 99% of those
            queries were served in under {(metrics.p99 / 1000).toPrecision(2)}ms
          </p>
        )}
      </div>
    </div>
  )
}
