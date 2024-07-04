
# Documentation
- Class name: FakeScribblePreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

FakeScribblePreprocessor节点用于预处理图像以模拟手绘线条效果，它利用了经过修改的HED（全息嵌套边缘检测）模型。该节点旨在生成具有类似手绘线条的图像，这在各种图像处理和计算机视觉任务中非常有用，特别是在需要将边缘风格化为手绘线条的场景中。

# Input types
## Required
- image
    - 需要处理以模拟手绘线条的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- safe
    - 一种模式，启用时会应用安全机制到预处理过程中，可能会改变处理方式以避免不良效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 执行图像处理的分辨率。此参数允许调整输出图像的细节级别。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从输入图像处理得到的模拟手绘线条的输出图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



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
