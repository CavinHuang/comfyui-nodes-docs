
# Documentation
- Class name: Inference_Core_HEDPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

Inference_Core_HEDPreprocessor节点是一个专门用于从图像中提取软边缘线条的预处理器,它利用HED(整体嵌套边缘检测)模型来实现这一功能。该节点通过增强图像的边缘特征来预处理图像,为需要详细边缘或线条信息的下游任务提供支持。

# Input types
## Required
- image
    - 需要进行边缘检测处理的输入图像。resolution参数允许指定所需的输出分辨率,从而影响检测到的边缘的细节程度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- safe
    - 一个模式开关,用于在边缘检测过程中启用或禁用安全检查,可能会影响处理性能和输出质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定输出图像的分辨率,影响检测到的边缘的精细度。较高的分辨率会产生更详细的边缘信息。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理的图像,具有增强的边缘细节,适用于各种图像分析和处理任务。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class HED_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            safe=(["enable", "disable"], {"default": "enable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.hed import HEDdetector

        model = HEDdetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, safe = kwargs["safe"] == "enable")
        del model
        return (out, )

```
