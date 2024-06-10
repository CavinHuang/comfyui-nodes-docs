---
tags:
- Image
- ImageSave
---

# Image Sender
## Documentation
- Class name: `ImageSender`
- Category: `ImpactPack/Util`
- Output node: `True`

The ImageSender node is designed for sending images over a network to a specified destination, incorporating additional information such as a filename prefix and a link ID. It primarily serves the purpose of transmitting image data, potentially with extra metadata, to facilitate remote processing or storage.
## Input types
### Required
- **`images`**
    - Specifies the images to be sent. This is the primary data that the node operates on, determining the content that will be transmitted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tuple[IMAGE]`
- **`filename_prefix`**
    - A prefix for the filename under which the images will be saved or identified. This helps in organizing or categorizing the images on the receiving end.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`link_id`**
    - An identifier used to link the sent images to a specific context or session. This aids in tracking and managing images across different parts of a system.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`ui`**
    - The output includes UI elements or data related to the images processed by the node, potentially for display or further interaction.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageSender(nodes.PreviewImage):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "images": ("IMAGE", ),
                    "filename_prefix": ("STRING", {"default": "ImgSender"}),
                    "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}), },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    OUTPUT_NODE = True

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, images, filename_prefix="ImgSender", link_id=0, prompt=None, extra_pnginfo=None):
        result = nodes.PreviewImage().save_images(images, filename_prefix, prompt, extra_pnginfo)
        PromptServer.instance.send_sync("img-send", {"link_id": link_id, "images": result['ui']['images']})
        return result

```
