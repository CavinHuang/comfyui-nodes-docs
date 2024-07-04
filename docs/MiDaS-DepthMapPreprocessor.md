
# Documentation
- Class name: MiDaS-DepthMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False

MiDaS深度图节点采用MiDaS模型对输入图像进行预处理,生成深度图。这一过程增强了图像的深度感知,为后续处理或可视化提供基础。

# Input types
## Required
- image
    - image参数是用于生成深度图的输入图像,是深度估计的主要数据来源。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- a
    - a参数用于调整深度估计的敏感度,影响深度图对距离和深度的感知。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bg_threshold
    - bg_threshold参数设置背景分离的阈值,有助于在深度图中区分前景和背景元素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - resolution参数指定生成深度图的分辨率,影响输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一张表示深度图的图像,其中像素强度对应从摄像机视角估计的深度。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - Reroute
    - [Control Net Stacker](../../efficiency-nodes-comfyui/Nodes/Control Net Stacker.md)



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
