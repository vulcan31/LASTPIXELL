# LASTPIXELL — Photography portfolio

A responsive, text-led photography portfolio for Vinayak Singh Judev. It pairs a warm paper palette with restrained vermilion details, Devanagari lettering, framed image borders, a jharokha-inspired profile card, and subtle motion. The site is plain HTML, CSS, and JavaScript: no build step, packages, or paid hosting are required.

## Publish on GitHub Pages

1. Download and extract the ZIP, then place the **contents** directly in the root of your GitHub repository. `index.html` should sit beside `styles.css`, `script.js`, `README.md`, and the `images` folder.
2. Commit and push the files to the repository's `main` branch.
3. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source.
4. The included `.github/workflows/deploy.yml` publishes the site after each push to `main`. The live address appears under **Settings → Pages** after the first successful deployment.

There is no custom domain to configure. Keep the site files in the repository root so the included workflow can publish them as-is.

## Replace the photographs

The site uses relative image paths, so keep your photographs in the `images` folder beside `index.html`. To replace a current image, the easiest method is to use your own file but keep the exact existing filename. For example, replace `images/PXL_20250315_010025447.jpg` with your new landscape and it will appear in the featured section without editing the page.

The included photographs are:

| File | Where it appears |
| --- | --- |
| `images/PXL_20250315_010025447.jpg` | Featured latest collection image |
| `images/PXL_20241130_110319598.jpg` | Gallery: temple and steps |
| `images/DSC01467.JPG` | Gallery: carved stone detail |
| `images/PXL_20240306_091550010.jpg` | Gallery: riverfront |
| `images/portrait-placeholder.svg` | Profile portrait illustration; replace when ready |

Three remaining gallery photographs are credited as Unsplash reference images in the image viewer. Replace their `src` paths with your own photographs before treating those frames as your work. Search within `index.html` for `images.unsplash.com` to find them.

If you want to change a filename, add the new file under `images/` and update that image's `src` in `index.html`. Use simple filenames without spaces, such as `winter-ridge.jpg` or `temple-detail.webp`. GitHub Pages paths are case-sensitive, so use the exact same uppercase and lowercase letters in the filename and HTML.

The photographs inside the download are portfolio-sized copies (up to 2400 px on the long edge) with embedded metadata removed, including precise GPS coordinates. Your original photographs remain untouched in the working folder. For new images, export a web-sized copy and remove GPS metadata before adding it to a public repository. Camera details shown in the viewer are entered in the page markup below.

### Keep each photograph's details in sync

Each image's parent `<figure data-photo>` in `index.html` stores the text shown in its viewer:

- `data-title`: short image title
- `data-location`: place shown on hover and in the viewer; use `Location not listed` if you prefer not to name it
- `data-description`: a brief note about the image
- `data-credit`: photographer or source
- `data-camera`, `data-lens`, `data-focal-length`, `data-aperture`, `data-shutter-speed`, and `data-iso`: camera and exposure notes

The current sample photos do not have camera information recorded, so those fields are left blank or say `Not recorded`. Add only settings you know. Examples: `data-aperture="f/2.8"`, `data-shutter-speed="1/250 s"`, and `data-iso="ISO 400"`.

Write useful alt text on the `<img>` itself. Describe the visible subject and light in a short sentence; this is read by screen readers and is shown if an image cannot load.

### Add another photograph to the gallery

Copy this block and paste it inside `<div class="gallery" id="gallery">` in `index.html`. Change the filename, text, and camera fields to match your image:

```html
<figure class="gallery-item"
        data-photo
        data-category="architecture"
        data-title="First light"
        data-location="Your location"
        data-camera="Camera body, if known"
        data-lens="35 mm f/1.4"
        data-focal-length="35 mm"
        data-aperture="f/1.4"
        data-shutter-speed="1/500 s"
        data-iso="ISO 100"
        data-description="A short note about the photograph."
        data-credit="Vinayak Singh Judev">
  <button class="photo-trigger image-button" type="button" data-lightbox
          aria-label="Open photograph: First light">
    <img src="images/first-light.jpg"
         alt="Describe the subject and light in this photograph"
         loading="lazy" decoding="async" />
    <span class="image-open" aria-hidden="true">↗</span>
    <span class="image-location"><span>PHOTOGRAPHED IN</span><b>YOUR LOCATION</b></span>
  </button>
  <figcaption><span>First light</span><span><span data-photo-number></span> / ARCHITECTURE</span></figcaption>
</figure>
```

Use `architecture`, `people`, or `places` for `data-category`. The category filters, counts, frame numbers, hover locations, image viewer, and previous/next controls update from the page markup automatically. Add `gallery-wide` to the figure for a wider image.

### Change the featured photograph

In `index.html`, find `<figure class="featured-plate"` inside `<section id="archive">`. Replace the `<img src>` path and edit the `data-*` fields, alt text, heading, and caption to describe your new featured frame. The **Explore the collection** link below the image already points to the gallery.

### Replace the portrait placeholder

Put your portrait in `images/`, then update the image path in the profile card in `index.html`:

```html
<img src="images/your-portrait.jpg" alt="Vinayak Singh Judev, photographer" />
```

Keep a portrait crop with the subject near the centre; the jharokha arch and glass frame are created in CSS and will stay in place.

## Artwork, fonts, and contact link

- The hero backdrop is Raja Ravi Varma's *Shakuntala*, loaded from Wikimedia Commons and credited beside the introduction. The painting is identified as public domain on its Commons file page: [Raja Ravi Varma — Shakuntala](https://commons.wikimedia.org/wiki/File:Raja_Ravi_Varma_-_Mahabharata_-_Shakuntala.jpg).
- The painted interlude uses an Indian miniature from The Metropolitan Museum of Art and links to its collection record.
- Web fonts load from Google Fonts. The site still renders with fallback fonts if an external font service is unavailable.
- The profile name and contact link currently point to `https://www.instagram.com/lastpixell/`. Change those links in the profile card if you prefer another contact address.

## Useful files

- `index.html` — portfolio content, image entries, copy, credits, and metadata
- `styles.css` — colors, layout, borders, responsive styling, and animation
- `script.js` — gallery filters, image viewer, photo counts, and scroll effects
- `images/` — photographs and portrait illustration
- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow

To change the colors or motion, edit the CSS variables at the top of `styles.css`. Animations respect the visitor's reduced-motion setting.
