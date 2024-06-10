---
tags:
- Animation
- Image
---

# SaveAnimatedWEBP
## Documentation
- Class name: `SaveAnimatedWEBP`
- Category: `image/animation`
- Output node: `True`

This node is designed for saving a sequence of images as an animated WEBP file. It handles the aggregation of individual frames into a cohesive animation, applying specified metadata, and optimizing the output based on quality and compression settings.
## Input types
### Required
- **`images`**
    - A list of images to be saved as frames in the animated WEBP. This parameter is essential for defining the visual content of the animation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[PIL.Image]`
- **`filename_prefix`**
    - Specifies the base name for the output file, which will be appended with a counter and the '.webp' extension. This parameter is crucial for identifying and organizing the saved files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`fps`**
    - The frames per second rate for the animation, influencing the playback speed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lossless`**
    - A boolean indicating whether to use lossless compression, affecting the file size and quality of the animation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`quality`**
    - A value between 0 and 100 that sets the compression quality level, with higher values resulting in better image quality but larger file sizes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - Specifies the compression method to use, which can impact the encoding speed and file size.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`ui`**
    - Provides a UI component displaying the saved animated WEBP images along with their metadata, and indicates whether the animation is enabled.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveAnimatedWEBP:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""

    methods = {"default": 4, "fastest": 0, "slowest": 6}
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"images": ("IMAGE", ),
                     "filename_prefix": ("STRING", {"default": "ComfyUI"}),
                     "fps": ("FLOAT", {"default": 6.0, "min": 0.01, "max": 1000.0, "step": 0.01}),
                     "lossless": ("BOOLEAN", {"default": True}),
                     "quality": ("INT", {"default": 80, "min": 0, "max": 100}),
                     "method": (list(s.methods.keys()),),
                     # "num_frames": ("INT", {"default": 0, "min": 0, "max": 8192}),
                     },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ()
    FUNCTION = "save_images"

    OUTPUT_NODE = True

    CATEGORY = "image/animation"

    def save_images(self, images, fps, filename_prefix, lossless, quality, method, num_frames=0, prompt=None, extra_pnginfo=None):
        method = self.methods.get(method)
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        pil_images = []
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            pil_images.append(img)

        metadata = pil_images[0].getexif()
        if not args.disable_metadata:
            if prompt is not None:
                metadata[0x0110] = "prompt:{}".format(json.dumps(prompt))
            if extra_pnginfo is not None:
                inital_exif = 0x010f
                for x in extra_pnginfo:
                    metadata[inital_exif] = "{}:{}".format(x, json.dumps(extra_pnginfo[x]))
                    inital_exif -= 1

        if num_frames == 0:
            num_frames = len(pil_images)

        c = len(pil_images)
        for i in range(0, c, num_frames):
            file = f"{filename}_{counter:05}_.webp"
            pil_images[i].save(os.path.join(full_output_folder, file), save_all=True, duration=int(1000.0/fps), append_images=pil_images[i + 1:i + num_frames], exif=metadata, lossless=lossless, quality=quality, method=method)
            results.append({
                "filename": file,
                "subfolder": subfolder,
                "type": self.type
            })
            counter += 1

        animated = num_frames != 1
        return { "ui": { "images": results, "animated": (animated,) } }

```
