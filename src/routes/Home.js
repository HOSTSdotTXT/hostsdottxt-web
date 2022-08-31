import Button from "../uikit/Button";

export default function Home() {
  return (
    <div>
      <h1>
        HOSTS<b>dot</b>TXT
      </h1>
      <Button primary onClick={() => (document.location = "/zones")}>
        Zones
      </Button>
    </div>
  );
}
