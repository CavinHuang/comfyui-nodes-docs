---
tags:
- Image
- ImageSave
---

# Save Image (Searge)
## Documentation
- Class name: `SeargeImageSave`
- Category: `Searge/_deprecated_/Files`
- Output node: `True`

The SeargeImageSave node is designed to manage the saving of images generated within the SeargeSDXL framework. It incorporates logic to handle various states of image saving, including enabling or disabling the saving of upscaled images and applying fixes for high-resolution image saving. This node plays a crucial role in the image generation pipeline by ensuring that images are saved according to user preferences and settings, including the handling of special cases such as saving to specific directories.
## Input types
### Required
- **`images`**
    - Specifies the images to be saved, serving as the primary content for the node's saving functionalities.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`filename_prefix`**
    - Defines the prefix for filenames under which images will be saved, influencing the naming convention used for saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`state`**
    - Determines the state of image saving (enabled or disabled), directly affecting whether images are saved or not.
    - Comfy dtype: `ENABLE_STATE`
    - Python dtype: `str`
- **`save_to`**
    - Indicates the directory (output or input folder) where images should be saved, guiding the node's decision on where to store generated images.
    - Comfy dtype: `SAVE_FOLDER`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeImageSave:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "filename_prefix": ("STRING", {"default": "SeargeSDXL-%date%/Image"}),
                "state": ("ENABLE_STATE", {"default": SeargeParameterProcessor.STATES[1]}),
                "save_to": ("SAVE_FOLDER", {"default": SeargeParameterProcessor.SAVE_TO[0]}),
            },
            "hidden": {
                "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"
            },
        }

    RETURN_TYPES = ()
    FUNCTION = "save_images"

    OUTPUT_NODE = True

    CATEGORY = "Searge/_deprecated_/Files"

    def save_images(self, images, filename_prefix, state, save_to, prompt=None, extra_pnginfo=None):
        # "disabled"
        if state == SeargeParameterProcessor.STATES[0]:
            return {}

        # "input folder"
        if save_to == SeargeParameterProcessor.SAVE_TO[1]:
            output_dir = folder_paths.get_input_directory()
            filename_prefix = "output-%date%"
        # incl. SeargeParameterProcessor.SAVE_TO[0] -> "output folder"
        else:
            output_dir = folder_paths.get_output_directory()

        filename_prefix = filename_prefix.replace("%date%", datetime.now().strftime("%Y-%m-%d"))

        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(
            filename_prefix, output_dir, images[0].shape[1], images[0].shape[0])

        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = None
            if args.disable_metadata is None or not args.disable_metadata:
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text("prompt", json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))

            file = f"{filename}_{counter:05}_.png"
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=4)

            counter += 1

        return {}

```
