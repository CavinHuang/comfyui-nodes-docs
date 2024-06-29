---
tags:
- List
---

# Make Image List
## Documentation
- Class name: `ImpactMakeImageList`
- Category: `ImpactPack/Util`
- Output node: `False`

The `ImpactMakeImageList` node is designed to aggregate multiple image inputs into a single list. This functionality is essential for scenarios where handling a collection of images as a unified entity is required, facilitating operations that span across multiple images.
## Input types
### Required
- **`image1`**
    - The primary image input for the node. It serves as the initial element in the resulting image list, setting the stage for additional images to be appended.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A list of images aggregated from the input. This output is crucial for subsequent operations that require processing multiple images simultaneously.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImageListToImageBatch](../../ComfyUI-Impact-Pack/Nodes/ImageListToImageBatch.md)



## Source code
```python
class MakeImageList:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image1": ("IMAGE",), }}

    RETURN_TYPES = ("IMAGE",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, **kwargs):
        images = []

        for k, v in kwargs.items():
            images.append(v)

        return (images, )

```
