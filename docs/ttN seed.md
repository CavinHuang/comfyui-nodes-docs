
# Documentation
- Class name: ttN seed
- Category: ttN/util
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ttN_SEED节点专门用于管理和使用种子值，以确保在不同运行中产生一致且可重现的结果。它是需要确定性输出的过程中的基础元素。

# Input types
## Required
- seed
    - seed参数用于设置数字生成的特定起点，使操作能够产生确定性行为。它在确保结果可重现性方面起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seed
    - 此输出代表操作中使用的种子值，允许对过程进行追踪和重现。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode (BlenderNeko Advanced + NSP)](../../was-node-suite-comfyui/Nodes/CLIPTextEncode (BlenderNeko Advanced + NSP).md)
    - [OneButtonPrompt](../../OneButtonPrompt/Nodes/OneButtonPrompt.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - KRestartSamplerAdv
    - [DetailerForEachDebug](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebug.md)



## Source code
```python
class ttN_SEED:
    version = '1.0.0'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                },
                "hidden": {"ttNnodeVersion": ttN_SEED.version},
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("seed",)
    FUNCTION = "plant"
    OUTPUT_NODE = True

    CATEGORY = "ttN/util"

    @staticmethod
    def plant(seed):
        return seed,

```
