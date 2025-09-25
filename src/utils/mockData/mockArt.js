export const mockArt = [
  {
    _id: 1,
    title: "Sunset Dreams",
    description:
      "A vibrant exploration of color and light inspired by evening skies.",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://picsum.photos/400/400",
    ],
    original: {
      price: 800,
      sold: false,
      dimensions: "24x36 in",
    },
    print: {
      price: 60,
      dimensions: "12x18 in",
    },
  },
  {
    _id: 2,
    title: "Ocean Flow",
    description:
      "Abstract blues and greens that capture the movement of water.",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e"],
    original: {
      price: 1200,
      sold: true,
      dimensions: "30x40 in",
    },
    print: {
      price: 75,
      dimensions: "16x20 in",
    },
  },
  {
    _id: 3,
    title: "Crimson Energy",
    description: "Dynamic reds and textures representing raw emotion.",
    images: ["https://picsum.photos/200", "https://picsum.photos/300/200"],
    original: {
      price: 950,
      sold: false,
      dimensions: "20x30 in",
    },
    print: {
      price: 55,
      dimensions: "11x14 in",
    },
  },
];
