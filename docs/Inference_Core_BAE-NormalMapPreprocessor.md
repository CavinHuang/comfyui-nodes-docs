
# Documentation
- Class name: Inference_Core_BAE-NormalMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False

该节点旨在使用BAE（Boundary Aware Estimator，边界感知估计器）模型对图像进行预处理以进行法线贴图估计。它将图像调整至所需的分辨率和格式，然后通过BAE模型生成法线贴图。

# Input types
## Required
- image
    - 需要处理以生成法线贴图的输入图像。这是节点操作的主要数据，直接影响输出法线贴图的质量和准确性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定处理前将输入图像调整到的分辨率。这个参数影响输出法线贴图的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从输入图像生成的输出法线贴图，提供了表面法线的详细表示。
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
