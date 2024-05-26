# Documentation
- Class name: ZipPrompt
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

ZipPrompt节点高效地将正面和负面提示合并成单一的压缩实体，增强了创意任务中数据处理的多功能性。它强调了该节点在简化提示合并过程中的作用，而不会深入到具体的实现细节。

# Input types
## Required
- positive
    - ‘positive’参数对于提供正面内容至节点操作非常必要，是创建压缩提示的关键元素。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - ‘negative’参数在提供对比内容方面起着至关重要的作用，这对于压缩提示的全面性至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- name_opt
    - 虽然‘name_opt’参数是可选的，但它可以用来自定义输出，为压缩提示增加个性化层次。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- zipped_prompt
    - 输出‘zipped_prompt’代表了正面和负面输入的结合，封装成紧凑有序的格式以供进一步使用。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: Tuple[str, str, str]

# Usage tips
- Infra type: CPU

# Source code
```
class ZipPrompt:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('STRING', {'forceInput': True, 'multiline': True}), 'negative': ('STRING', {'forceInput': True, 'multiline': True})}, 'optional': {'name_opt': ('STRING', {'forceInput': True, 'multiline': False})}}
    RETURN_TYPES = ('ZIPPED_PROMPT',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'

    def doit(self, positive, negative, name_opt=''):
        return ((positive, negative, name_opt),)
```