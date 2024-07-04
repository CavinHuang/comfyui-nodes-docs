
# Documentation
- Class name: SDXL Prompt Handling (JPS)
- Category: JPS Nodes/Text
- Output node: False

这个节点旨在处理和优化用于图像生成任务的文本提示，特别针对SDXL模型进行了优化。它专注于完善和构建输入提示，以提高生成图像的清晰度和效果。

# Input types
## Required
- handling
    - 指定处理正面提示的组合或选择方法，提供各种策略来优化提示的效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- pos_g
    - 代表全局正面提示，为图像生成提供广泛的主题或主要内容方向。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - 表示局部正面提示，提供更具体的细节或要包含在生成图像中的元素。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- pos_g
    - 处理后的全局正面提示，反映了所选的处理策略，可直接用于SDXL模型。
    - Comfy dtype: STRING
    - Python dtype: str
- pos_l
    - 处理后的局部正面提示，根据处理方法进行了调整，专门针对图像生成任务进行了优化。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Prompt_Handling:
    handling = ["Copy to Both if Empty","Use Positive_G + Positive_L","Copy Positive_G to Both","Copy Positive_L to Both","Ignore Positive_G Input", "Ignore Positive_L Input", "Combine Positive_G + Positive_L", "Combine Positive_L + Positive_G",]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "handling": (s.handling,),
                "pos_g": ("STRING", {"default": ""}),
                "pos_l": ("STRING", {"default": ""}),
            },
        }
    RETURN_TYPES = ("STRING","STRING",)
    RETURN_NAMES = ("pos_g","pos_l",)
    FUNCTION = "pick_handling"

    CATEGORY="JPS Nodes/Text"

    def pick_handling(self,handling,pos_g,pos_l,):
        
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
