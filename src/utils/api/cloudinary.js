import { BASE_URL } from "../constants";

export async function uploadImages(files) {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await fetch(`${BASE_URL}/uploads/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();

  // Expecting: { success: true, imageUrls: [] }
  return data.imageUrls;
}
