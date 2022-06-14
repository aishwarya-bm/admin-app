import React from "react";

export function TableTopActions() {
  return (
    <section className="actions-top">
      <input type="text" value="" onChange={e => {}} placeholder="Search by name, email or role..." />
      <button>Delete selected</button>
    </section>
  );
}
