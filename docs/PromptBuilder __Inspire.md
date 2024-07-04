
# Documentation
- Class name: PromptBuilder __Inspire
- Category: InspirePack/Prompt
- Output node: False

PromptBuilder节点旨在通过允许用户从多种类别和预设中选择，并输入自己的文本来促进定制提示的创建。该节点旨在简化为各种应用生成量身定制提示的过程，从而提高提示生成的创造力和效率。

# Input types
## Required
- category
    - 'category'参数允许用户从预定义列表中选择提示类别，包括自定义占位符。这个选择会影响生成提示的主题方向。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- preset
    - 'preset'参数使用户能够在所选类别内选择特定的预设，进一步细化提示的内容和风格。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- text
    - 'text'参数允许用户输入自定义文本，提供了直接影响生成提示内容的方式。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 返回自定义提示文本作为字符串，反映用户的类别、预设和文本输入。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptBuilder:
    @classmethod
    def INPUT_TYPES(s):
        global prompt_builder_preset

        presets = ["#PRESET"]
        return {"required": {
                        "category": (list(prompt_builder_preset.keys()) + ["#PLACEHOLDER"], ),
                        "preset": (presets, ),
                        "text": ("STRING", {"multiline": True}),
                     },
                }

    RETURN_TYPES = ("STRING", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, **kwargs):
        return (kwargs['text'],)

```
