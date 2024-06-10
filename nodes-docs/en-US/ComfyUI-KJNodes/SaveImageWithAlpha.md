---
tags:
- Image
- ImageSave
---

# SaveImageWithAlpha
## Documentation
- Class name: `SaveImageWithAlpha`
- Category: `KJNodes/image`
- Output node: `True`

The SaveImageWithAlpha node is designed to save images with an alpha channel, allowing for transparency effects. It supports adding metadata to the saved image files, including prompts and additional PNG information, and manages file naming and storage with a focus on preserving image quality and transparency.
## Input types
### Required
- **`images`**
    - The images to be saved, expected to have an alpha channel for transparency.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The mask to apply to the images, defining the transparency level of each pixel.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`filename_prefix`**
    - A prefix for the filename, used to identify and organize the saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`ui`**
    - The UI parameter returns a dictionary containing the paths to the saved images, facilitating user interaction and file retrieval.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImageWithAlpha:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""

    @classmethod
    def INPUT_TYPES(s):
        return {"required": 
                    {"images": ("IMAGE", ),
                    "mask": ("MASK", ),
                    "filename_prefix": ("STRING", {"default": "ComfyUI"})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ()
    FUNCTION = "save_images_alpha"
    OUTPUT_NODE = True
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Saves an image and mask as .PNG with the mask as the alpha channel. 
"""

    def save_images_alpha(self, images, mask, filename_prefix="ComfyUI_image_with_alpha", prompt=None, extra_pnginfo=None):
        from comfy.cli_args import args
        from PIL.PngImagePlugin import PngInfo
        filename_prefix += self.prefix_append
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        if mask.dtype == torch.float16:
            mask = mask.to(torch.float32)
        def file_counter():
            max_counter = 0
            # Loop through the existing files
            for existing_file in os.listdir(full_output_folder):
                # Check if the file matches the expected format
                match = re.fullmatch(fr"{filename}_(\d+)_?\.[a-zA-Z0-9]+", existing_file)
                if match:
                    # Extract the numeric portion of the filename
                    file_counter = int(match.group(1))
                    # Update the maximum counter value if necessary
                    if file_counter > max_counter:
                        max_counter = file_counter
            return max_counter

        for image, alpha in zip(images, mask):
            i = 255. * image.cpu().numpy()
            a = 255. * alpha.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            
             # Resize the mask to match the image size
            a_resized = Image.fromarray(a).resize(img.size, Image.LANCZOS)
            a_resized = np.clip(a_resized, 0, 255).astype(np.uint8)
            img.putalpha(Image.fromarray(a_resized, mode='L'))
            metadata = None
            if not args.disable_metadata:
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text("prompt", json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
           
            # Increment the counter by 1 to get the next available value
            counter = file_counter() + 1
            file = f"{filename}_{counter:05}.png"
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=4)
            results.append({
                "filename": file,
                "subfolder": subfolder,
                "type": self.type
            })

        return { "ui": { "images": results } }

```
