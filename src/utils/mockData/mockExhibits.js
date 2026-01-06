export const mockExhibit = [
  {
    _id: 1,
    location: "Bar",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    description:
      "Our Downtown location features a modern collection of abstract and contemporary art.",
    address: "123 Main St. Atlanta, GA 30312",
    artItems: [
      {
        _id: "a1",
        title: "Sunset Study",
        images: ["https://picsum.photos/300/300?1"],
        original: { sold: false },
      },
      {
        _id: "a2",
        title: "Blue Figure",
        images: ["https://picsum.photos/300/300?2"],
        original: { sold: true },
      },
      {
        _id: "a3",
        title: "Urban Lines",
        images: ["https://picsum.photos/300/300?3"],
        original: { sold: false },
      },
    ],
  },
  {
    _id: 2,
    location: "cafe",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    description:
      "The Uptown exhibit showcases colorful and vibrant artworks by local artists.",
    address: "123 Main St. Atlanta, GA 30312",
    artItems: [
      {
        _id: "a1",
        title: "Sunset Study",
        images: ["https://picsum.photos/300/300?1"],
        original: { sold: false },
      },
      {
        _id: "a2",
        title: "Blue Figure",
        images: ["https://picsum.photos/300/300?2"],
        original: { sold: true },
      },
      {
        _id: "a3",
        title: "Urban Lines",
        images: ["https://picsum.photos/300/300?3"],
        original: { sold: false },
      },
    ],
  },
  {
    _id: 3,
    location: "gallery",
    image: "https://picsum.photos/600/400",
    description:
      "At our Midtown gallery, you'll find classical and traditional pieces, including portraits and landscapes.",
    address: "123 Main St. Atlanta, GA 30312",
    artItems: [
      {
        _id: "a1",
        title: "Sunset Study",
        images: ["https://picsum.photos/300/300?1"],
        original: { sold: false },
      },
      {
        _id: "a2",
        title: "Blue Figure",
        images: ["https://picsum.photos/300/300?2"],
        original: { sold: true },
      },
      {
        _id: "a3",
        title: "Urban Lines",
        images: ["https://picsum.photos/300/300?3"],
        original: { sold: false },
      },
    ],
  },
];
