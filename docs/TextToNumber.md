# Documentation
- Class name: TextToNumber
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点抽象了将文本数据转换为数值的过程，便于分析和处理基于文本的信息。它强调将输入文本转换为数值表示，这可以进一步用于各种计算任务。

# Input types
## Required
- text
    - 文本参数至关重要，因为它作为提取数值的来源。文本的质量和内容直接影响节点的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- random_number
    - 该参数决定了在从文本中提取数值后是否应用随机数生成过程，为结果增加了变化性。
    - Comfy dtype: COMBO
    - Python dtype: str
- max_num
    - max_num参数设置了随机数生成的上限，确保生成的数字保持在指定的范围内。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- seed
    - seed参数对于确保随机数生成过程的可重复性至关重要，允许在相同条件下获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- ui.text
    - 此输出包含原始文本输入，为了参考和上下文而保留，这对于理解数值结果的起源很重要。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- ui.num
    - ui.num输出代表从文本中提取的数值或随机数生成的结果，这是节点的主要输出，对后续计算至关重要。
    - Comfy dtype: INT
    - Python dtype: List[int]
- result
    - 结果输出是最终的数值，它是节点处理的结晶，对于进一步的分析或操作至关重要。
    - Comfy dtype: INT
    - Python dtype: Tuple[int]

# Usage tips
- Infra type: CPU

# Source code
```
class TextToNumber:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': False, 'default': '1'}), 'random_number': (['enable', 'disable'],), 'max_num': ('INT', {'default': 10, 'min': 2, 'max': 10000000000, 'step': 1, 'display': 'number'})}, 'optional': {'seed': (any_type, {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, text, random_number, max_num, seed=0):
        numbers = re.findall('\\d+', text)
        result = 0
        for n in numbers:
            result = int(n)
        if random_number == 'enable' and result > 0:
            result = random.randint(1, max_num)
        return {'ui': {'text': [text], 'num': [result]}, 'result': (result,)}
```