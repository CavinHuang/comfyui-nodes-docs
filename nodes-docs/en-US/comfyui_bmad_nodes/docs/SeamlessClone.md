---
tags:
- Image
- ImageBlend
- ImageComposite
---

# SeamlessClone
## Documentation
- Class name: `SeamlessClone`
- Category: `Bmad/CV/C.Photography`
- Output node: `False`

The SeamlessClone node is designed for blending two images together in a seamless manner, using a mask to define the blending region and various cloning modes to control the blending behavior. It allows for sophisticated image compositing techniques, such as normal cloning, mixed cloning, and monochrome transfer.
## Input types
### Required
- **`dst`**
    - The destination image onto which the source image will be cloned. It serves as the backdrop for the operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`src`**
    - The source image to be cloned onto the destination image. This image will be blended into the destination based on the mask and cloning mode.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`src_mask`**
    - A mask image defining the region of the source image to be cloned. Only the parts of the source image covered by the mask will be cloned.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`flag`**
    - Specifies the cloning mode to be used for the operation, such as normal, mixed, or monochrome transfer. This affects how the source image is blended into the destination.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cx`**
    - The x-coordinate of the center of the destination point for cloning. It influences the positioning of the cloned region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cy`**
    - The y-coordinate of the center of the destination point for cloning. It influences the positioning of the cloned region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The result of the seamless cloning operation, which is an image with the source region blended into the destination based on the specified mask and mode.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeamlessClone:
    clone_modes_map = {
        "NORMAL": cv.NORMAL_CLONE,
        "MIXED": cv.MIXED_CLONE,
        "MONO": cv.MONOCHROME_TRANSFER
    }
    clone_modes = list(clone_modes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "dst": ("IMAGE",),
                "src": ("IMAGE",),
                "src_mask": ("IMAGE",),
                "flag": (s.clone_modes, {"default": s.clone_modes[0]}),
                "cx": ("INT", {"default": 0, "min": -999999, "step": 1}),
                "cy": ("INT", {"default": 0, "min": -999999, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "paste"
    CATEGORY = "Bmad/CV/C.Photography"

    def paste(self, src, dst, src_mask, flag, cx, cy):
        src = tensor2opencv(src)
        dst = tensor2opencv(dst)
        src_mask = tensor2opencv(src_mask, 1)

        result = cv.seamlessClone(src, dst, src_mask, (cx, cy), self.clone_modes_map[flag])
        result = opencv2tensor(result)

        return (result,)

```
