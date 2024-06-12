---
tags:
- Image
- ImageSave
---

# Save Image
## Documentation
- Class name: `SaveImage`
- Category: `image`
- Output node: `True`

The SaveImage node is designed for saving images to disk. It handles the process of converting image data from tensors to a suitable image format, applying optional metadata, and writing the images to specified locations with configurable compression levels.
## Input types
### Required
- **`images`**
    - The images to be saved. This parameter is crucial as it directly contains the image data that will be processed and saved to disk.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`filename_prefix`**
    - A prefix for the filename under which the image will be saved. This allows for organized storage and easy retrieval of saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`ui`**
    - Provides a user interface component displaying the saved images, including filenames and storage locations.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImage:
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

    RETURN_TYPES = ()
    FUNCTION = "save_images"

    OUTPUT_NODE = True

    CATEGORY = "image"

    def save_images(self, images, filename_prefix="ComfyUI", prompt=None, extra_pnginfo=None):
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        for (batch_number, image) in enumerate(images):
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

            filename_with_batch_num = filename.replace("%batch_num%", str(batch_number))
            file = f"{filename_with_batch_num}_{counter:05}_.png"
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=self.compress_level)
            results.append({
                "filename": file,
                "subfolder": subfolder,
                "type": self.type
            })
            counter += 1

        return { "ui": { "images": results } }

```
