
# Documentation
- Class name: PixelPerfectResolution
- Category: ControlNet Preprocessors
- Output node: False

PixelPerfectResolution节点旨在计算出用于调整图像大小的最佳分辨率，以实现像素级完美清晰度。它考虑了图像的原始尺寸和目标尺寸，以及指定的调整大小模式，来计算出能够最大程度保持图像视觉完整性的最合适分辨率。

# Input types
## Required
- original_image
    - 需要调整大小的原始图像。它对于确定应用调整大小操作前的基础尺寸至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray
- image_gen_width
    - 图像生成的目标宽度。它影响缩放因子和最终分辨率的计算。
    - Comfy dtype: INT
    - Python dtype: int
- image_gen_height
    - 图像生成的目标高度。与image_gen_width类似，它影响缩放因子和最终分辨率的结果。
    - Comfy dtype: INT
    - Python dtype: int
- resize_mode
    - 指定调整大小的模式（例如，OUTER_FIT, INNER_FIT），这直接影响最终分辨率的计算方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: ResizeMode

# Output types
- RESOLUTION (INT)
    - 计算得出的用于调整图像大小的最佳分辨率，确保像素级完美清晰度。
    - Comfy dtype: INT
    - Python dtype: int


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
