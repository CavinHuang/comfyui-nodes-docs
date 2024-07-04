
# Documentation
- Class name: Inference_Core_Zoe-DepthMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False

Zoe深度图预处理器节点旨在使用ZoeDepth模型处理图像以估计深度图。它利用预训练模型生成深度估计，增强对图像中空间关系的理解，可用于各种应用场景。

# Input types
## Required
- image
    - 需要进行深度图估计的输入图像。该图像将由ZoeDepth模型处理以生成深度估计。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - resolution参数指定深度图的期望输出分辨率。它允许调整深度估计的细节级别。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是输入图像的深度图，提供逐像素的深度估计。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Zoe_Depth_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.zoe import ZoeDetector

        model = ZoeDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
