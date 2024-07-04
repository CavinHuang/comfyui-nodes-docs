
# Documentation
- Class name: M-LSDPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

M-LSDPreprocessor节点用于使用M-LSD（Multiple Line Segment Detector）模型从图像中提取线段。它处理图像以检测和描绘线条结构，这对于需要理解几何形状和边界的各种计算机视觉任务来说至关重要。

# Input types
## Required
- image
    - 需要进行线段检测处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

## Optional
- score_threshold
    - 定义线段检测置信度的阈值。较高的值会导致检测到的线段更少，但更可靠。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dist_threshold
    - 设置分隔线段的距离阈值。较小的值会导致对紧密排列的线条进行更精细的分割。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 指定处理前将输入图像调整到的分辨率。影响检测到的线段的尺度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出一个带有叠加或突出显示的检测线段的图像，便于进一步处理或分析。
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
