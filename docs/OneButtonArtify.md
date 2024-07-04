
# Documentation
- Class name: OneButtonArtify
- Category: OneButtonPrompt
- Output node: False

OneButtonArtify节点旨在将文本提示转化为具有艺术风格的版本，通过融入艺术风格和元素来实现。用户可以指定艺术家、影响输出的艺术家数量以及艺术化模式，从而提供一种创意十足且可定制的方法来生成具有艺术主题的文本提示。

# Input types
## Required
- prompt
    - 将被转化为艺术风格版本的主要文本输入。它作为艺术化过程的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- artist
    - 指定要应用于提示的艺术家或艺术风格，允许在输出中呈现广泛的艺术影响。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- amount_of_artists
    - 决定有多少艺术家的风格将影响艺术化后的提示，提供对艺术表达多样性的控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- artify_mode
    - 定义艺术化模式，如标准模式或其他指定模式，影响艺术转化的应用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- seed
    - 一个可选参数，用于设置艺术化过程中随机元素的种子，确保结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- artified_prompt
    - 艺术化过程的结果，一个经过指定艺术风格和元素转化的文本提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OneButtonArtify:

    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
               
        return {
            "required": {
                "prompt": ("STRING", {"default": '', "multiline": True}),
                "artist": (artifyartists, {"default": "all"}),
                "amount_of_artists": (artifyamountofartistslist, {"default": "1"}),
                "artify_mode": (artifymodeslist, {"default": "standard"})
            },
            "optional": {                
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("artified_prompt",)

    FUNCTION = "Comfy_OBP_Artify"

    #OUTPUT_NODE = False

    CATEGORY = "OneButtonPrompt"
    
    def Comfy_OBP_Artify(self, prompt, artist, amount_of_artists,artify_mode, seed):
        # artify here
        artified_prompt = artify_prompt(prompt=prompt, artists=artist, amountofartists=amount_of_artists, mode=artify_mode, seed=seed)
        
        print("Artified prompt: " + artified_prompt)
        
        return (artified_prompt,)

```
