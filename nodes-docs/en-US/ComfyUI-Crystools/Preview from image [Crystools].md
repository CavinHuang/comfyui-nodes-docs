---
tags:
- Preview
---

# 🪛 Preview from image
## Documentation
- Class name: `Preview from image [Crystools]`
- Category: `crystools 🪛/Image`
- Output node: `True`

This node is designed to generate a preview of an image by saving it temporarily and extracting metadata, which includes details such as resolution, date, and size. It aims to provide a comprehensive overview of the image's properties and any additional information encoded within, facilitating a deeper understanding and easier management of image files.
## Input types
### Required
### Optional
- **`image`**
    - The image to be previewed. It is essential for generating the preview and extracting metadata, which is used to provide detailed information about the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`Metadata RAW`**
    - Comfy dtype: `METADATA_RAW`
    - The raw metadata extracted from the image, providing essential details such as resolution, date, and size.
    - Python dtype: `Dict[str, Any]`
- **`ui`**
    - A structured representation of the image preview and its metadata, including text descriptions and the image itself, ready for display.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CImagePreviewFromImage(PreviewImage):
    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"
        self.prefix_append = "_" + ''.join(random.choice("abcdefghijklmnopqrstupvxyz") for x in range(5))
        self.compress_level = 1
        self.data_cached = None
        self.data_cached_text = None

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                # if it is required, in next node does not receive any value even the cache!
            },
            "optional": {
                "image": ("IMAGE",),
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.IMAGE.value
    RETURN_TYPES = ("METADATA_RAW",)
    RETURN_NAMES = ("Metadata RAW",)
    OUTPUT_NODE = True

    FUNCTION = "execute"

    def execute(self, image=None, prompt=None, extra_pnginfo=None):
        text = ""
        title = ""
        data = {
            "result": [''],
            "ui": {
                "text": [''],
                "images": [],
            }
        }

        if image is not None:
            saved = self.save_images(image, "crystools/i", prompt, extra_pnginfo)
            image = saved["ui"]["images"][0]
            image_path = Path(self.output_dir).joinpath(image["subfolder"], image["filename"])

            img, promptFromImage, metadata = buildMetadata(image_path)

            images = [image]
            result = metadata

            data["result"] = [result]
            data["ui"]["images"] = images

            title = "Source: Image link \n"
            text += buildPreviewText(metadata)
            text += f"Current prompt (NO FROM IMAGE!):\n"
            text += json.dumps(promptFromImage, indent=CONFIG["indent"])

            self.data_cached_text = text
            self.data_cached = data

        elif image is None and self.data_cached is not None:
            title = "Source: Image link - CACHED\n"
            data = self.data_cached
            text = self.data_cached_text

        else:
            logger.debug("Source: Empty on CImagePreviewFromImage")
            text = "Source: Empty"

        data['ui']['text'] = [title + text]
        return data

```
