---
tags:
- Batch
- Image
- ImageBatch
---

# Batch Images
## Documentation
- Class name: `ImageBatch`
- Category: `image`
- Output node: `False`

The ImageBatch node is designed for combining two images into a single batch. If the dimensions of the images do not match, it automatically rescales the second image to match the first one's dimensions before combining them.
## Input types
### Required
- **`image1`**
    - The first image to be combined into the batch. It serves as the reference for the dimensions to which the second image will be adjusted if necessary.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second image to be combined into the batch. It is automatically rescaled to match the dimensions of the first image if they differ.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The combined batch of images, with the second image rescaled to match the first one's dimensions if needed.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImageBatch](../../Comfy/Nodes/ImageBatch.md)
    - IPAdapterApply
    - [CR Batch Process Switch](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Batch Process Switch.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [Preview Chooser](../../cg-image-picker/Nodes/Preview Chooser.md)



## Source code
```python
class ImageBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image1": ("IMAGE",), "image2": ("IMAGE",)}}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "batch"

    CATEGORY = "image"

    def batch(self, image1, image2):
        if image1.shape[1:] != image2.shape[1:]:
            image2 = comfy.utils.common_upscale(image2.movedim(-1,1), image1.shape[2], image1.shape[1], "bilinear", "center").movedim(1,-1)
        s = torch.cat((image1, image2), dim=0)
        return (s,)

```
