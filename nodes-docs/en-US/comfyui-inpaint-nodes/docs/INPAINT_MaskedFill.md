---
tags:
- Mask
---

# Fill Masked Area
## Documentation
- Class name: `INPAINT_MaskedFill`
- Category: `inpaint`
- Output node: `False`

The `MaskedFill` node is designed to fill masked areas of an image with specified fill methods, including a neutral color fill or advanced inpainting techniques. It leverages image processing and conditional operations to seamlessly blend filled areas with the surrounding image pixels, offering a versatile solution for image inpainting tasks.
## Input types
### Required
- **`image`**
    - The input image tensor to be processed, where masked areas are identified and filled according to the specified method.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - A tensor indicating the areas of the image to be filled. The mask guides the filling process, ensuring that only specified regions are altered.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`fill`**
    - Specifies the filling method to be used. Options include 'neutral' for a simple color fill and advanced methods like 'telea' and 'inpaint_ns' for more sophisticated inpainting.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`falloff`**
    - Determines the transition smoothness between filled areas and the original image, affecting the blending quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image tensor after the masked areas have been filled, showcasing the inpainting results.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskedFill:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "fill": (["neutral", "telea", "navier-stokes"],),
                "falloff": ("INT", {"default": 0, "min": 0, "max": 8191, "step": 1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "inpaint"
    FUNCTION = "fill"

    def fill(self, image: Tensor, mask: Tensor, fill: str, falloff: int):
        image = image.detach().clone()
        alpha = mask.expand(1, *mask.shape[-2:]).floor()
        falloff = make_odd(falloff)
        if falloff > 0:
            erosion = binary_erosion(alpha, falloff)
            alpha = alpha * gaussian_blur(erosion, falloff)

        if fill == "neutral":
            m = (1.0 - alpha).squeeze(1)
            for i in range(3):
                image[:, :, :, i] -= 0.5
                image[:, :, :, i] *= m
                image[:, :, :, i] += 0.5
        else:
            import cv2

            method = cv2.INPAINT_TELEA if fill == "telea" else cv2.INPAINT_NS
            alpha_np = alpha.squeeze(0).cpu().numpy()
            alpha_bc = alpha_np.reshape(*alpha_np.shape, 1)
            for slice in image:
                image_np = slice.cpu().numpy()
                filled_np = cv2.inpaint(
                    (255.0 * image_np).astype(np.uint8),
                    (255.0 * alpha_np).astype(np.uint8),
                    3,
                    method,
                )
                filled_np = filled_np.astype(np.float32) / 255.0
                filled_np = image_np * (1.0 - alpha_bc) + filled_np * alpha_bc
                slice.copy_(torch.from_numpy(filled_np))

        return (image,)

```
