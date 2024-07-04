
# Documentation
- Class name: Inference_Core_CannyEdgePreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

Canny Edge预处理器节点是专为图像边缘检测设计的,它利用Canny边缘检测算法来突出图像中的轮廓和边缘。这一预处理步骤对于需要清晰描绘物体边界的任务至关重要,比如图像分割或特征提取过程。

# Input types
## Required
- image
    - 需要进行边缘检测处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- low_threshold
    - 指定Canny边缘检测算法中滞后阈值步骤的下限,用于控制弱边缘的检测。
    - Comfy dtype: INT
    - Python dtype: int
- high_threshold
    - 定义滞后阈值步骤的上限,用于确定图像中强边缘的检测。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 在应用Canny边缘检测算法之前,输入图像将被调整到的分辨率,影响检测到的边缘的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 使用Canny边缘检测技术处理后的图像,其中边缘被突出显示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Canny_Edge_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            low_threshold=("INT", {"default": 100, "min": 0, "max": 255, "step": 1}),
            high_threshold=("INT", {"default": 200, "min": 0, "max": 255, "step": 1})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, low_threshold, high_threshold, resolution=512, **kwargs):
        from controlnet_aux.canny import CannyDetector

        return (common_annotator_call(CannyDetector(), image, low_threshold=low_threshold, high_threshold=high_threshold, resolution=resolution), )

```
