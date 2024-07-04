
# Documentation
- Class name: CtrlNet MiDaS Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

CtrlNet MiDaS Pipe节点旨在处理使用MiDaS模型进行深度估计的设置，将配置封装成适合在管道中进一步处理或应用的格式。它主要根据输入设置调整深度相关参数。

# Input types
## Required
- midas_settings
    - 指定深度估计的配置，包括源、强度、起始、结束和额外参数，这些参数共同决定如何执行深度估计。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, float, float, float, float, float]

# Output types
- midas_source
    - 识别用于深度估计的源图像。
    - Comfy dtype: INT
    - Python dtype: int
- midas_strength
    - 指定深度效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midas_start
    - 定义深度效果应用的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midas_end
    - 标记深度效果应用的结束点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midas_a
    - 调整特定的深度参数，影响整体深度效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- midas_bg
    - 控制背景深度参数，影响背景深度的渲染方式。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_MiDaS_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "midas_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT", "FLOAT", "FLOAT", "FLOAT", "FLOAT", "FLOAT",)
    RETURN_NAMES = ("midas_source", "midas_strength", "midas_start", "midas_end", "midas_a", "midas_bg",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,midas_settings):
        
        midas_source, midas_strength, midas_start, midas_end, midas_a, midas_bg = midas_settings

        return(midas_source, midas_strength, midas_start, midas_end, midas_a, midas_bg,)

```
