---
tags:
- Animation
- Image
---

# SaveAnimatedPNG
## Documentation
- Class name: `SaveAnimatedPNG`
- Category: `image/animation`
- Output node: `True`

The SaveAnimatedPNG node is designed for creating and saving animated PNG images from a sequence of frames. It handles the assembly of individual image frames into a cohesive animation, allowing for customization of frame duration, looping, and metadata inclusion.
## Input types
### Required
- **`images`**
    - A list of images to be processed and saved as an animated PNG. Each image in the list represents a frame in the animation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`filename_prefix`**
    - Specifies the base name for the output file, which will be used as a prefix for the generated animated PNG files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`fps`**
    - The frames per second rate for the animation, controlling how quickly the frames are displayed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`compress_level`**
    - The level of compression applied to the animated PNG files, affecting file size and image clarity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`ui`**
    - Provides a UI component displaying the generated animated PNG images and indicating whether the animation is single-frame or multi-frame.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveAnimatedPNG:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""

    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"images": ("IMAGE", ),
                     "filename_prefix": ("STRING", {"default": "ComfyUI"}),
                     "fps": ("FLOAT", {"default": 6.0, "min": 0.01, "max": 1000.0, "step": 0.01}),
                     "compress_level": ("INT", {"default": 4, "min": 0, "max": 9})
                     },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ()
    FUNCTION = "save_images"

    OUTPUT_NODE = True

    CATEGORY = "image/animation"

    def save_images(self, images, fps, compress_level, filename_prefix="ComfyUI", prompt=None, extra_pnginfo=None):
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        pil_images = []
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            pil_images.append(img)

        metadata = None
        if not args.disable_metadata:
            metadata = PngInfo()
            if prompt is not None:
                metadata.add(b"comf", "prompt".encode("latin-1", "strict") + b"\0" + json.dumps(prompt).encode("latin-1", "strict"), after_idat=True)
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    metadata.add(b"comf", x.encode("latin-1", "strict") + b"\0" + json.dumps(extra_pnginfo[x]).encode("latin-1", "strict"), after_idat=True)

        file = f"{filename}_{counter:05}_.png"
        pil_images[0].save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=compress_level, save_all=True, duration=int(1000.0/fps), append_images=pil_images[1:])
        results.append({
            "filename": file,
            "subfolder": subfolder,
            "type": self.type
        })

        return { "ui": { "images": results, "animated": (True,)} }

```
