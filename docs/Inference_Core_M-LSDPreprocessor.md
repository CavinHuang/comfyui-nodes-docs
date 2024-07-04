
# Documentation
- Class name: Inference_Core_M-LSDPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

M-LSD预处理器节点专门用于使用M-LSD（多级线段检测器）模型从图像中提取线段。它处理图像以检测和描绘线条结构，有助于需要理解视觉数据中几何形状和结构的任务。

# Input types
## Required
- image
    - 需要处理以进行线段检测的输入图像。它是M-LSD模型操作的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- score_threshold
    - 定义线段检测的置信度阈值。分数低于此阈值的线条将被丢弃，影响检测过程的敏感度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dist_threshold
    - 设置分离线段的距离阈值。此参数有助于区分紧密排列的线条，影响检测到的线条的精细程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 指定处理图像的分辨率。这会影响检测的尺度，并可能影响线段的检测。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个标注了检测到的线段的图像，直观地展示了M-LSD模型识别的几何结构。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MLSD_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            score_threshold = ("FLOAT", {"default": 0.1, "min": 0.01, "max": 2.0, "step": 0.01}),
            dist_threshold = ("FLOAT", {"default": 0.1, "min": 0.01, "max": 20.0, "step": 0.01})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, score_threshold, dist_threshold, resolution=512, **kwargs):
        from controlnet_aux.mlsd import MLSDdetector

        model = MLSDdetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, thr_v=score_threshold, thr_d=dist_threshold)
        return (out, )

```
