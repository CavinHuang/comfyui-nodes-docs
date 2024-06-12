---
tags:
- Batch
- Image
- ImageBatch
---

# Make Image Batch
## Documentation
- Class name: `ImpactMakeImageBatch`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactMakeImageBatch node is designed to aggregate multiple images into a single batch. This process involves potentially resizing images to ensure uniform dimensions across the batch, facilitating operations that require consistent image sizes. The node serves as a utility within the Impact Pack, streamlining the handling of images for batch processing.
## Input types
### Required
- **`image1`**
    - The primary image to which subsequent images will be concatenated. It serves as the reference for resizing operations if other images differ in dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A single tensor representing a batch of images, where each image has been resized as necessary to match the dimensions of the first image in the batch.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CR Image Grid Panel](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Grid Panel.md)



## Source code
```python
class MakeImageBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image1": ("IMAGE",), }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, **kwargs):
        image1 = kwargs['image1']
        del kwargs['image1']
        images = [value for value in kwargs.values()]

        if len(images) == 0:
            return (image1,)
        else:
            for image2 in images:
                if image1.shape[1:] != image2.shape[1:]:
                    image2 = comfy.utils.common_upscale(image2.movedim(-1, 1), image1.shape[2], image1.shape[1], "lanczos", "center").movedim(1, -1)
                image1 = torch.cat((image1, image2), dim=0)
            return (image1,)

```
