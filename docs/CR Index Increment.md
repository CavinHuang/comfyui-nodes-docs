# Documentation
- Class name: CR_IncrementIndex
- Category: Comfyroll/Utils/Index
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_IncrementIndex 节点旨在执行数据处理和迭代任务中的一个简单但关键的操作。它接受一个初始索引和一个间隔值，然后将索引按指定的间隔增加。此功能对于浏览列表、数组或任何顺序数据结构的位置至关重要。该节点还提供了一个链接到文档的链接，以便用户在需要时可以获取更多指导。

# Input types
## Required
- index
    - “index”参数是增量操作的起始点。它之所以重要，是因为它决定了增量开始的位置。此参数对于确保后续操作中正确的序列顺序和索引至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- interval
    - “interval”参数定义了索引将增加的步长大小。它之所以重要，是因为它决定了增量值之间的间距，影响数字序列的生成方式。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- index
    - “index”输出反映了通过间隔增加原始索引后的新位置。它对于维护通过数据序列的正确进展至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- interval
    - “interval”输出与输入间隔相同，表示用于增量的步长大小。它可以在需要间隔值的进一步操作中使用。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - “show_help”输出提供了指向节点文档的URL链接，为用户提供了更多详细信息和如何有效使用该节点的指导的直接参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_IncrementIndex:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'index': ('INT', {'default': 1, 'min': -10000, 'max': 10000, 'forceInput': True}), 'interval': ('INT', {'default': 1, 'min': -10000, 'max': 10000})}}
    RETURN_TYPES = ('INT', 'INT', 'STRING')
    RETURN_NAMES = ('index', 'interval', 'show_help')
    FUNCTION = 'increment'
    CATEGORY = icons.get('Comfyroll/Utils/Index')

    def increment(self, index, interval):
        index += interval
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-index-increment'
        return (index, show_help)
```