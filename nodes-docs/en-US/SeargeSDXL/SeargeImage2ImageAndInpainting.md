---
tags:
- DepthMap
- Image
- Inpaint
---

# Image to Image and Inpainting v2
## Documentation
- Class name: `SeargeImage2ImageAndInpainting`
- Category: `Searge/UI/Inputs`
- Output node: `False`

This node is designed for image-to-image translation and inpainting tasks, allowing for the modification and enhancement of images by applying inpainting techniques and adjusting denoise levels.
## Input types
### Required
- **`denoise`**
    - Specifies the level of denoising to apply to the image, influencing the clarity and noise reduction in the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`inpaint_mask_blur`**
    - Determines the blur intensity of the inpainting mask, affecting the smoothness of the inpainting boundaries.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inpaint_mask_mode`**
    - Defines the mode of inpainting mask application, dictating how the mask is used to guide the inpainting process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`data`**
    - Optional data stream for additional processing or information, providing flexibility in handling image data.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - The modified image data stream, incorporating the applied inpainting and denoise adjustments.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeImage2ImageAndInpainting:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "denoise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01},),
                "inpaint_mask_blur": ("INT", {"default": 16, "min": 0, "max": 24, "step": 4},),
                "inpaint_mask_mode": (UI.MASK_MODES,),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(denoise, inpaint_mask_blur, inpaint_mask_mode):
        return {
            UI.F_DENOISE: round(denoise, 3),
            UI.F_INPAINT_MASK_BLUR: inpaint_mask_blur,
            UI.F_INPAINT_MASK_MODE: inpaint_mask_mode,
        }

    def get(self, denoise, inpaint_mask_blur, inpaint_mask_mode, data=None):
        if data is None:
            data = {}

        data[UI.S_IMG2IMG_INPAINTING] = self.create_dict(
            denoise,
            inpaint_mask_blur,
            inpaint_mask_mode,
        )

        return (data,)

```
