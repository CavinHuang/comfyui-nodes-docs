
# Documentation
- Class name: LineArtPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

LineArtPreprocessor节点旨在从图像中提取线条艺术，特别专注于创建逼真的线条艺术表现。它使用一个专门的模型来处理图像，并可选择性地允许调整线条艺术的粗糙程度。

# Input types
## Required
- image
    - 需要进行线条艺术提取处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- coarse
    - 该参数允许用户切换线条艺术提取的粗糙度，可以在更详细或更概括的表现之间进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定图像应该被处理的分辨率，影响提取的线条艺术的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个经过处理以提取逼真线条艺术的图像，适用于各种艺术和设计应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [Control Net Stacker](../../efficiency-nodes-comfyui/Nodes/Control Net Stacker.md)
    - [ImageInvert](../../Comfy/Nodes/ImageInvert.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)



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
