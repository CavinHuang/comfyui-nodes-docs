# Documentation
- Class name: TextSplitByDelimiter
- Category: ♾️Mixlab/GPT
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点基于指定的分隔符对文本数据进行分割，能够从非结构化文本中提取结构化信息。它旨在高效处理大型数据集，为用户在文本分析和预处理任务中提供简单而强大的工具。

# Input types
## Required
- text
    - 输入文本是节点操作的主要数据源。它的质量与格式直接影响分割过程的有效性及提取片段的准确性。
    - Comfy dtype: STRING
    - Python dtype: str
- delimiter
    - 分隔符参数决定了文本的分隔标准。它在确定文本如何被分割中起着至关重要的作用，从而影响输出的结构。
    - Comfy dtype: COMBO
    - Python dtype: str
- start_index
    - start_index参数定义了文本中开始分割过程的位置。它影响着选定输出的初始片段，并可用于跳过文本中不需要的部分。
    - Comfy dtype: INT
    - Python dtype: int
- skip_every
    - skip_every参数决定了在分割过程中跳过片段的频率。它在控制输出的密度方面起着重要作用，并且有助于聚焦文本中特定的兴趣区域。
    - Comfy dtype: INT
    - Python dtype: int
- max_count
    - max_count参数设置了提取片段数量的上限。它在管理输出的范围方面很重要，确保节点不会处理过多的数据。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- segmented_text
    - 输出是基于输入参数提取的文本片段列表。每个片段代表原始文本的一部分，根据指定的分隔符和其他输入标准进行结构化。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class TextSplitByDelimiter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'delimiter': (['newline', 'comma'],), 'start_index': ('INT', {'default': 0, 'min': 0, 'max': 1000, 'step': 1, 'display': 'number'}), 'skip_every': ('INT', {'default': 0, 'min': 0, 'max': 10, 'step': 1, 'display': 'number'}), 'max_count': ('INT', {'default': 10, 'min': 1, 'max': 1000, 'step': 1, 'display': 'number'})}}
    INPUT_IS_LIST = False
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    OUTPUT_IS_LIST = (True,)
    CATEGORY = '♾️Mixlab/GPT'

    def run(self, text, delimiter, start_index, skip_every, max_count):
        arr = []
        if delimiter == 'newline':
            arr = [line for line in text.split('\n') if line.strip()]
        elif delimiter == 'comma':
            arr = [line for line in text.split(',') if line.strip()]
        arr = arr[start_index:start_index + max_count * (skip_every + 1):skip_every + 1]
        return (arr,)
```