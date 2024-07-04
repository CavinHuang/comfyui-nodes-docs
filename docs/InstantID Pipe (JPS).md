
# Documentation
- Class name: InstantID Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

InstantID Pipe节点旨在处理即时身份识别功能的设置，封装了处理各种参数（如权重、强度、噪声和范围）的逻辑，并返回这些处理后的设置以供身份识别任务进一步使用。

# Input types
## Required
- instantid_settings
    - 定义即时身份识别的设置，包括权重、强度、噪声、开始和结束等参数。每个参数在微调识别过程中都起着关键作用：'weight'调整对某些特征的强调程度，'strength'控制识别的稳健性，'noise'可以模拟识别场景中的变异性，'start'和'end'定义操作范围，确保对识别阶段的精确控制。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[float, float, float, float, float]

# Output types
- ip_weight
    - 影响识别过程的权重参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cn_strength
    - 控制网络影响的强度参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - 识别过程中的噪声水平参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start
    - 定义识别范围起始点的开始参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end
    - 定义识别范围终点的结束参数。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantID_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "instantid_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("FLOAT","FLOAT","FLOAT","FLOAT","FLOAT",)
    RETURN_NAMES = ("ip_weight","cn_strength","noise","start","end",)
    FUNCTION = "get_instantid"

    CATEGORY="JPS Nodes/Pipes"

    def get_instantid(self,instantid_settings):

        ip_weight,cn_strength,noise,start,end = instantid_settings

        return(ip_weight,cn_strength,noise,start,end)

```
