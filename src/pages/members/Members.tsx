import React from "react";
import { useParams } from "react-router-dom";
import ToolLoader from "./ToolLoader";

export default function Members() {
  const { tool } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <ToolLoader tool={tool} />
    </div>
  );
}
