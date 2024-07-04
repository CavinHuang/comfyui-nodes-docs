
# Documentation
- Class name: DSINE-NormalMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False

DSINE Normal Map预处理器节点旨在使用DSINE模型预处理图像以生成法线贴图。它通过调整视场角和迭代参数来优化模型的性能,从而从输入图像中生成详细的法线贴图。

# Input types
## Required
- image
    - 图像输入是生成法线贴图的目标,作为模型应用处理并生成法线贴图的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- fov
    - 视场角参数调整生成法线贴图的视角,影响结果图像中的深度感知和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- iterations
    - 迭代参数控制模型执行的优化步骤数量,影响生成的法线贴图的准确性和细节程度。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 分辨率参数指定生成的法线贴图的输出分辨率,影响细节水平和清晰度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个法线贴图图像,它以颜色形式直观地表示表面法线,提供输入图像表面几何形状的详细信息。
    - Comfy dtype: IMAGE
    - Python dtype: Tuple[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DSINE_Normal_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            fov=("FLOAT", {"min": 0.0, "max": 365.0, "step": 0.05, "default": 60.0}),
            iterations=("INT", {"min": 1, "max": 20, "step": 1, "default": 5})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, fov, iterations, resolution=512, **kwargs):
        from controlnet_aux.dsine import DsineDetector

        model = DsineDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, fov=fov, iterations=iterations, resolution=resolution)
        del model
        return (out,)

```
