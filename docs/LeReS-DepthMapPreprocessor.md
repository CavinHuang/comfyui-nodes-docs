
# Documentation
- Class name: LeReS-DepthMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LeReS深度图预处理节点旨在增强图像的深度图估计。它利用LeReS模型对图像进行预处理，提供了移除最近物体和背景的选项，以及可选的增强模式以改进深度估计。

# Input types
## Required
- image
    - 需要进行深度图估计和增强的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- rm_nearest
    - 指定从深度图中移除最近物体的阈值，有助于突出更远处的元素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rm_background
    - 定义深度图中背景移除的阈值，有助于突出主要主体。
    - Comfy dtype: FLOAT
    - Python dtype: float
- boost
    - 启用名为"boost"的增强深度估计模式，可能会提高深度图质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定执行深度图估计的分辨率。较高的分辨率可能会提高细节，但需要更多的计算资源。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出经过增强的深度图图像，可选择移除最近物体和背景，并提供增强模式以改进深度估计。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class LERES_Depth_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            rm_nearest=("FLOAT", {"default": 0.0, "min": 0.0, "max": 100, "step": 0.1}),
            rm_background=("FLOAT", {"default": 0.0, "min": 0.0, "max": 100, "step": 0.1}),
            boost=(["enable", "disable"], {"default": "disable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, rm_nearest, rm_background, resolution=512, **kwargs):
        from controlnet_aux.leres import LeresDetector

        model = LeresDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, thr_a=rm_nearest, thr_b=rm_background, boost=kwargs["boost"] == "enable")
        del model
        return (out, )

```
