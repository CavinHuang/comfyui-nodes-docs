
# Documentation
- Class name: Zoe_DepthAnythingPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False

Zoe_DepthAnythingPreprocessor节点用于图像深度估计预处理。它通过选择和应用适合指定环境（室内或室外）的深度估计模型来处理图像。该节点利用ZoeDepthAnythingDetector模型生成深度图，从而增强对图像中空间关系的理解。

# Input types
## Required
- image
    - 需要进行深度估计处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- environment
    - 决定用于深度估计的预训练模型选择，可在室内和室外环境之间选择，以优化深度图的准确性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定进行深度估计的分辨率。这会影响输出深度图的分辨率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是输入图像的深度图，提供像素级的深度值估计。
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
