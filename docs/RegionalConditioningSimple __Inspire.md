
# Documentation
- Class name: RegionalConditioningSimple __Inspire
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/AlekPet/ComfyUI_Custom_Nodes_AlekPet

该节点专门用于将区域条件应用于给定输入，利用文本提示和掩码的组合来影响特定区域的生成过程。它集成了文本编码和掩码应用，以创建根据区域规格定制的条件输入。

# Input types
## Required
- clip
    - 表示用于将文本提示编码成适合条件化的格式的CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: str
- mask
    - 定义输入中应用条件化的区域的掩码。
    - Comfy dtype: MASK
    - Python dtype: numpy.ndarray
- strength
    - 决定指定区域内条件化效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 指定设置条件化区域的方法，可以是默认方法或基于掩码边界的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prompt
    - 用于生成条件化的文本提示。这将使用CLIP模型进行编码。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- conditioning
    - 输出是一个经过条件化处理的输入，根据指定的区域条件进行定制，可用于进一步处理或生成任务。
    - Comfy dtype: CONDITIONING
    - Python dtype: object


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalConditioningSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "clip": ("CLIP", ),
                "mask": ("MASK",),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (["default", "mask bounds"],),
                "prompt": ("STRING", {"multiline": True, "placeholder": "prompt"}),
            },
        }

    RETURN_TYPES = ("CONDITIONING", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, clip, mask, strength, set_cond_area, prompt):
        conditioning = nodes.CLIPTextEncode().encode(clip, prompt)[0]
        conditioning = nodes.ConditioningSetMask().append(conditioning, mask, set_cond_area, strength)[0]
        return (conditioning, )

```
