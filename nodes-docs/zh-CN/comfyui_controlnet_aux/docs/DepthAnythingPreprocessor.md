
# Documentation
- Class name: DepthAnythingPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/isl-org/DPT

DepthAnythingPreprocessor节点旨在通过利用基于提供的检查点名称的不同预训练模型来预处理图像以进行深度估计任务。它抽象了模型选择和预处理步骤的复杂性，提供了一种从输入图像生成深度图的简化方法。

# Input types
## Required
- image
    - 需要处理以进行深度估计的输入图像。该图像经过变换后被输入到所选模型中以生成深度图。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- ckpt_name
    - 指定用于深度估计的预训练模型检查点。检查点的选择会影响模型的性能和准确性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 处理前将输入图像调整至的分辨率。此参数可能会影响生成的深度图的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是输入图像的深度图，提供像素级的深度估计。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)



## Source code
```python
class Depth_Anything_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            ckpt_name=(["depth_anything_vitl14.pth", "depth_anything_vitb14.pth", "depth_anything_vits14.pth"], {"default": "depth_anything_vitl14.pth"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, ckpt_name, resolution=512, **kwargs):
        from controlnet_aux.depth_anything import DepthAnythingDetector

        model = DepthAnythingDetector.from_pretrained(filename=ckpt_name).to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
