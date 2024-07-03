
# Documentation
- Class name: ScribblePreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

ScribblePreprocessor节点旨在预处理图像以检测涂鸦线条。它利用特定模型来分析和处理输入图像，目的是突出或提取类似涂鸦的图案。

# Input types
## Required
- image
    - 需要处理以进行涂鸦线条检测的输入图像。这个参数至关重要，因为它提供了涂鸦检测模型操作的视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定在处理之前将输入图像调整到的分辨率。这会影响涂鸦线条检测的细节程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经处理后检测或突出显示涂鸦线条的图像。这个输出对于涂鸦图案的进一步处理或可视化很有用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)



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
