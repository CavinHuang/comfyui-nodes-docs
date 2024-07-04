
# Documentation
- Class name: Inference_Core_MiDaS-DepthMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MiDaS Depth Map Preprocessor节点旨在利用MiDaS模型将输入图像转换为深度图。这一过程增强了图像中的深度感知，有助于3D建模、增强现实等多种应用，通过提供详细的深度估计来实现这一目标。

# Input types
## Required
- image
    - image参数是用于生成深度图的输入图像，作为深度估计的主要数据来源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- a
    - a参数影响深度图中法线的计算，从而影响输出中深度和纹理的感知。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bg_threshold
    - bg_threshold参数设置深度图中背景分离的阈值，通过过滤背景噪声来增强对前景元素的关注。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - resolution参数指定输出深度图的分辨率，影响生成的深度图的细节水平和尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个深度图图像，提供输入图像的像素级深度估计。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MIDAS_Depth_Map_Preprocessor:
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

        # Ref: https://github.com/lllyasviel/ControlNet/blob/main/gradio_depth2image.py
        model = MidasDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, a=a, bg_th=bg_threshold)
        del model
        return (out, )

```
