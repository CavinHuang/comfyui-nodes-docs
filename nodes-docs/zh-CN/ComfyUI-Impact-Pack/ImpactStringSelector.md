# Documentation
- Class name: StringSelector
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

StringSelector节点旨在处理并从给定输入中选择特定的字符串。它可以处理多行字符串，并提供启用或禁用多行处理的选项。该节点的主要目的是根据选择标准提取特定的字符串，为ImpactPack实用程序套件内提供一种多功能的字符串操作方法。

# Input types
## Required
- strings
    - ‘strings’参数是节点的主要输入，包含要处理的字符串数据。它在节点操作中起着关键作用，因为它是将从中提取选定字符串的来源。多行选项允许处理跨越多行的字符串，增强了节点处理不同字符串格式的多功能性。
    - Comfy dtype: STRING
    - Python dtype: str
- select
    - ‘select’参数用于指定要从输入中选择的字符串或行的索引。它对于确定输入数据的哪一部分将是节点的输出至关重要。选择索引应用于行或元素的数量的模运算，确保如果它超过可用选项，它将循环。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- multiline
    - ‘multiline’参数决定节点是否应将输入字符串作为单个实体处理，还是作为多行处理。启用时，它允许节点处理带有换行符的字符串，并根据这些行中的内容进行选择。此参数显著影响节点的行为和字符串选择过程的结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_string
    - ‘selected_string’输出代表了基于输入参数选择的字符串。它是节点处理的成果，反映了节点执行的字符串操作的结果。这个输出很重要，因为它是节点操作的最终产品。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class StringSelector:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'strings': ('STRING', {'multiline': True}), 'multiline': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'select': ('INT', {'min': 0, 'max': sys.maxsize, 'step': 1, 'default': 0})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, strings, multiline, select):
        lines = strings.split('\n')
        if multiline:
            result = []
            current_string = ''
            for line in lines:
                if line.startswith('#'):
                    if current_string:
                        result.append(current_string.strip())
                        current_string = ''
                current_string += line + '\n'
            if current_string:
                result.append(current_string.strip())
            if len(result) == 0:
                selected = strings
            else:
                selected = result[select % len(result)]
            if selected.startswith('#'):
                selected = selected[1:]
        elif len(lines) == 0:
            selected = strings
        else:
            selected = lines[select % len(lines)]
        return (selected,)
```