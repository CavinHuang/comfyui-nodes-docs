
# Documentation
- Class name: InstantID Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

这个节点用于配置生成InstantID的设置，允许自定义各种参数，如影响权重、强度、噪声级别以及ID生成过程的起始和结束点。

# Input types
## Required
- ip_weight
    - 定义InstantID的影响权重，影响其在生成过程中的整体作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cn_strength
    - 设置内容噪声的强度，影响生成的InstantID的可变性和独特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - 指定要添加到InstantID的噪声级别，增加其随机性和复杂性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start
    - 确定InstantID生成的起始点，允许分阶段或渐进式应用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end
    - 定义InstantID生成的结束点，标志着其应用的完成。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- instantid_settings
    - 输出配置好的InstantID设置，以元组形式呈现，可直接用于生成过程。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[float, float, float, float, float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantID_Settings:

    ipamasktype = ["No Mask","Mask Editor","Mask Editor (inverted)","Red from Image","Green from Image","Blue from Image"]        
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ip_weight": ("FLOAT", {"default": 0.8, "min": 0, "max": 1, "step": 0.01}),
                "cn_strength": ("FLOAT", {"default": 0.65, "min": 0, "max": 10, "step": 0.01}),
                "noise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.1, }),
                "start": ("FLOAT", {"default": 0.00, "min": 0, "max": 1, "step": 0.05}),
                "end": ("FLOAT", {"default": 1.00, "min": 0, "max": 1, "step": 0.05}),
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("instantid_settings",)
    FUNCTION = "get_instantid"

    CATEGORY="JPS Nodes/Settings"

    def get_instantid(self,ip_weight,cn_strength,noise,start,end):

        instantid_settings = ip_weight,cn_strength,noise,start,end

        return(instantid_settings,)

```
