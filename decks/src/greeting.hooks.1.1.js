import React from "react";
import Row from "./row";
import React, { useState } from "react";

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
