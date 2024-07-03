

# Documentation
- Class name: PromptComposerCustomLists
- Category: AI WizArt/Prompt Composer Tools
- Output node: False
- Repo Ref: https://github.com/jaschaek/AI-WizArt-ComfyUI/custom_nodes/

PromptComposerCustomLists节点旨在将用户自定义的列表选项整合到提示词构建过程中，实现基于用户定义的列表和权重的动态可定制文本生成。

# Input types
## Required
- lens_type
    - 这是一个表示镜头类型的自定义列表，对于根据特定视觉视角定制提示词组合至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- lens_type_weight
    - 指定镜头类型选择的权重，影响最终提示词组合中镜头类型的强调程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- photo_style
    - 这是一个从自定义列表中选择摄影风格的必需参数，对定义提示词的视觉风格至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- photo_style_weight
    - 决定摄影风格选择的权重，影响其在组合提示词中的突出程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- effect
    - 这是一个从自定义列表中选择效果的必需参数，对为提示词添加独特的视觉效果很关键。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- effect_weight
    - 设置所选效果的权重，调整其对整体提示词的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- painting_style
    - 这是一个从自定义列表中选择绘画风格的必需参数，对将艺术风格融入提示词至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- painting_style_weight
    - 调整绘画风格选择的权重，影响其对最终提示词的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- active
    - 一个布尔参数，用于激活或停用在提示词组合中包含自定义列表选择。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- text_in_opt
    - 一个可选的初始文本输入，可以包含在提示词组合的开头，突出了以用户定义的文本开始提示词的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text_out
    - 输出是一个单一的字符串，代表根据输入的自定义列表及其相关权重动态生成的组合提示词。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptComposerCustomLists:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        return {
            "optional": {
                "text_in_opt": ("STRING", {"forceInput": True}),
            },
            "required": custom_lists
        }
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text_out",)
    FUNCTION = "promptComposerCustomLists"
    CATEGORY = "AI WizArt/Prompt Composer Tools"
    
    def promptComposerCustomLists(self, text_in_opt="", **kwargs):
        prompt = []
        if text_in_opt != "":
            prompt.append(text_in_opt)
        if kwargs["active"] == True:
            for key in kwargs.keys():
                if "_weight" not in str(key) and "active" not in str(key):
                    if kwargs[key] != "-" and kwargs[key + "_weight"] > 0:
                        prompt.append(applyWeight(kwargs[key], kwargs[key + "_weight"]))
        if len(prompt) > 0:
            prompt = ", ".join(prompt)
            prompt = prompt.lower()
            return(prompt,)
        else:
            return("",)

```
