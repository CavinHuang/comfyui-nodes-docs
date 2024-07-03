
# Documentation
- Class name: Preview from image [Crystools]
- Category: crystools 🪛/Image
- Output node: True
- Repo Ref: https://github.com/crystian/ComfyUI-Crystools

这个节点旨在通过临时保存图像并提取元数据来生成图像的预览，元数据包括分辨率、日期和大小等详细信息。它的目标是提供图像属性的全面概览以及图像中编码的任何附加信息，从而促进对图像文件的深入理解和更便捷的管理。

# Input types
## Optional
- image
    - 需要预览的图像。它对于生成预览和提取元数据至关重要，这些信息用于提供有关图像的详细信息。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- Metadata RAW
    - 从图像中提取的原始元数据，提供诸如分辨率、日期和大小等基本细节。
    - Comfy dtype: METADATA_RAW
    - Python dtype: Dict[str, Any]
- ui
    - 图像预览及其元数据的结构化表示，包括文本描述和图像本身，可随时显示。
    - Comfy dtype: UI
    - Python dtype: Dict[str, Any]


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
