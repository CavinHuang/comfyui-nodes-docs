# Documentation
- Class name: GlobalSeed
- Category: InspirePack/Prompt
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

GlobalSeed节点旨在通过使用种子值来管理和控制生成过程。它允许用户通过不同的模式来决定生成的随机性，确保输出的一致性或多样性。

# Input types
## Required
- value
    - “value”参数对于设置生成过程的种子至关重要。通过改变种子，可以控制输出的变异性，从而产生可复现或多样化的结果。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - “mode”参数决定种子值如何影响生成过程。它提供了多种模式，如'fixed'、'increment'和'randomize'，每种模式对输出的影响不同，为生成过程提供了灵活性。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- action
    - “action”参数提供了一组选项，进一步细化种子对生成的影响。它与“mode”参数协同工作，允许对结果的随机性和一致性进行精细控制。
    - Comfy dtype: COMBO
    - Python dtype: str
- last_seed
    - “last_seed”参数用于从之前的生成中继承一个种子，使得不同生成过程的运行之间具有连续性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output
    - GlobalSeed节点的输出提供了生成过程的结果，包含了输入参数控制的随机性。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class GlobalSeed:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'control_before_generate', 'label_off': 'control_after_generate'}), 'action': (['fixed', 'increment', 'decrement', 'randomize', 'increment for each node', 'decrement for each node', 'randomize for each node'],), 'last_seed': ('STRING', {'default': ''})}}
    RETURN_TYPES = ()
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'
    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}
```