import { BASE_URL } from "../constants";

// Fetch all exhibits
export const fetchExhibits = async () => {
  const res = await fetch(`${BASE_URL}/exhibits`);
  if (!res.ok) throw new Error("Failed to fetch exhibits");
  return res.json();
};

// Fetch a single exhibit by ID
export const fetchExhibitById = async (id) => {
  const res = await fetch(`${BASE_URL}/exhibits/${id}`);
  if (!res.ok) throw new Error("Failed to fetch exhibit");
  return res.json();
};

// Create a new exhibit
export const createExhibit = async (data) => {
  const res = await fetch(`${BASE_URL}/exhibits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create exhibit");
  return res.json();
};

// Update an exhibit
export const updateExhibit = async (id, data) => {
  const res = await fetch(`${BASE_URL}/exhibits/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update exhibit");
  return res.json();
};

// Delete an exhibit
export const deleteExhibit = async (id) => {
  const res = await fetch(`${BASE_URL}/exhibits/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete exhibit");
  return res.json();
};

// Optional: Add an artItem to an exhibit
export const addArtItemToExhibit = async (exhibitId, artItemId) => {
  const res = await fetch(`${BASE_URL}/exhibits/${exhibitId}/artItems`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artItemId }),
  });
  if (!res.ok) throw new Error("Failed to add art item to exhibit");
  return res.json();
};

// Optional: Remove an artItem from an exhibit
export const removeArtItemFromExhibit = async (exhibitId, artItemId) => {
  const res = await fetch(
    `${BASE_URL}/exhibits/${exhibitId}/artItems/${artItemId}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Failed to remove art item from exhibit");
  return res.json();
};
