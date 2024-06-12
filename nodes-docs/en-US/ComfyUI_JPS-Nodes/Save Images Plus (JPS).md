---
tags:
- Image
- ImageSave
---

# Save Images Plus (JPS)
## Documentation
- Class name: `Save Images Plus (JPS)`
- Category: `JPS Nodes/IO`
- Output node: `True`

This node specializes in efficiently storing images on disk, offering capabilities for metadata customization and compression preferences. It facilitates organized file management and supports dynamic adaptation to image attributes, enhancing the storage process with optional metadata embedding for enriched file context.
## Input types
### Required
- **`images`**
    - A batch of images to be saved. This parameter is crucial for determining the output file names and paths, as well as for the actual image saving process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`filename_prefix`**
    - An optional prefix for the output filenames, allowing for organized storage and easy identification of saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`dummy_out`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - The node returns a UI component displaying the saved images, enhancing user interaction and feedback.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Save_Images_Plus:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""
        self.compress_level = 4

    @classmethod
    def INPUT_TYPES(s):
        return {"required": 
                    {"images": ("IMAGE", ),
                     "filename_prefix": ("STRING", {"default": "ComfyUI"})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("dummy_out",)
    FUNCTION = "save_images_plus"

    OUTPUT_NODE = True

    CATEGORY = "JPS Nodes/IO"

    def save_images_plus(self, images, filename_prefix="ComfyUI", prompt=None, extra_pnginfo=None):
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = None
            if not args.disable_metadata:
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text("prompt", json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))

            file = f"{filename} {counter:03}.png"
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=self.compress_level)
            results.append({
                "filename": file,
                "subfolder": subfolder,
                "type": self.type
            })
            counter += 1

        #return { "ui": { "images": results } }
        return(int(1), )            

```
