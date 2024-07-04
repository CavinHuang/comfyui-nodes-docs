
# Documentation
- Class name: ImageIntensityDetector
- Category: ControlNet Preprocessors/Recolor
- Output node: False

ImageIntensityDetector 节点专门用于通过调整图像的强度水平来预处理图像。这种调整是通过伽马校正实现的，在进一步处理之前增强图像的整体可见度和对比度。

# Input types
## Required
- image
    - 需要进行强度调整（通过伽马校正）的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

## Optional
- gamma_correction
    - 指定用于调整图像强度的伽马校正因子。较高的值会使图像变亮，较低的值会使图像变暗，显著影响输出的视觉质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 在应用强度调整之前，图像被调整到的分辨率，影响输出的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个经过强度水平调整的图像，适用于视觉分析或进一步的图像处理任务。
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
