
# Documentation
- Class name: Inference_Core_Zoe_DepthAnythingPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Zoe Depth Anything预处理器节点通过使用专为不同环境（室内或室外）训练的Zoe Depth Anything Detector模型来预处理图像，以进行深度估计。该节点旨在通过针对特定环境预处理图像来增强深度估计任务的效果。

# Input types
## Required
- image
    - 需要进行深度估计预处理的输入图像。这是深度估计预处理任务的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- environment
    - 指定图像的环境上下文（室内或室外），这将影响深度估计所使用的预训练模型的选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 输出图像的目标分辨率，影响深度估计的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 经过处理的图像，具有增强的深度估计特征，可用于进一步分析或使用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Zoe_Depth_Anything_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            environment=(["indoor", "outdoor"], {"default": "indoor"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, environment, resolution=512, **kwargs):
        from controlnet_aux.zoe import ZoeDepthAnythingDetector
        ckpt_name = "depth_anything_metric_depth_indoor.pt" if environment == "indoor" else "depth_anything_metric_depth_outdoor.pt"
        model = ZoeDepthAnythingDetector.from_pretrained(filename=ckpt_name).to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
