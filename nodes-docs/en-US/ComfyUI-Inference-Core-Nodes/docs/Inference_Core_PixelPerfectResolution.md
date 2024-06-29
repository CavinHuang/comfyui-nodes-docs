---
tags:
- ImageResolution
- ImageTransformation
---

# [Inference.Core] Pixel Perfect Resolution
## Documentation
- Class name: `Inference_Core_PixelPerfectResolution`
- Category: `ControlNet Preprocessors`
- Output node: `False`

This node is designed to compute the optimal resolution for image generation tasks, ensuring pixel-perfect accuracy by adjusting the image size based on target dimensions and a specified resizing mode. It focuses on achieving the highest fidelity in visual output, tailored to the requirements of the target resolution.
## Input types
### Required
- **`original_image`**
    - The original image as a numpy array, which serves as the basis for computing the optimal resolution.
    - Comfy dtype: `IMAGE`
    - Python dtype: `np.ndarray`
- **`image_gen_width`**
    - The target width for the image, guiding the computation towards achieving this dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_gen_height`**
    - The target height for the image, guiding the computation towards achieving this dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resize_mode`**
    - Specifies the mode of resizing (e.g., inner fit, outer fit) to determine how the image should be scaled to meet the target dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `ResizeMode`
## Output types
- **`RESOLUTION (INT)`**
    - Comfy dtype: `INT`
    - The computed optimal dimension (as an integer) for the image, ensuring pixel-perfect resolution.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


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
