
# Documentation
- Class name: HEDPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

HEDPreprocessor节点使用HED（全息嵌套边缘检测）模型从图像中提取软边缘线条。它预处理图像以增强或分离线条特征，适用于需要详细边缘或线条检测的任务。

# Input types
## Required
- image
    - 需要进行边缘检测处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- safe
    - 一个开关，用于启用或禁用处理过程中的安全检查，可能会影响输出的保真度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 在处理前将输入图像调整到的分辨率。更高的分辨率可能会提高细节，但会增加计算量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理后的图像，具有增强或分离的软边缘线条。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)



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
