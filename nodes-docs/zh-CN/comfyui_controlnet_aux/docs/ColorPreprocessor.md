
# Documentation
- Class name: ColorPreprocessor
- Category: ControlNet Preprocessors/T2IAdapter-only
- Output node: False

ColorPreprocessor节点旨在通过使用专门的色彩检测模型来处理图像，检测并标注其中的颜色。这个预处理步骤对于需要在进一步处理之前进行颜色分析或修改的任务至关重要。

# Input types
## Required
- image
    - 需要进行色彩检测和标注处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- resolution
    - 指定输入图像在处理前应该调整到的分辨率。这个参数影响色彩检测的精确度和性能。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过色彩检测和标注处理后的图像。
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
