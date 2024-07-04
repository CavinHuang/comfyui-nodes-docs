
# Documentation
- Class name: MiDaS-NormalMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MiDaS-NormalMapPreprocessor 节点专门用于利用 MiDaS 模型从图像生成法线贴图。它预处理图像以增强深度估计，从而促进生成详细的法线贴图，这些贴图可用于 3D 建模和增强现实等各种应用。

# Input types
## Required
- image
    - image 参数是将生成法线贴图的输入图像，它作为深度估计和法线贴图创建的基础。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

## Optional
- a
    - a 参数用于调整深度估计的强度，影响生成的法线贴图中的对比度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bg_threshold
    - bg_threshold 参数设置背景分离的阈值，有助于在深度估计过程中将主体与背景隔离。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - resolution 参数指定执行深度估计和法线贴图生成的分辨率，影响输出的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个图像，代表从输入图像生成的法线贴图，提供详细的表面方向信息。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MIDAS_Normal_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            a =  ("FLOAT", {"default": np.pi * 2.0, "min": 0.0, "max": np.pi * 5.0, "step": 0.05}),
            bg_threshold = ("FLOAT", {"default": 0.1, "min": 0, "max": 1, "step": 0.05})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, a, bg_threshold, resolution=512, **kwargs):
        from controlnet_aux.midas import MidasDetector

        model = MidasDetector.from_pretrained().to(model_management.get_torch_device())
        #Dirty hack :))
        cb = lambda image, **kargs: model(image, **kargs)[1]
        out = common_annotator_call(cb, image, resolution=resolution, a=a, bg_th=bg_threshold, depth_and_normal=True)
        del model
        return (out, )

```
