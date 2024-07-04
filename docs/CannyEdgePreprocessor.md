
# Documentation
- Class name: CannyEdgePreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

CannyEdgePreprocessor节点专门用于使用Canny算法进行图像边缘检测。它通过应用Canny边缘检测器来预处理图像，突出显示图像中的边缘，使其适用于进一步的图像处理或分析任务。

# Input types
## Required
- image
    - image参数是输入图像，将使用Canny算法对其进行边缘检测。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- low_threshold
    - low_threshold参数为Canny边缘检测算法中滞后阈值步骤设置下限。它有助于识别图像中的弱边缘。
    - Comfy dtype: INT
    - Python dtype: int
- high_threshold
    - high_threshold参数为Canny边缘检测算法中滞后阈值步骤设置上限。它对于区分图像中的强边缘至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - resolution参数指定在应用Canny边缘检测算法之前，输入图像将被调整到的分辨率。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一张使用Canny边缘检测算法突出显示边缘的图像。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - Reroute
    - [Control Net Stacker](../../efficiency-nodes-comfyui/Nodes/Control Net Stacker.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)



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
