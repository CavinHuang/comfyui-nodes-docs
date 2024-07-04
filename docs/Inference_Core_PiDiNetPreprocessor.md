
# Documentation
- Class name: Inference_Core_PiDiNetPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

PiDiNet预处理器节点旨在预处理图像以提取软边缘线条，利用PiDiNet模型实现增强线条检测。它支持可配置的安全模式和分辨率设置，以适应各种图像处理需求。

# Input types
## Required
- image
    - 需要进行线条提取处理的输入图像。这是PiDiNet模型操作的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- safe
    - 一种启用或禁用图像处理过程中安全检查的模式，影响执行路径并可能影响输出质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 处理前将输入图像调整到的分辨率，影响提取线条的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理的图像，展示了提取的线条，突显了PiDiNet模型在增强线条检测方面的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PIDINET_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            safe=(["enable", "disable"], {"default": "enable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, safe, resolution=512, **kwargs):
        from controlnet_aux.pidi import PidiNetDetector

        model = PidiNetDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, safe = safe == "enable")
        del model
        return (out, )

```
