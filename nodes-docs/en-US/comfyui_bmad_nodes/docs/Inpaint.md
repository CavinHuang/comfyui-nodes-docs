---
tags:
- DepthMap
- Image
- Inpaint
---

# Inpaint
## Documentation
- Class name: `Inpaint`
- Category: `Bmad/CV/C.Photography`
- Output node: `False`

The Inpaint node is designed to reconstruct missing or damaged parts of images by utilizing a specified inpainting technique. It leverages a mask to identify the areas to be inpainted and applies a chosen algorithm to fill in these regions seamlessly, enhancing the overall image quality.
## Input types
### Required
- **`img`**
    - The 'img' parameter represents the image to be inpainted. It is crucial as it provides the visual data on which the inpainting operation is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The 'mask' parameter specifies the areas within the image that require inpainting. It plays a key role in guiding the inpainting process to the intended regions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`radius`**
    - The 'radius' parameter determines the neighborhood size around each point for inpainting, affecting the smoothness and extent of the inpainting effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`flag`**
    - The 'flag' parameter allows selection of the inpainting algorithm to be used, offering flexibility in choosing the method best suited for the image's specific needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the inpainted image, where the specified areas have been reconstructed using the chosen inpainting technique.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Inpaint:
    inpaint_method_map = {
        "TELEA": cv.INPAINT_TELEA,
        "NS": cv.INPAINT_NS,
    }
    inpaint_methods = list(inpaint_method_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "img": ("IMAGE",),
                "mask": ("IMAGE",),
                "radius": ("INT", {"default": 3, "min": 0, "step": 1}),
                "flag": (s.inpaint_methods, {"default": s.inpaint_methods[0]}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "paint"
    CATEGORY = "Bmad/CV/C.Photography"

    def paint(self, img, mask, radius, flag):
        img = tensor2opencv(img)
        mask = tensor2opencv(mask, 1)
        dst = cv.inpaint(img, mask, radius, self.inpaint_method_map[flag])
        result = opencv2tensor(dst)
        return (result,)

```
