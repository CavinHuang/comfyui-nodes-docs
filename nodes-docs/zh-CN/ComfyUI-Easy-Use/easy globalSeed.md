# Documentation
- Class name: globalSeed
- Category: EasyUse/Seed
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

此类封装了生成和管理系统内各种操作的随机种子的功能，确保实验和模型训练的环境可控且可复现。

# Input types
## Required
- value
    - “value”参数在指定初始种子值方面至关重要，这对于确保系统随机过程的可复现性非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - “mode”参数决定了种子生成的控制机制，决定了种子是在生成过程之前还是之后设置，从而影响了系统的整体随机性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- action
    - “action”参数提供了多种种子操作策略，允许在系统执行期间对种子进行动态调整，这对于迭代或分支过程至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- last_seed
    - “last_seed”参数作为最近使用的种子的参考，便于系统随机化过程的连续性和追踪。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - “result”输出提供了种子管理操作的结构化摘要，封装了随机化过程的结果和应用的设置。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class globalSeed:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM}), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'control_before_generate', 'label_off': 'control_after_generate'}), 'action': (['fixed', 'increment', 'decrement', 'randomize', 'increment for each node', 'decrement for each node', 'randomize for each node'],), 'last_seed': ('STRING', {'default': ''})}}
    RETURN_TYPES = ()
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Seed'
    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}
```