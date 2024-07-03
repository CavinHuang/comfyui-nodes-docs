
# Documentation
- Class name: IF_DisplayText
- Category: ImpactFrames💥🎞️
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack

IF_DisplayText节点旨在ImpactFrames环境中显示文本输出,为文本数据的可视化提供了一个简单的接口。

# Input types
## Required
- text
    - 'text'参数是IF_DisplayText节点的主要输入,作为要显示的文本内容。它对节点的操作至关重要,决定了将被可视化的文本输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - Comfy dtype: STRING
    - 输出参数'string'的具体功能和数据类型未知。
    - Python dtype: unknown
- ui
    - 'ui'输出参数将显示的文本封装为用户界面格式,允许在ImpactFrames环境中直接可视化。
    - Comfy dtype: UI
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IFDisplayText:
    def __init__(self):
        self.type = "output"

    @classmethod
    def INPUT_TYPES(cls):

        return {
            "required": {        
                "text": ("STRING", {"forceInput": True}),     
                },
            "hidden": {},
            }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "display_text"
    OUTPUT_NODE = True
    CATEGORY = "ImpactFrames💥🎞️"
    
    def display_text(self, text):
        print("==================")
        print("IF_AI_tool_output:")
        print("==================")
        print(text)
        return {"ui": {"string": [text,]}, "result": (text,)}

```
