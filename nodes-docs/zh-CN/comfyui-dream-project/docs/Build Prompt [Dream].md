
# Documentation
- Class name: Build Prompt [Dream]
- Category: ✨ Dream/☯ conditioning
- Output node: False

Build Prompt节点旨在构建和加权文本提示以用于生成任务，允许通过权重动态调整提示的重要性。

# Input types
## Required
- added_prompt
    - 指定要添加到提示中的文本，可以使用权重参数动态调整其重要性。
    - Comfy dtype: STRING
    - Python dtype: str
- weight
    - 决定添加的提示文本的权重，影响其在结果提示组合中的重要性。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional
- partial_prompt
    - 一个可选的初始提示结构，可以通过添加具有指定权重的文本进行进一步修改。如果未提供，则初始化一个新的提示结构。
    - Comfy dtype: PARTIAL_PROMPT
    - Python dtype: PartialPrompt

# Output types
- partial_prompt
    - 修改后或新创建的提示结构，包含了具有指定权重的添加文本。
    - Comfy dtype: PARTIAL_PROMPT
    - Python dtype: PartialPrompt


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamWeightedPromptBuilder:
    NODE_NAME = "Build Prompt"
    ICON = "⚖"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "optional": {
                "partial_prompt": (PartialPrompt.ID,)
            },
            "required": {
                "added_prompt": ("STRING", {"default": "", "multiline": True}),
                "weight": ("FLOAT", {"default": 1.0}),
            },
        }

    CATEGORY = NodeCategories.CONDITIONING
    RETURN_TYPES = (PartialPrompt.ID,)
    RETURN_NAMES = ("partial_prompt",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, added_prompt, weight, **args):
        input = args.get("partial_prompt", PartialPrompt())
        p = input.add(added_prompt, weight)
        return (p,)

```
