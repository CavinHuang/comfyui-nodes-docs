
# Documentation
- Class name: Inference_Core_DepthAnythingPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_DepthAnythingPreprocessor节点是为深度估计任务设计的图像预处理工具。它能够根据不同场景（如室内外环境）或特定的模型检查点来选择合适的模型进行处理。该节点通过抽象化模型选择和预处理步骤的复杂性，为深度估计提供了一个简化的接口。

# Input types
## Required
- image
    - 需要进行深度估计的输入图像。这是深度估计模型操作的主要对象。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- ckpt_name
    - 深度估计模型的检查点文件名。通过这个参数可以选择不同的预训练模型，以适应特定的深度估计需求。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定进行深度估计的分辨率，影响输出深度图的质量和细节程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个代表输入图像估计深度图的图像，以可视化方式呈现深度信息。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
