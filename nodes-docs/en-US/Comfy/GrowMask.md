---
tags:
- Mask
- MaskMorphology
---

# GrowMask
## Documentation
- Class name: `GrowMask`
- Category: `mask`
- Output node: `False`

The GrowMask node is designed to modify the size of a given mask, either expanding or contracting it, while optionally applying a tapered effect to the corners. This functionality is crucial for dynamically adjusting mask boundaries in image processing tasks, allowing for more flexible and precise control over the area of interest.
## Input types
### Required
- **`mask`**
    - The input mask to be modified. This parameter is central to the node's operation, serving as the base upon which the mask is either expanded or contracted.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`expand`**
    - Determines the magnitude and direction of the mask modification. Positive values cause the mask to expand, while negative values lead to contraction. This parameter directly influences the final size of the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tapered_corners`**
    - A boolean flag that, when set to True, applies a tapered effect to the corners of the mask during modification. This option allows for smoother transitions and visually appealing results.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The modified mask after applying the specified expansion/contraction and optional tapered corners effect.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [MaskBlur+](../../ComfyUI_essentials/Nodes/MaskBlur+.md)
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)



## Source code
```python
class GrowMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "expand": ("INT", {"default": 0, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION, "step": 1}),
                "tapered_corners": ("BOOLEAN", {"default": True}),
            },
        }
    
    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)

    FUNCTION = "expand_mask"

    def expand_mask(self, mask, expand, tapered_corners):
        c = 0 if tapered_corners else 1
        kernel = np.array([[c, 1, c],
                           [1, 1, 1],
                           [c, 1, c]])
        mask = mask.reshape((-1, mask.shape[-2], mask.shape[-1]))
        out = []
        for m in mask:
            output = m.numpy()
            for _ in range(abs(expand)):
                if expand < 0:
                    output = scipy.ndimage.grey_erosion(output, footprint=kernel)
                else:
                    output = scipy.ndimage.grey_dilation(output, footprint=kernel)
            output = torch.from_numpy(output)
            out.append(output)
        return (torch.stack(out, dim=0),)

```
