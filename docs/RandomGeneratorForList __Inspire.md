
# Documentation
- Class name: RandomGeneratorForList __Inspire
- Category: InspirePack/Util
- Output node: False

RandomGeneratorForList节点旨在基于给定的种子和唯一标识符生成随机值序列。它确保每个序列对其标识符是唯一的，从而在不同的执行过程中实现可重现的随机性。

# Input types
## Required
- signal
    - signal输入充当随机生成过程的触发器，确保节点的操作被启动。
    - Comfy dtype: *
    - Python dtype: utils.any_typ
- seed
    - seed输入决定了随机数生成的起点，确保序列的可重现性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- signal
    - signal输出保持不变地传递，作为节点操作中的连续性元素。
    - Comfy dtype: *
    - Python dtype: utils.any_typ
- random_value
    - random_value输出是一个新生成的随机数，为进一步处理提供了一个独特的元素。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RandomGeneratorForList:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "signal": (utils.any_typ,),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = (utils.any_typ, "INT",)
    RETURN_NAMES = ("signal", "random_value",)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, signal, seed, unique_id):
        if unique_id not in list_counter_map:
            count = 0
        else:
            count = list_counter_map[unique_id]

        list_counter_map[unique_id] = count + 1

        rn = random.Random()
        rn.seed(seed + count)
        new_seed = random.randint(0, 1125899906842624)

        return (signal, new_seed)

```
