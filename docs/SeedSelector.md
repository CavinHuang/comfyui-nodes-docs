
# Documentation
- Class name: SeedSelector
- Category: Art Venture/Utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SeedSelector节点旨在为程序化生成任务选择一个种子值，允许用户在随机和固定种子模式之间切换。这种灵活性既能通过固定种子实现结果的可重复性，又能通过随机种子生成各种各样的结果。

# Input types
## Required
- mode
    - 决定种子选择是随机的还是固定的，影响生成结果的可重复性和变异性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - 当模式设置为随机时使用的种子值，影响程序化生成过程。
    - Comfy dtype: INT
    - Python dtype: int
- fixed_seed
    - 当模式设置为固定时使用的种子值，确保生成结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seed
    - 选定的种子值，根据模式的不同可能是固定的或随机确定的，用于程序化生成。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute



## Source code
```python
class UtilSeedSelector:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mode": ("BOOLEAN", {"default": True, "label_on": "random", "label_off": "fixed"}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "fixed_seed": (
                    "INT",
                    {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF},
                ),
            }
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("seed",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_seed"

    def get_seed(self, mode, seed, fixed_seed):
        return (fixed_seed if not mode else seed,)

```
