
# Documentation
- Class name: Add String To Many
- Category: Bmad/conditioning
- Output node: False

此节点旨在将给定的字符串追加或前置到多个其他字符串中，从而实现字符串批量处理任务。

# Input types
## Required
- to_add
    - 要添加到每个输入字符串的字符串。它在操作中起核心作用，决定了将被追加或前置的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- inputs_len
    - 指定将'to_add'字符串追加或前置的输入字符串的数量。它影响节点执行的操作次数。
    - Comfy dtype: INT
    - Python dtype: int
- operation
    - 决定是将'to_add'字符串追加还是前置到输入字符串。这个选择影响最终字符串的排列。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- string
    - 将'to_add'字符串追加或前置到每个输入字符串后的结果字符串。
    - Comfy dtype: STRING
    - Python dtype: Tuple[str, ...]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AddString2Many:
    """
    Append or prepend a string to other, many, strings.
    """

    OPERATION = ["append", "prepend"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "to_add": ("STRING", {"default": '', "multiline": False}),
            "inputs_len": ("INT", {"default": 3, "min": 2, "max": 32, "step": 1}),
            "operation": (s.OPERATION, {"default": 'append'}),
        }}

    RETURN_TYPES = tuple(["STRING" for x in range(32)])
    FUNCTION = "add_str"
    CATEGORY = "Bmad/conditioning"

    def add_str(self, to_add, inputs_len, operation, **kwargs):
        new_strs = []
        for r in range(inputs_len):
            str_input_name = f"i{r + 1}"
            new_str = kwargs[str_input_name]
            if operation == "append":
                new_str = new_str + to_add
            else:
                new_str = to_add + new_str
            new_strs.append(new_str)

        return tuple(new_strs)

```
