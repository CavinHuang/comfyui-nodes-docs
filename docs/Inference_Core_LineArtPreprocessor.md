
# Documentation
- Class name: Inference_Core_LineArtPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

Inference_Core_LineArtPreprocessor节点旨在通过提取真实风格的线条艺术来预处理图像。它利用专门的模型将输入图像转换为线条绘图，目的是增强或准备图像以供进一步处理或艺术应用。

# Input types
## Required
- image
    - 需要进行线条艺术提取处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- coarse
    - 决定是否以粗略方式执行线条艺术提取。启用此选项会修改提取过程，可能会改变结果线条艺术中的细节水平。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定执行线条艺术提取的分辨率，影响输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是经过处理以提取真实风格线条艺术的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LineArt_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            coarse=(["disable", "enable"], {"default": "disable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.lineart import LineartDetector

        model = LineartDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, coarse = kwargs["coarse"] == "enable")
        del model
        return (out, )

```
