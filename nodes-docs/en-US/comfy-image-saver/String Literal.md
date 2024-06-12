# String Literal
## Documentation
- Class name: `String Literal`
- Category: `ImageSaverTools/utils`
- Output node: `False`

The String Literal node is designed to encapsulate and manage string values within the node network. It serves as a fundamental utility for handling literal string inputs, enabling the seamless integration and manipulation of text data across various nodes and processes.
## Input types
### Required
- **`string`**
    - This parameter allows users to input a literal string value, which the node then processes or passes on as needed. It acts as the primary means for introducing text data into the node's workflow, emphasizing the node's role in text management and manipulation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs the literal string value that was input, facilitating the transfer of text data to subsequent nodes or processes within the network.
    - Python dtype: `str`
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
