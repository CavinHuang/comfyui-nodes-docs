# Documentation
- Class name: KfDebug_String
- Category: Debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在工作流中促进对字符串数据的检查和分析。它使用户能够在不同阶段查看和验证字符串的内容和结构，确保正在处理的文本信息的准确性和完整性。

# Input types
## Required
- input_string
    - input_string参数对于这个节点至关重要，因为它携带了需要检查的文本数据。它是一个关键组件，因为节点的主要功能围绕分析和显示这个字符串的内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output_string
    - output_string代表节点操作的结果，通常与input_string相同，但根据调试过程可能会被修改或注释。它很重要，因为它提供了最终检查的文本数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_String(KfDebug_Passthrough):
    RETURN_TYPES = ('STRING',)
```