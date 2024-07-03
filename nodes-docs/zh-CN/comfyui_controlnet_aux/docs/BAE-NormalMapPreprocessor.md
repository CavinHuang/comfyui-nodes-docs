
# Documentation
- Class name: BAE-NormalMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False

BAE-NormalMapPreprocessor节点旨在使用BAE (Boundary Aware Encoder) 模型对图像进行预处理以生成法线图。它通过估算表面法线来增强图像，为进一步处理或可视化做准备。

# Input types
## Required
- image
    - 需要处理以生成法线图的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- resolution
    - 处理前将输入图像调整到的分辨率。这会影响生成的法线图的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从输入图像生成的输出法线图，提供表面法线的估计。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BAE_Normal_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.normalbae import NormalBaeDetector

        model = NormalBaeDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out,)

```
