
# Documentation
- Class name: JWStringSplit
- Category: jamesWalker55
- Output node: False
- Repo Ref: https://github.com/jamesWalker55/comfyui-various-nodes

JWStringSplit节点专为将给定的字符串按指定的分隔符分割成两部分而设计，并提供从右侧开始分割的选项。它抽象了字符串操作的复杂性，提供了一种简单直观的方式来分割字符串以便进一步处理。

# Input types
## Required
- source
    - source参数是待分割的字符串。它在确定将基于指定分隔符分割成两部分的输入字符串方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- split_by
    - split_by参数指定用于分割source字符串的分隔符。其值直接影响输入字符串的分割方式。
    - Comfy dtype: STRING
    - Python dtype: str
- from_right
    - from_right参数决定是否应从source字符串的右侧开始分割。当设置为'true'时，分割从右侧执行；否则，默认为从左侧分割。
    - Comfy dtype: ['false', 'true']
    - Python dtype: Literal['false', 'true']

# Output types
- string
    - 输出是一个包含两个字符串的元组，表示分割操作后原始字符串的两个部分。这个修正反映了准确的输出类型，解决了反馈中提到的问题。
    - Comfy dtype: STRING
    - Python dtype: tuple[str, str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
        @register_node(identifier, display_name)
        class _:
            CATEGORY = category
            INPUT_TYPES = lambda: {"required": required_inputs}
            RETURN_TYPES = tuple(return_types)
            OUTPUT_NODE = output_node
            FUNCTION = "execute"

            def execute(self, *args, **kwargs):
                return func(*args, **kwargs)

```
