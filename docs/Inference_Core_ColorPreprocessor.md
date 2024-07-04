
# Documentation
- Class name: Inference_Core_ColorPreprocessor
- Category: ControlNet Preprocessors/T2IAdapter-only
- Output node: False

Inference_Core_ColorPreprocessor节点旨在分析和处理图像以检测和调整其调色板。它利用颜色检测算法根据指定的分辨率来增强或修改图像的颜色属性。

# Input types
## Required
- image
    - 待处理的输入图像，将进行颜色检测和调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定进行颜色检测和调整的分辨率，影响输出的精度和质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 基于颜色检测算法处理后的图像，其颜色属性已被调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Color_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/T2IAdapter-only"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.color import ColorDetector

        return (common_annotator_call(ColorDetector(), image, resolution=resolution), )

```
