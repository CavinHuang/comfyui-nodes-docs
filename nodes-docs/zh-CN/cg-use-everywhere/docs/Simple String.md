
# Documentation
- Class name: Simple String
- Category: everywhere
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点被设计用来处理或操作简单的字符串数据。它专注于涉及字符串输入的修改、分析或转换的操作，以产生所需的字符串输出。该节点的功能可能涵盖从基本的字符串操作任务（如修剪、拼接或改变大小写）到更复杂的操作（如模式匹配或数据提取）。

# Input types
## Required
- string
    - 'string'输入类型对于节点的操作至关重要，因为它代表了节点将要处理的主要数据。这个输入通过确定将要进行操作或分析的特定字符串数据，影响节点的执行和结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 此节点的输出是一个基于节点功能进行处理或转换后的字符串。这可能包括输入字符串的修改版本或从输入数据派生的新字符串。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [StringFunction|pysssss](../../ComfyUI-Custom-Scripts/Nodes/StringFunction|pysssss.md)



## Source code
```python
class SimpleString(Base):
    OUTPUT_NODE = False
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{ "string": ("STRING", {"default": ""}) }}
    RETURN_TYPES = ("STRING",)

    def func(self,string):
        return (string,)

```
