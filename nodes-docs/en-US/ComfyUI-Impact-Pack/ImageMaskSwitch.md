---
tags:
- ConditionalSelection
- ImageSwitching
---

# Switch (images, mask)
## Documentation
- Class name: `ImageMaskSwitch`
- Category: `ImpactPack/Util`
- Output node: `True`

The ImageMaskSwitch node allows for the selection and output of a specific image and its associated mask from a set of up to four image-mask pairs based on a selection input. This functionality is useful for dynamically choosing between different visual elements and their masks within a workflow.
## Input types
### Required
- **`select`**
    - Determines which image-mask pair to output, allowing for dynamic selection from up to four options.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`images1`**
    - The first image in the selection set.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`mask1_opt`**
    - Optional mask associated with the first image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`images2_opt`**
    - The second optional image in the selection set.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask2_opt`**
    - Optional mask associated with the second image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`images3_opt`**
    - The third optional image in the selection set.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask3_opt`**
    - Optional mask associated with the third image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`images4_opt`**
    - The fourth optional image in the selection set.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask4_opt`**
    - Optional mask associated with the fourth image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The selected image based on the input selection.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask associated with the selected image, if provided.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute



## Source code
```python
class ImageMaskSwitch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "select": ("INT", {"default": 1, "min": 1, "max": 4, "step": 1}),
            "images1": ("IMAGE",),
        },

            "optional": {
                "mask1_opt": ("MASK",),
                "images2_opt": ("IMAGE",),
                "mask2_opt": ("MASK",),
                "images3_opt": ("IMAGE",),
                "mask3_opt": ("MASK",),
                "images4_opt": ("IMAGE",),
                "mask4_opt": ("MASK",),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK",)

    OUTPUT_NODE = True

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, select, images1, mask1_opt=None, images2_opt=None, mask2_opt=None, images3_opt=None, mask3_opt=None,
             images4_opt=None, mask4_opt=None):
        if select == 1:
            return images1, mask1_opt,
        elif select == 2:
            return images2_opt, mask2_opt,
        elif select == 3:
            return images3_opt, mask3_opt,
        else:
            return images4_opt, mask4_opt,

```
