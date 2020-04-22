import React from "react";
import Row from "./row";
import React, { useState } from "react";

export default function Greeting(props) {
  const [name, setName] = useState("name")

  function handleNameChange(e) {
    setName(e.target.value);
  }

  return (
    <section>
      <Row label="Name">
        <input value={name} onChange={handleNameChange} />
      </Row>
    </section>
  );
}
