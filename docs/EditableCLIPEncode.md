# Documentation
- Class name: EditableCLIPEncode
- Category: promptcontrol/old
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

该节点旨在将文本输入处理并转换为CLIP模型可用的结构化格式。它通过解析文本中的指定过滤器，并将要转换的结构转换为适合CLIP模型的条件格式来实现这一目标。

# Input types
## Required
- clip
    - “clip”参数是必要的，因为它提供了节点将用于处理输入文本的基本模型。没有这个参数，节点无法执行其预期功能。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- text
    - “text”参数对节点至关重要，因为它包含了节点将要解析和转换的输入数据。“text”的质量和格式直接影响节点的输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- filter_tags
    - “filter_tags”参数用于细化输入文本的解析过程。它允许指定节点在文本处理过程中应考虑或忽略的特定标签。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- CONDITIONING
    - “CONDITIONING”输出代表了输入文本的处理和结构化格式，适用于与CLIP模型一起使用。它封装了解析文本的精髓，允许与模型进行有效的交互。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class EditableCLIPEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'text': ('STRING', {'multiline': True})}, 'optional': {'filter_tags': ('STRING', {'default': ''})}}
    RETURN_TYPES = ('CONDITIONING',)
    CATEGORY = 'promptcontrol/old'
    FUNCTION = 'parse'

    def parse(self, clip, text, filter_tags=''):
        parsed = parse_prompt_schedules(text).with_filters(filter_tags)
        return (control_to_clip_common(clip, parsed),)
```