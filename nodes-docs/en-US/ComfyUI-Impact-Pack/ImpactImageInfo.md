---
tags:
- ConditionalSelection
- ImpactPack
---

# ImpactImageInfo
## Documentation
- Class name: `ImpactImageInfo`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `False`

The ImpactImageInfo node is designed to extract and provide detailed information about an image within the context of enhancing or detailing images for visual impact. It focuses on analyzing image characteristics and metadata to support subsequent processing steps, such as detailing, segmentation, or enhancement, tailored to the specific needs of the image.
## Input types
### Required
- **`value`**
    - The 'value' parameter represents the input image whose characteristics such as batch size, height, width, and channel count are to be analyzed and returned. This information is crucial for understanding the image's structure and for facilitating further image processing operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`batch`**
    - Comfy dtype: `INT`
    - The 'batch' output indicates the batch size of the input image tensor, which is essential for batch processing scenarios.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The 'height' output provides the height of the input image, which is crucial for understanding the image's dimensions.
    - Python dtype: `int`
- **`width`**
    - Comfy dtype: `INT`
    - The 'width' output provides the width of the input image, indicating its dimensions.
    - Python dtype: `int`
- **`channel`**
    - Comfy dtype: `INT`
    - The 'channel' output indicates the number of channels in the input image, such as RGB channels, which is essential for color image processing.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [EmptyImage](../../Comfy/Nodes/EmptyImage.md)
    - [ttN pipeLoader](../../ComfyUI_tinyterraNodes/Nodes/ttN pipeLoader.md)
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)



## Source code
```python
class ImpactImageInfo:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "value": ("IMAGE", ),
                    },
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"

    RETURN_TYPES = ("INT", "INT", "INT", "INT")
    RETURN_NAMES = ("batch", "height", "width", "channel")

    def doit(self, value):
        return (value.shape[0], value.shape[1], value.shape[2], value.shape[3])

```
