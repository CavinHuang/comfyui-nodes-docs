
# Documentation
- Class name: SDXL Prompt Handling Plus (JPS)
- Category: JPS Nodes/Text
- Output node: False

该节点旨在增强生成模型的文本提示处理和优化过程。它采用先进技术来操作和优化提示，以提高生成输出的清晰度、创造性或特异性。该节点的目标是提供一种更细致和有效的提示工程方法，利用额外的参数和方法来微调与生成模型的交互。

# Input types
## Required
- handling
    - 指定处理和组合正面和负面提示的方法，提供各种策略来根据特定需求定制提示处理过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- pos_g
    - 表示节点将处理的全局正面提示输入，在引导生成模型产生所需结果方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - 作为局部正面提示输入，提供额外的上下文或强调以进一步细化输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- pos_g
    - 经过处理的全局正面提示，经过优化以提高引导生成模型的清晰度和有效性。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - 经过优化的局部正面提示，专门用于为生成的输出添加特定上下文或强调。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Prompt_Handling_Plus:
    handling = ["Copy to Both if Empty","Use Positive_G + Positive_L","Copy Positive_G to Both","Copy Positive_L to Both","Ignore Positive_G Input", "Ignore Positive_L Input", "Combine Positive_G + Positive_L", "Combine Positive_L + Positive_G",]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "handling": (s.handling,),
                "pos_g": ("STRING", {"multiline": True, "placeholder": "Prompt Text pos_g", "dynamicPrompts": True}),
                "pos_l": ("STRING", {"multiline": True, "placeholder": "Prompt Text pos_l", "dynamicPrompts": True}),
            },
        }
    
    RETURN_TYPES = ("STRING","STRING",)
    RETURN_NAMES = ("pos_g","pos_l",)
    FUNCTION = "pick_handling"

    CATEGORY="JPS Nodes/Text"

    def pick_handling(self,handling,pos_g,pos_l):
        
        if(handling == "Copy Positive_G to Both"):
            pos_l = pos_g
        elif(handling == "Copy Positive_L to Both"):
            pos_g = pos_l
        elif(handling == "Ignore Positive_G Input"):
            pos_g = ''
        elif(handling == "Ignore Positive_L Input"):
            pos_l = ''
        elif(handling == "Combine Positive_G + Positive_L"):
            combine = pos_g + ' . ' + pos_l
            pos_g = combine
            pos_l = combine
        elif(handling == "Combine Positive_L + Positive_G"):
            combine = pos_l + ' . ' + pos_g
            pos_g = combine
            pos_l = combine
        elif(handling == "Copy to Both if Empty" and pos_l == ''):
            pos_l = pos_g
        elif(handling == "Copy to Both if Empty" and pos_g == ''):
            pos_g = pos_l

        return(pos_g,pos_l,)

```
