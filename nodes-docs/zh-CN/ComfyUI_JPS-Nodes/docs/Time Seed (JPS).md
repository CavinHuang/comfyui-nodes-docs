
# Documentation
- Class name: Time Seed (JPS)
- Category: JPS Nodes/Text
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Time Seed节点基于当前时间生成唯一的种子值，也可以选择指定一个固定的种子值。这一功能对于确保需要随机化的过程的可重复性至关重要，它通过提供一种方式来初始化随机数生成器，使其具有一致的起点。

# Input types
## Required
- fixed_seed
    - 指定一个固定的种子值，用于替代基于当前时间生成的种子。如果设置为0，则会生成一个基于时间的种子，确保每次执行时都有变化。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- seed
    - 生成的种子值，可以是基于当前时间生成的，也可以是指定的固定种子值。这个种子值用于初始化随机数生成器。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Time_Seed:
#    time_format = ["%Y%m%d%H%M%S","%Y%m%d%H%M","%Y%m%d","%Y-%m-%d-%H_%M_%S","%Y-%m-%d-%H_%M","%Y-%m-%d","%Y-%m-%d %H_%M_%S","%Y-%m-%d %H_%M","%Y-%m-%d","%H%M","%H%M%S","%H_%M","%H_%M_%S"]
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "fixed_seed": ("INT", {"default": 0, "min": 0, "max": 99999999999, "step": 1}),
            }
        }
    
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("seed",)
    FUNCTION = "get_seed"

    CATEGORY = "JPS Nodes/Text"

    def get_seed(self, fixed_seed):
        now = datetime.now()
        time = now.strftime("%Y%m%d%H%M%S")
        seed_out = int(time) + np.random.randint(999999)
        if fixed_seed != 0:
            seed_out=fixed_seed

        return (int(seed_out),)

    @classmethod
    def IS_CHANGED(s, seed_out):
        now = datetime.now()
        forceupdate = now.strftime("%Y%m%d%H%M%S")
        forceupdate = forceupdate + np.random.randint(99999999) + seed_out
        return (forceupdate,)

```
