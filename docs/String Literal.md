
# Documentation
- Class name: String Literal
- Category: ImageSaverTools/utils
- Output node: False

String Literal节点旨在封装和管理节点网络中的字符串值。它作为处理字面量字符串输入的基础工具，能够在各种节点和进程中无缝集成和操作文本数据。

# Input types
## Required
- string
    - 此参数允许用户输入一个字面量字符串值，节点随后会对其进行处理或按需传递。它是将文本数据引入节点工作流的主要方式，突出了该节点在文本管理和操作中的作用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出输入的字面量字符串值，便于将文本数据传递给网络中的后续节点或进程。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [Text Concatenate](../../was-node-suite-comfyui/Nodes/Text Concatenate.md)
    - [StringFunction|pysssss](../../ComfyUI-Custom-Scripts/Nodes/StringFunction|pysssss.md)



## Source code
```python
class StringLiteral:
    RETURN_TYPES = ("STRING",)
    FUNCTION = "get_string"
    CATEGORY = "ImageSaverTools/utils"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"string": ("STRING", {"default": "", "multiline": True})}}

    def get_string(self, string):
        return (string,)

```
