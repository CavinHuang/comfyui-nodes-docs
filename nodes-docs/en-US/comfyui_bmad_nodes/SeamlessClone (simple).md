---
tags:
- Image
- ImageBlend
- ImageComposite
---

# SeamlessClone (simple)
## Documentation
- Class name: `SeamlessClone (simple)`
- Category: `Bmad/CV/C.Photography`
- Output node: `False`

The SeamlessClone node provides a comprehensive interface for performing seamless cloning operations on images. It supports various cloning modes and allows for precise control over the cloning process, including the ability to specify the center of the source mask for cloning. This node is designed to facilitate complex image blending tasks by seamlessly integrating a source image into a destination image.
## Input types
### Required
- **`dst`**
    - The destination image onto which the source image will be cloned.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`src`**
    - The source image to be cloned onto the destination image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`src_mask`**
    - The mask image indicating the region of the source image to be cloned.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`flag`**
    - Specifies the cloning mode to be used, chosen from a predefined set of modes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the seamless cloning operation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeamlessCloneSimpler:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "dst": ("IMAGE",),
                "src": ("IMAGE",),
                "src_mask": ("IMAGE",),
                "flag": (SeamlessClone.clone_modes, {"default": SeamlessClone.clone_modes[0]}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "paste"
    CATEGORY = "Bmad/CV/C.Photography"

    @staticmethod
    def get_center(cv_mask):
        br = cv.boundingRect(cv_mask)
        return br[0] + br[2] // 2, br[1] + br[3] // 2

    def paste(self, src, dst, src_mask, flag):
        src_mask_cv = tensor2opencv(src_mask, 1)
        cx, cy = SeamlessCloneSimpler.get_center(src_mask_cv)
        sc = SeamlessClone()
        return sc.paste(src, dst, src_mask, flag, cx, cy)

```
