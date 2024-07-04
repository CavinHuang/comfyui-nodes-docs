
# Documentation
- Class name: Inference_Core_PixelPerfectResolution
- Category: ControlNet Preprocessors
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_PixelPerfectResolution节点旨在为图像生成任务计算最佳分辨率。它通过基于目标尺寸和指定的调整模式来调整图像大小，确保像素完美的精确度。该节点专注于实现最高保真度的视觉输出，并根据目标分辨率的要求进行定制。

# Input types
## Required
- original_image
    - 作为计算最佳分辨率基础的原始图像（以numpy数组形式）。这个输入是整个处理过程的起点，决定了最终输出的基本特征。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray
- image_gen_width
    - 图像的目标宽度，指导计算过程以达到这个维度。它直接影响最终输出图像的横向尺寸，是决定视觉效果的关键参数之一。
    - Comfy dtype: INT
    - Python dtype: int
- image_gen_height
    - 图像的目标高度，指导计算过程以达到这个维度。它直接影响最终输出图像的纵向尺寸，与宽度一起决定了图像的整体比例和分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- resize_mode
    - 指定调整大小的模式（如内部适应、外部适应等），用于确定如何缩放图像以满足目标尺寸。这个参数决定了图像在调整过程中如何保持其原有特征，对最终视觉效果有重要影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: ResizeMode

# Output types
- RESOLUTION (INT)
    - 计算出的图像最佳维度（以整数形式），确保像素完美的分辨率。这个输出代表了经过优化后的图像尺寸，能够在保持原始图像特征的同时，最大程度地满足目标分辨率的要求。
    - Comfy dtype: INT
    - Python dtype: int


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
