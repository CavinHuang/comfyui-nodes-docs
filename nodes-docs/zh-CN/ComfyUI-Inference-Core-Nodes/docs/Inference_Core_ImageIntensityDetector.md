
# Documentation
- Class name: Inference_Core_ImageIntensityDetector
- Category: ControlNet Preprocessors/Recolor
- Output node: False

Inference_Core_ImageIntensityDetector节点是一个专门用于图像预处理的工具，主要通过调整图像的亮度级别来实现图像增强。该节点利用伽马校正技术来修改图像强度，旨在提升图像质量或实现特定的视觉效果。

# Input types
## Required
- image
    - 需要处理的输入图像。这是进行亮度调整（通过伽马校正）的主要对象。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- gamma_correction
    - 指定用于调整图像亮度级别的伽马校正因子。这个参数在预处理过程中起着关键作用，直接影响输出图像的亮度和对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 定义输出图像的分辨率。这个参数决定了在处理过程中图像将被调整到的尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一张基于指定伽马校正进行了亮度调整的图像。这种经过处理的图像适合进一步分析或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageIntensityDetector:
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
        return (common_annotator_call(Recolorizer(), image, mode="intensity", gamma_correction=gamma_correction , resolution=resolution), )

```
