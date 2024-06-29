---
tags:
- ImageResolution
- ImageTransformation
---

# Pixel Perfect Resolution
## Documentation
- Class name: `PixelPerfectResolution`
- Category: `ControlNet Preprocessors`
- Output node: `False`

The PixelPerfectResolution node is designed to calculate the optimal resolution for resizing an image to achieve pixel-perfect clarity. It considers the original and target dimensions of the image, along with the specified resizing mode, to compute the most suitable resolution that maintains the image's visual integrity.
## Input types
### Required
- **`original_image`**
    - The original image to be resized. It's crucial for determining the base dimensions before applying the resizing operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `np.ndarray`
- **`image_gen_width`**
    - The target width for the image generation. It influences the scaling factor and the final resolution calculation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_gen_height`**
    - The target height for the image generation. Similar to image_gen_width, it affects the scaling factor and the final resolution outcome.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resize_mode`**
    - Specifies the mode of resizing (e.g., OUTER_FIT, INNER_FIT) which directly impacts how the final resolution is computed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `ResizeMode`
## Output types
- **`RESOLUTION (INT)`**
    - Comfy dtype: `INT`
    - The computed optimal resolution for resizing the image, ensuring pixel-perfect clarity.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [AIO_Preprocessor](../../comfyui_controlnet_aux/Nodes/AIO_Preprocessor.md)
    - [CannyEdgePreprocessor](../../comfyui_controlnet_aux/Nodes/CannyEdgePreprocessor.md)



## Source code
```python
class PixelPerfectResolution:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "original_image": ("IMAGE", ),
                "image_gen_width": ("INT", {"default": 512, "min": 64, "max": MAX_IMAGEGEN_RESOLUTION, "step": 8}),
                "image_gen_height": ("INT", {"default": 512, "min": 64, "max": MAX_IMAGEGEN_RESOLUTION, "step": 8}),
                #https://github.com/comfyanonymous/ComfyUI/blob/c910b4a01ca58b04e5d4ab4c747680b996ada02b/nodes.py#L854
                "resize_mode": (RESIZE_MODES, {"default": ResizeMode.RESIZE.value})
            }
        }
    
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("RESOLUTION (INT)", )
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors"

    def execute(self, original_image, image_gen_width, image_gen_height, resize_mode):
        _, raw_H, raw_W, _ = original_image.shape

        k0 = float(image_gen_height) / float(raw_H)
        k1 = float(image_gen_width) / float(raw_W)

        if resize_mode == ResizeMode.OUTER_FIT.value:
            estimation = min(k0, k1) * float(min(raw_H, raw_W))
        else:
            estimation = max(k0, k1) * float(min(raw_H, raw_W))

        log.debug(f"Pixel Perfect Computation:")
        log.debug(f"resize_mode = {resize_mode}")
        log.debug(f"raw_H = {raw_H}")
        log.debug(f"raw_W = {raw_W}")
        log.debug(f"target_H = {image_gen_height}")
        log.debug(f"target_W = {image_gen_width}")
        log.debug(f"estimation = {estimation}")

        return (int(np.round(estimation)), )

```
