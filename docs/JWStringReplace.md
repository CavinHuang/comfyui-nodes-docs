
# Documentation
- Class name: JWStringReplace
- Category: jamesWalker55
- Output node: False

JWStringReplace 节点执行字符串替换操作，将源字符串中指定子字符串的所有出现替换为另一个子字符串。该节点旨在通过将特定文本模式替换为替代文本来修改文本数据，从而促进文本预处理或数据规范化任务。

# Input types
## Required
- source
    - 将进行替换的原始字符串。它作为操作的基础文本。
    - Comfy dtype: STRING
    - Python dtype: str
- to_replace
    - 需要在源字符串中被替换的子字符串。它标识了需要被替换的特定模式或文本。
    - Comfy dtype: STRING
    - Python dtype: str
- replace_with
    - 用于替换源字符串中 'to_replace' 子字符串出现的子字符串。它指定了要插入的新文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 在 'to_replace' 子字符串的所有出现都被 'replace_with' 子字符串替换后的修改后的字符串。
    - Comfy dtype: STRING
    - Python dtype: str


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
