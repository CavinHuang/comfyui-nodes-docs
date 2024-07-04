
# Documentation
- Class name: Inference_Core_ImageLuminanceDetector
- Category: ControlNet Preprocessors/Recolor
- Output node: False

该节点专用于基于ControlNet预处理技术调整图像的亮度。它通过伽马校正来修改图像的亮度，旨在增强图像质量或调整图像以便进行后续处理步骤。

# Input types
## Required
- image
    - 需要处理亮度调整的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- gamma_correction
    - 指定用于调整图像亮度的伽马校正因子。较高的值会使图像变亮，较低的值会使图像变暗，从而影响整体图像处理的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 指定输出图像的分辨率，影响处理后图像的细节水平和大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个经过亮度调整的图像，通过伽马校正处理以增加或减少其亮度。
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
