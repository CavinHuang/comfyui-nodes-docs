# Documentation
- Class name: RandomGeneratorForList
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在根据给定的种子生成一系列随机数，确保相同的种子将产生相同的随机数列表，这对于各种应用中的可重复性至关重要。

# Input types
## Required
- signal
    - 信号参数代表触发随机数生成的输入数据。它非常重要，因为它可能会影响随机数生成器的初始化。
    - Comfy dtype: ANY
    - Python dtype: Any
## Optional
- seed
    - 种子参数对于确定随机数序列的起点至关重要。它确保相同的种子将产生相同的随机数列表，这对于可重复性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- unique_id
    - unique_id参数用于跟踪和管理每个唯一实例的随机数生成次数，确保每个实例都有一组不同的随机数序列。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- signal
    - 输出信号保留了原始的输入信号，表明随机数生成过程已经完成。
    - Comfy dtype: ANY
    - Python dtype: Any
- random_value
    - random_value输出代表新生成的种子，这是一个随机整数，可以用于进一步的随机数生成或其他目的。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class RandomGeneratorForList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'signal': (utils.any_typ,), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = (utils.any_typ, 'INT')
    RETURN_NAMES = ('signal', 'random_value')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

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