# LASTPIXELL — Photography portfolio

A responsive portfolio for Vinayak Singh Judev, built with plain HTML, CSS, and JavaScript. It is designed for GitHub Pages and needs no build step or paid hosting.

## Publish with GitHub Pages

1. Keep the site files in the root of the repository: `index.html`, `styles.css`, `script.js`, `photos.js`, and the `images/` folder.
2. Commit and push your changes to the repository's `main` branch.
3. In GitHub, open **Settings → Pages** and choose the deployment source configured for the repository. If the included workflow is present, choose **GitHub Actions**.
4. GitHub Pages will publish the site after the workflow completes. The live address appears in **Settings → Pages**.

## Add a photograph

All featured and gallery photo details live in **`photos.js`**. You no longer need to edit the gallery HTML to add a frame.

1. Add your photo file to the repository's `images/` folder. Use a short filename such as `first-light.jpg`.
2. Open `photos.js` and copy one photo object inside the `gallery` list.
3. Change its `image`, `title`, `caption`, `category`, `location`, `alt`, and `description` values. Fill in the camera fields only when you know them.
4. Save and commit. The gallery, category counts, frame numbers, hover location, and full-screen viewer update automatically.

Example entry (include a comma after the object when another entry follows it):

```js
{
  image: "images/first-light.jpg",
  title: "First light",
  caption: "The courtyard at first light",
  category: "architecture",
  location: "Your location",
  camera: "Camera body",
  lens: "35 mm f/1.4",
  focalLength: "35 mm",
  aperture: "f/1.4",
  shutterSpeed: "1/500 s",
  iso: "ISO 100",
  alt: "Warm light falls across a quiet stone courtyard",
  description: "A short note about the place, the light, or the moment.",
  credit: "Vinayak Singh Judev"
}
```

Use `architecture`, `people`, or `places` for `category`. Optional `layout` values are `wide` and `offset`; leave the field out for the standard frame. Use `categoryLabel` only when you want a custom label beside the image caption. For unknown camera details, leave the value as an empty string or set it to `"Not recorded"`—don't guess.

### Replace a current gallery image

Either keep the same filename and replace the file inside `images/`, or add the new file there and update that photo's `image` path in `photos.js`. Paths and filenames are case-sensitive on GitHub Pages, so match upper and lower case exactly. Use a web-sized copy (for example, JPEG or WebP) to keep pages quick to load. Before publishing, check that the photo is yours to share and remove embedded GPS information if you don't want to reveal where it was made.

Three gallery entries are still Unsplash reference images: **A passage in gold**, **A portrait in afternoon light**, and **Salt air**. Replace their `image` paths and descriptions in `photos.js` with your own photographs before presenting those frames as your work.

### Change the featured photograph

Edit the `featured` object at the top of `photos.js`. Change `image`, `alt`, `location`, `description`, and the headline and label fields to suit the new frame. Its camera settings are also shown in the full-screen viewer. The featured frame is counted alongside the gallery photographs.

### Replace the profile portrait

Add your portrait to `images/`, then update the image `src` in the profile card in `index.html`. The arched frame is created by the site's styles and stays in place. Update its `alt` text to describe the portrait.

## Photo fields

- `image`: path to the image in `images/` (or a complete public image URL)
- `title` and `caption`: title in the full-screen viewer and the short gallery caption
- `category`: `architecture`, `people`, or `places`
- `location`: shown on image hover and in the viewer; use `Location not listed` if preferred
- `alt`: a short, useful description for screen readers
- `description`: the note shown beside the full-size image
- `credit`: photographer or image source
- `camera`, `lens`, `focalLength`, `aperture`, `shutterSpeed`, `iso`: capture details shown in the viewer
- `layout`: optional gallery arrangement: `wide` or `offset`

## Useful files

- `photos.js` — featured photo and gallery catalog; edit this to add or update photos
- `images/` — photographs and portrait image
- `index.html` — page structure, profile portrait, and text outside the photo catalog
- `styles.css` — colors, layout, borders, responsive styling, and animation
- `script.js` — gallery rendering, filters, full-screen viewer, and motion
- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow, if enabled in the repository

The portfolio uses a warm paper palette with restrained vermilion details, Devanagari lettering, framed photographs, and subtle motion. Animations respect the visitor's reduced-motion setting.
