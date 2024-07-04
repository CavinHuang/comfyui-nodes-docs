
# Documentation
- Class name: Inference_Core_MiDaS-NormalMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点用于使用MiDaS模型对图像进行预处理，以生成法线贴图。它根据指定的参数调整图像，以提高法线贴图生成的质量，从而增强视觉内容的深度感知。

# Input types
## Required
- image
    - 需要进行法线贴图估计的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- a
    - 'a'参数影响法线贴图效果的强度，允许对深度估计过程进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bg_threshold
    - 'bg_threshold'参数设置背景检测的敏感度，有助于在深度估计中区分前景元素和背景。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 指定输出法线贴图的分辨率，影响深度估计的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出表示估计法线贴图的图像，增强视觉内容的深度感知。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
