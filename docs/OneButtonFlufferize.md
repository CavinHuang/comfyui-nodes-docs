
# Documentation
- Class name: OneButtonFlufferize
- Category: OneButtonPrompt
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

OneButtonFlufferize节点通过添加"绒毛"（额外的词语或短语）来增强文本提示，使其更加详细或详尽。它允许用户自定义绒毛的数量，并可以反转绒毛极性，根据配置可能使用反义词或否定短语。

# Input types
## Required
- prompt
    - 需要添加绒毛的初始文本提示。这是将被详细阐述的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- amount_of_fluff
    - 指定要添加到提示中的绒毛程度，可以是动态的或固定范围的，影响输出的冗长程度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- reverse_polarity
    - 启用时，反转绒毛极性以使用可能相反或否定的绒毛，改变提示的语气。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
## Optional
- seed
    - 随机数生成器的种子，用于确保添加到提示中的绒毛的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- fluffed_prompt
    - 通过添加额外的绒毛来增加其详细程度或细节的原始提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OneButtonFlufferize:

    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
               
        return {
            "required": {
                "prompt": ("STRING", {"default": '', "multiline": True}),
                "amount_of_fluff": (amountofflufflist, {"default": "dynamic"}),
                "reverse_polarity": (fluff_reverse_polarity, {"default": False}),
            },
            "optional": {                
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("fluffed_prompt",)

    FUNCTION = "Comfy_OBP_Flufferize"

    #OUTPUT_NODE = False

    CATEGORY = "OneButtonPrompt"
    
    def Comfy_OBP_Flufferize(self, prompt, amount_of_fluff, reverse_polarity, seed):
        # artify here
        fluffed_prompt = flufferizer(prompt=prompt, amountoffluff=amount_of_fluff, reverse_polarity=reverse_polarity, seed=seed)
        
        print("Fluffed prompt: " + fluffed_prompt)
        
        return (fluffed_prompt,)

```
