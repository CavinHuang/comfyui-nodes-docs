
# Documentation
- Class name: CtrlNet ZoeDepth Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

这个节点旨在处理ZoeDepth设置，将它们转换为可在进一步图像处理或渲染任务中使用的具体数值。它通过提供一个直观的接口来指定深度效果，从而抽象了处理深度相关参数的复杂性。

# Input types
## Required
- zoedepth_settings
    - 指定ZoeDepth的设置，包括深度效果的源、强度、起始点和终止点。这个输入对于确定如何在图像处理流程中应用深度效果至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, float, float, float]

# Output types
- zoe_source
    - 由ZoeDepth设置决定的深度信息来源。
    - Comfy dtype: INT
    - Python dtype: int
- zoe_strength
    - 深度效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoe_start
    - 深度效果的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- zoe_end
    - 深度效果的终止点。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_ZoeDepth_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "zoedepth_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT", "FLOAT", "FLOAT", "FLOAT",)
    RETURN_NAMES = ("zoe_source", "zoe_strength", "zoe_start", "zoe_end",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,zoedepth_settings):
        
        zoe_source, zoe_strength, zoe_start, zoe_end = zoedepth_settings

        return(zoe_source, zoe_strength, zoe_start, zoe_end,)

```
