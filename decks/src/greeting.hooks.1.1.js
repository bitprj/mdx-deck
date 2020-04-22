import React, { useState } from "react";
import Row from "./row";

export default function Greeting(props) {
  const name = useState("name")

  return (
    <section>
      <Row label="Name">
        <input value={name} />
      </Row>
    </section>
  );
}
