
# Documentation
- Class name: easy textSwitch
- Category: EasyUse/Logic/Switch
- Output node: False

easy textSwitch节点提供了一种基于布尔条件在两个文本输入之间进行切换的机制。它作为一个条件运算符，实现了在工作流程中动态选择文本输出的功能。

# Input types
## Required
- input
    - 一个布尔值，用于决定输出哪个文本输入。如果为真，则选择text1；否则，选择text2。
    - Comfy dtype: INT
    - Python dtype: bool
## Optional
- text1
    - 可供选择的第一个文本选项。这个输入是条件操作的一部分，当布尔条件为真时被选中。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 可供选择的第二个文本选项。这个输入是条件操作的一部分，当布尔条件为假时被选中。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - 基于布尔条件选择的输出文本。它会动态地在text1和text2之间切换。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class textSwitch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input": ("INT", {"default": 1, "min": 1, "max": 2}),
            },
            "optional": {
                "text1": ("STRING", {"forceInput": True}),
                "text2": ("STRING", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("STRING",)
    CATEGORY = "EasyUse/Logic/Switch"
    FUNCTION = "switch"

    def switch(self, input, text1=None, text2=None,):
        if input == 1:
            return (text1,)
        else:
            return (text2,)

```
