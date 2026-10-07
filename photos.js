/*
  LASTPIXELL photo catalog

  To add a gallery photograph:
  1. Put its web-sized image in the images/ folder.
  2. Copy one object in the gallery array and add it before the closing ].
  3. Change the image path and the details you know. Keep a comma between objects.

  Categories: architecture, people, places.
  Optional layout: "wide" or "offset". Omit it for the standard frame.
  Leave unknown camera settings blank or write "Not recorded". Never guess.
*/
window.PORTFOLIO_PHOTOS = {
  featured: {
    image: "images/DSC01614 (1).jpg",
    title: "Trimbak",
    alt: "Snow covered mountains fade into mist above a dark stand of pines",
    location: "Trimbakeshwar",
    camera: "Sony ZV E10 M2",
    lens: "18–55 mm",
    focalLength: "50 mm",
    aperture: "f/5.6",
    shutterSpeed: "1/100 s",
    iso: "ISO 2000",
    description: "Snow, cloud, and pine hold their distance. The longer you look, the quieter the valley becomes.",
    credit: "Vinayak Singh Judev",
    collectionLabel: "LATEST COLLECTION / MARCH 2025",
    kicker: "LATEST FIELD FRAME / ०१",
    headline: "Where the mountain",
    headlineAccent: "keeps its silence.",
    imageLabel: "ZERO / BLACK / WHITE",
    note: "FIELD NOTES · MOUNTAIN / MIST / MORNING"
  },

  gallery: [
    {
      image: "images/PXL_20241130_110319598.jpg",
      title: "Maheshwar and Eshwar",
      caption: "The temple above the steps",
      category: "architecture",
      location: "Maheshwar",
      camera: "Pixel 7A",
      lens: "",
      focalLength: "",
      aperture: "",
      shutterSpeed: "",
      iso: "",
      alt: "Carved stone temple and stepped forecourt with visitors in the foreground",
      description: "A carved stone temple built by Mata Ahilyadevi rises above a busy flight of steps. The broad facade holds its quiet geometry amid the movement below.",
      credit: "Vinayak Singh Judev"
    },
    {
      image: "images/DSC03416.jpg",
      title: "A passage in gold",
      caption: "A passage in gold",
      category: "people",
      location: "India",
      camera: "ZV E10 M2",
      lens: "",
      focalLength: "48mm",
      aperture: "5.6",
      shutterSpeed: "1/200",
      iso: "200",
      alt: "Ornate carved arches repeating along an Indian architectural passage",
      description: "A old tree with a lot of wisdom.",
      credit: "Vinayak Singh judev"
    },
    {
      image: "images/DSC01467.JPG",
      title: "Faces at Vijay Mandir",
      caption: "Faces in the old stone",
      category: "architecture",
      location: "Vidisha",
      camera: "Sony H300",
      lens: "",
      focalLength: "",
      aperture: "",
      shutterSpeed: "",
      iso: "",
      alt: "Weathered sculpted figures in a stone relief behind soft green leaves",
      description: "A weathered band of carved figures emerges from shadow, softened by the bright leaves in the foreground.",
      credit: "Vinayak Singh Judev"
    },
    {
      image: "images/PXL_20240306_091550010.jpg",
      title: "Manikarnika",
      caption: "At the river's edge",
      category: "places",
      location: "Kashi",
      camera: "Pixel 7A",
      lens: "",
      focalLength: "",
      aperture: "",
      shutterSpeed: "",
      iso: "",
      alt: "A hazy riverfront with steps, people, and smoke rising against the morning sky",
      description: "Smoke drifts above the river steps as the morning gathers around the water and the people at its edge.",
      credit: "Vinayak Singh Judev",
      layout: "wide"
    },
    {
      image: "images/DSC00838 (1)~2.jpg",
      title: "A portrait in afternoon light",
      caption: "A portrait in afternoon light",
      category: "people",
      categoryLabel: "PEOPLE · REFERENCE",
      location: "Vidisha",
      camera: "Not recorded",
      lens: "",
      focalLength: "",
      aperture: "",
      shutterSpeed: "",
      iso: "",
      alt: "Reference portrait of a men in soft natural light; replace with your own photograph",
      description: "A reference portrait in soft, unhurried light.",
      credit: "Vinayak Singh judev"
    },
    {
      image: "images/PXL_20250314_031438191.jpg",
      title: "Holi morning",
      caption: "Holi morning at sangla holi festival",
      category: "places",
      location: "Sangla",
      camera: "Pixel 7A",
      lens: "",
      focalLength: "",
      aperture: "",
      shutterSpeed: "",
      iso: "",
      alt: "A soft morning Snow",
      description: "The snow leaves a fine bright line, then quietly takes it back.",
      credit: "Vinayak Singh judev"
      
    }
  ]
};
