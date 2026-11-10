# Techware: 3D Product Models Agent Prompt

Copy everything below this line into your coding agent.

---

## ROLE

You are a senior 3D technical artist and web graphics engineer. Build the **3D model pipeline** for **Techware**, a Nigerian e-commerce marketplace for laptops and tech accessories. The website uses **Next.js with React Three Fiber (Three.js)**, so every model must be a web-optimized **GLB (glTF 2.0)** file. Work in the steps below and stop for my approval after each step.

## 1. GOAL

1. Create a set of **generic, brand-neutral placeholder 3D models** so the website works from day one.
2. Build an **automated optimization and validation pipeline** for any GLB (ours or uploaded by vendors).
3. Create a **model preview page** and a **manifest** the website can read.
4. Write a **vendor 3D upload guide** so vendors can supply their own models in the right format.

## 2. IMPORTANT RULES

- **Do not use real brand logos, names or trademarked designs** (Dell, Lenovo, HP, Apple, etc.). Models must be generic, with a clean, modern, realistic look. Real branded models may only be added later by vendors who have the right to use them.
- Models must **look good from every angle** (front, back, left, right, top, bottom), because customers rotate them fully.
- Keep the Techware brand: accent colors electric blue `#1D4ED8`, navy `#0B1B3F` and green `#22C55E` may appear on packaging-style details only. Product colors should be realistic (space grey, silver, black, white, and so on).

## 3. MODELS TO CREATE

| ID | Model | Required details |
|---|---|---|
| `laptop-generic` | Laptop | Lid, hinge, screen with bezel and webcam, keyboard deck with keys, trackpad, ports (USB-C, USB-A, HDMI, headphone jack), vents, rubber feet. Lid open at about 110 degrees, plus a closed variant. |
| `keyboard-generic` | Keyboard | Full layout with individually modelled keys, slight tilt feet, cable. |
| `mouse-generic` | Mouse | Body, left and right buttons, scroll wheel, sensor on the underside, cable or wireless. |
| `charger-generic` | Phone charger | Wall plug block with pins, USB-C port, cable with connector. |
| `phone-case-generic` | Phone case | Camera cutout, button cutouts, port cutout, inner lining, with a simple phone body inside. |
| `earbuds-generic` | Earbuds and case | Two earbuds with stems and silicone tips, charging case with open and closed variants, LED indicator. |

Create each model **procedurally with a script** so it is reproducible and easy to change. Use **Blender with Python (`bpy`) in headless mode** if available; otherwise build with Three.js geometry and export with `GLTFExporter`. Keep scripts in `tools/3d/generators/`.

Each model needs **color variants** (for example black, silver, white) implemented as separate material presets or exported variants.

## 4. TECHNICAL SPECIFICATION (every model must meet this)

- Format: **GLB (glTF 2.0)**, one file per product variant.
- Units: **meters**, real-world scale (a 14-inch laptop is about 0.31 m wide). Y axis up.
- Origin: **center of the model, resting on the floor plane** (bottom at y = 0).
- Triangles: laptop 80,000 max; other models 40,000 max; **mobile variant** at about 30% of those numbers.
- Materials: **PBR metallic-roughness**. Maximum 6 materials per model. Use sensible names (`body_aluminium`, `screen_glass`, `key_plastic`).
- Textures: maximum **2048 px** (1024 px for the mobile variant), compressed to **KTX2 / Basis** or optimized WebP, with a combined ORM texture where possible. Total file size target: **under 3 MB per model, under 1.2 MB for the mobile variant**.
- Geometry compression: **Draco or Meshopt**. Merge meshes and remove unused data.
- Clean geometry: correct normals, no overlapping or z-fighting faces, no hidden internal geometry, all faces visible from every side.
- Node names are clear and consistent (`Lid`, `Screen`, `Keyboard`, `Trackpad`). Provide named nodes for parts that could be animated (laptop lid, earbud case lid).
- Include **simple animations** where useful (laptop lid open/close, earbud case open) as named glTF animations.

## 5. PIPELINE AND TOOLING

Create `tools/3d/` with these scripts (Node.js and/or Python), documented in a README:

1. **`generate`**: builds every model and variant from the generator scripts.
2. **`optimize`**: uses `@gltf-transform/cli` to dedupe, prune, weld, simplify (for the mobile variant), compress textures and apply Draco/Meshopt.
3. **`validate`**: runs the Khronos **glTF Validator** and custom checks (size, triangle count, texture size, scale, origin, material count). Print a pass/fail report and exit with an error on failure.
4. **`manifest`**: writes `models.manifest.json` with, for each model: id, name, category, file paths (desktop and mobile), size in KB, triangle count, variants, animation names, recommended camera distance, and a poster image path.
5. **`posters`**: renders a clean **poster image (WebP)** per model from a front three-quarter angle, used as the instant placeholder while the 3D model loads.

Output to `apps/web/public/models/`. Add one command, `pnpm models:build`, that runs everything.

## 6. PREVIEW PAGE

Build a development page at `/dev/models` in the Next.js app (React Three Fiber + drei) that:
- Lists every model from the manifest.
- Shows each one in a viewer with **orbit controls**, studio lighting, environment map and contact shadow.
- Has buttons for **front, back, left, right, top, bottom** views, auto-rotate, wireframe toggle, variant switcher, and play/pause for animations.
- Shows file size, triangle count and validation status.

## 7. VENDOR 3D GUIDE AND VALIDATION

1. Write `docs/vendor-3d-guide.md` in plain English for vendors: accepted format (GLB only), maximum file size (default 10 MB, configurable), real-world scale, origin and orientation, recommended polygon count, texture rules, and how to export from Blender, or request a model from a 3D artist. Include a short checklist and "common mistakes".
2. Build a reusable **server-side validation function** (for NestJS) that checks an uploaded GLB: valid glTF, size limit, triangle limit, texture size, no external references, no scripts or unsafe extensions. Return clear, friendly error messages.
3. Describe (and, if time allows, implement) an **automatic optimization step** that runs on vendor uploads before they are saved.

## 8. WORKING STEPS

1. **Step 1:** propose the tool choice, folder structure and a plan for the models. Wait for approval.
2. **Step 2:** build the pipeline scripts and the preview page with one model (`laptop-generic`), end to end.
3. **Step 3:** build the remaining five models and variants.
4. **Step 4:** run validation on all models, fix issues, generate the manifest and posters.
5. **Step 5:** write the vendor guide and the validation function; give me a final report.

At each step, list what was built, how to run it, results, and known gaps.

## 9. ACCEPTANCE CRITERIA

- All six models pass validation and meet the size and triangle budgets.
- Every model looks correct from all six directions with no holes or flipped faces.
- `pnpm models:build` works from a clean checkout.
- The preview page runs at a smooth frame rate on a mid-range phone.
- The manifest and posters are ready for the website to use.
- No trademarked logos or brand names appear on any model.

## 10. START NOW

Begin with **Step 1**.
