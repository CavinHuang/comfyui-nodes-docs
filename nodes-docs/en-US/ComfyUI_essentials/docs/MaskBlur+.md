---
tags:
- Blur
- MaskBlur
- VisualEffects
---

# 🔧 Mask Blur
## Documentation
- Class name: `MaskBlur+`
- Category: `essentials`
- Output node: `False`

The MaskBlur node applies a Gaussian blur to a given mask, allowing for the softening of edges and the creation of a smoother mask. This operation is particularly useful in graphics and image processing tasks where the harshness of a binary mask needs to be mitigated.
## Input types
### Required
- **`mask`**
    - The mask to be blurred. This input is crucial for defining the area within the image where the blur effect will be applied.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`amount`**
    - Specifies the intensity of the blur effect. A higher value results in a more pronounced blur, affecting the mask's smoothness and the transition between masked and unmasked areas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a blurred version of the input mask, with softened edges and transitions, suitable for further image processing or visualization tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - IPAdapterApply
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)
    - [Masks Subtract](../../was-node-suite-comfyui/Nodes/Masks Subtract.md)



## Source code
```python
class MaskBlur:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "amount": ("FLOAT", { "default": 6.0, "min": 0, "step": 0.5, }),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, mask, amount):
        size = int(6 * amount +1)
        if size % 2 == 0:
            size+= 1
        
        if mask.dim() == 2:
            mask = mask.unsqueeze(0)

        blurred = mask.unsqueeze(1)
        blurred = T.GaussianBlur(size, amount)(blurred)
        blurred = blurred.squeeze(1)

        return(blurred,)

```
