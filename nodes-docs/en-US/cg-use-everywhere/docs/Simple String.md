---
tags:
- String
- Text
---

# Simple String
## Documentation
- Class name: `Simple String`
- Category: `everywhere`
- Output node: `False`

This node is designed to process or manipulate simple string data. It focuses on operations that involve the modification, analysis, or transformation of string inputs to produce desired string outputs. The node's functionality could range from basic string manipulation tasks such as trimming, concatenating, or changing the case, to more complex operations like pattern matching or data extraction.
## Input types
### Required
- **`string`**
    - The 'string' input type is crucial for the node's operation as it represents the primary data that the node will process. This input affects the node's execution and results by determining the specific string data that will undergo manipulation or analysis.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output of this node is a string that has been processed or transformed based on the node's functionality. This could include modified versions of the input string or new strings derived from the input data.
    - Python dtype: `str`
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
