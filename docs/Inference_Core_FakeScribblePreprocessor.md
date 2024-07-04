
# Documentation
- Class name: Inference_Core_FakeScribblePreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

Inference_Core_FakeScribblePreprocessor节点旨在对图像进行预处理，生成模拟手绘涂鸦线条的效果。它利用改进的HED边缘检测模型创建风格化的线条图，模仿涂鸦效果，为艺术和创意应用提供了一种替代传统边缘检测方法的选择。

# Input types
## Required
- image
    - 需要进行假涂鸦线条生成处理的输入图像。它是节点执行的主要数据来源，决定了最终的视觉输出效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- safe
    - 模式选择器，用于启用或禁用图像处理过程中的安全特性，影响最终涂鸦线条的呈现效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定图像处理应该执行的分辨率，影响生成的涂鸦线条的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 处理后带有假涂鸦线条的图像，呈现原始输入的风格化版本。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Fake_Scribble_Preprocessor:
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
        out = common_annotator_call(model, image, resolution=resolution, scribble=True, safe=kwargs["safe"]=="enable")
        del model
        return (out, )

```
