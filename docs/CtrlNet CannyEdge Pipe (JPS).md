
# Documentation
- Class name: CtrlNet CannyEdge Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

CtrlNet CannyEdge Pipe节点旨在处理Canny边缘检测的设置，返回多个参数，如源、强度、起始、结束和阈值。该节点属于JPS Nodes/Pipes类别，专注于通过应用Canny边缘检测算法进行图像处理和操作。

# Input types
## Required
- cannyedge_settings
    - 指定Canny边缘检测的配置，包括源、强度、起始和结束位置，以及低阈值和高阈值。这个输入对于确定边缘检测的执行方式和灵敏度至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, float, float, float, int, int]

# Output types
- cannyedge_source
    - Canny边缘检测的图像来源。
    - Comfy dtype: INT
    - Python dtype: int
- cannyedge_strength
    - Canny边缘检测效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cannyedge_start
    - 应用Canny边缘检测的起始位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cannyedge_end
    - 应用Canny边缘检测的结束位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cannyedge_low
    - Canny边缘检测的低阈值。
    - Comfy dtype: INT
    - Python dtype: int
- cannyedge_high
    - Canny边缘检测的高阈值。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_CannyEdge_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cannyedge_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT", "FLOAT", "FLOAT", "FLOAT", "INT", "INT", )
    RETURN_NAMES = ("cannyedge_source", "cannyedge_strength", "cannyedge_start", "cannyedge_end", "cannyedge_low", "cannyedge_high",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,cannyedge_settings):
        
        cannyedge_source, cannyedge_strength, cannyedge_start, cannyedge_end, cannyedge_low, cannyedge_high = cannyedge_settings

        return(cannyedge_source, cannyedge_strength, cannyedge_start, cannyedge_end, cannyedge_low, cannyedge_high,)

```
