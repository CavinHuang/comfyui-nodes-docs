
# Documentation
- Class name: PiDiNetPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

PiDiNetPreprocessor节点旨在使用PiDiNet模型对图像进行预处理以提取软边缘线条。它的目标是通过提供精炼的输入来增强图像分析和处理任务，为进一步的处理或分析做准备。

# Input types
## Required
- image
    - 需要处理以提取软边缘线条的输入图像。这是节点操作的主要数据，旨在增强其特征以供后续分析使用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- safe
    - 一个模式选择器，用于确定是否在安全模式下执行操作。启用"安全"模式可确保预处理遵守安全约束，可能会影响输出的保真度和细节，以降低处理过程中的风险。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定处理图像的分辨率。较高的分辨率会导致更详细的软边缘线条提取，而较低的分辨率可能会加快处理速度，但会牺牲细节。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 带有提取的软边缘线条的处理后图像，可用于进一步的分析或处理步骤。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)



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
