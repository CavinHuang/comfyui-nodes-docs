
# Documentation
- Class name: ImageLuminanceDetector
- Category: ControlNet Preprocessors/Recolor
- Output node: False

ImageLuminanceDetector节点旨在基于伽马校正分析和调整图像的亮度。它利用controlnet_aux库中的Recolorizer来修改图像的亮度，目的是提高图像质量或实现特定的视觉效果。

# Input types
## Required
- image
    - 需要进行亮度调整的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

## Optional
- gamma_correction
    - 指定用于调整图像亮度的伽马校正因子。较高的值会使图像变亮，较低的值会使图像变暗，从而影响整体视觉输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 在应用亮度调整之前将图像调整到的分辨率，影响输出的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出经过亮度调整的修改后的图像，基于应用的伽马校正增强或改变视觉外观。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageLuminanceDetector:
    @classmethod
    def INPUT_TYPES(s):
        #https://github.com/Mikubill/sd-webui-controlnet/blob/416c345072c9c2066101e225964e3986abe6945e/scripts/processor.py#L1229
        return create_node_input_types(
            gamma_correction=("FLOAT", {"default": 1.0, "min": 0.1, "max": 2.0, "step": 0.001})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Recolor"

    def execute(self, image, gamma_correction, resolution=512, **kwargs):
        from controlnet_aux.recolor import Recolorizer
        return (common_annotator_call(Recolorizer(), image, mode="luminance", gamma_correction=gamma_correction , resolution=resolution), )

```
