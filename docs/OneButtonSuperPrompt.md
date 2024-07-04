
# Documentation
- Class name: OneButtonSuperPrompt
- Category: OneButtonPrompt
- Output node: False

OneButtonSuperPrompt节点旨在生成增强版的提示词。它通过整合各种风格和调整，基于用户定义的参数（如疯狂程度和风格偏好）来生成更具创意和定制化的提示词。该节点利用输入参数的组合来影响生成过程，以满足特定需求。

# Input types
## Required
- prompt
    - 作为超级提示词生成基础的主要文本输入。它是将根据指定的风格和疯狂程度进行增强的原始内容。
    - Comfy dtype: STRING
    - Python dtype: str
- insanitylevel
    - 决定了与原始提示词的创意程度或偏离程度，数值越高表示转换越激进。
    - Comfy dtype: INT
    - Python dtype: int
- superpromptstyle
    - 指定用于增强提示词的风格或方法，允许基于预定义的风格来定制输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: superprompterstyleslist
## Optional
- seed
    - 一个可选参数，用于设置生成提示词的随机种子，确保结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- super_prompt
    - 由节点生成的增强版提示词，反映了应用的风格和调整。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OneButtonSuperPrompt:

    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
               
        return {
            "required": {
                "prompt": ("STRING", {"default": '', "multiline": True}),
                "insanitylevel": ("INT", {
                    "default": 5,
                    "min": 1, #Minimum value
                    "max": 10, #Maximum value
                    "step": 1 #Slider's step
                }),
                "superpromptstyle": (superprompterstyleslist, {"default": "all"}),
            },
            "optional": {                
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("super_prompt",)

    FUNCTION = "Comfy_OBP_SuperPrompt"

    #OUTPUT_NODE = False

    CATEGORY = "OneButtonPrompt"
    
    def Comfy_OBP_SuperPrompt(self, insanitylevel, prompt, superpromptstyle, seed):

        OBPsuperprompt = one_button_superprompt(insanitylevel=insanitylevel, prompt=prompt, seed=seed, superpromptstyle=superpromptstyle)
        
        print("Super prompt: " + OBPsuperprompt)
        
        return (OBPsuperprompt,)

```
