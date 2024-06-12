---
tags:
- Batch
- Image
- ImageBatch
---

# Image List to Image Batch
## Documentation
- Class name: `ImageListToImageBatch`
- Category: `ImpactPack/Operation`
- Output node: `False`

This node transforms a list of images into a single batched image tensor, ensuring all images have the same dimensions through upsampling if necessary. It's designed to facilitate operations that require batch processing of images by consolidating multiple images into a unified tensor format.
## Input types
### Required
- **`images`**
    - A list of image tensors to be batched together. This input is crucial for the node's operation as it determines the composition of the resulting batched image tensor.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single batched image tensor, which is a consolidated version of the input images, potentially with upsampling applied to maintain dimension consistency.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [RIFE VFI](../../ComfyUI-Frame-Interpolation/Nodes/RIFE VFI.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - Reroute
    - [ImageSelector](../../ComfyUI-Image-Selector/Nodes/ImageSelector.md)



## Source code
```python
class ImageListToImageBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "images": ("IMAGE", ),
                      }
                }

    INPUT_IS_LIST = True

    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, images):
        if len(images) <= 1:
            return (images,)
        else:
            image1 = images[0]
            for image2 in images[1:]:
                if image1.shape[1:] != image2.shape[1:]:
                    image2 = comfy.utils.common_upscale(image2.movedim(-1, 1), image1.shape[2], image1.shape[1], "lanczos", "center").movedim(1, -1)
                image1 = torch.cat((image1, image2), dim=0)
            return (image1,)

```
