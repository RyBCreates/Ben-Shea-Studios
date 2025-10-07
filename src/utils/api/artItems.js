import { BASE_URL } from "../constants";

export const fetchArtItems = async () => {
  const res = await fetch(`${BASE_URL}/items`);
  if (!res.ok) throw new Error("failed to fetch art items");
  return res.json();
};

export const fetchArtItemById = async (id) => {
  const res = await fetch(`${BASE_URL}/items/${id}`);
  if (!res.ok) throw new Error("failed to fetch art item");
  return res.json();
};

export const createArtItem = async (data) => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create the art item");
  return res.json();
};

export const updateArtItem = async (id, data) => {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update the art item");
  return res.json();
};

export async function deleteArtItem(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete art item");
  return res.json();
}
export async function markOriginalSold(id) {
  const res = await fetch(`${BASE_URL}/${id}/sell-original`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to mark item as sold");
  return res.json();
}
