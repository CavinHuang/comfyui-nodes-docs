
# Documentation
- Class name: Inference_Core_ScribblePreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

ScribblePreprocessor节点旨在预处理图像，以检测和提取涂鸦线条。它利用专门的模型来处理输入图像，增强或分离类似涂鸦的特征，适用于需要线条提取或艺术效果增强的应用。

# Input types
## Required
- image
    - 需要处理以进行涂鸦线条检测和提取的输入图像。这个参数对于定义模型将要分析和操作的视觉内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定在处理前将输入图像缩放到的分辨率。更高的分辨率可能导致更详细的涂鸦线条检测，但可能会增加计算时间。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理的图像，其中涂鸦线条被检测并增强或分离，适合进一步的艺术或分析应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Scribble_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.scribble import ScribbleDetector

        model = ScribbleDetector()
        return (common_annotator_call(model, image, resolution=resolution), )

```
