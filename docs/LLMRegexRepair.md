
# Documentation
- Class name: LLMRegexRepair
- Category: SALT/Language Toolkit/Tools/Regex
- Output node: False

LLMRegexRepair节点利用语言模型来修正和改进正则表达式模式。它基于给定的功能描述和任何额外的指示，旨在将潜在的格式错误或不正确的正则表达式转换为能够准确匹配指定标准的格式正确的模式。

# Input types
## Required
- llm_model
    - 指定用于修复正则表达式模式的语言模型。它对解释输入模式和生成修正版本至关重要。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- text_input
    - 需要修复的、可能格式错误或不正确的正则表达式模式。它作为修正过程的主要输入。
    - Comfy dtype: STRING
    - Python dtype: str
- description
    - 描述正则表达式模式应该匹配的内容，以及当前模式如何未能满足这些标准。这个上下文有助于指导修复过程。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_directions
    - 额外的指示或约束，用于指导语言模型修复正则表达式模式。这可以包括特定的格式要求或限制。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- repaired_regex_pattern
    - 由语言模型生成的修正后的正则表达式模式。它反映了输入中描述的预期功能。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMRegexRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Enter the malformed regex pattern here"}),
                "description": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Describe what the regex pattern does wrong, and what it should do."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow, such as specific constraints or formats"}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("repaired_regex_pattern",)

    FUNCTION = "repair_regex"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/Regex"

    def repair_regex(self, llm_model, text_input, description, extra_directions=""):
        prompt = (
            f"Given the potentially malformed or incorrect regex pattern:\n\n{text_input}\n\n"
            f"and the following description of what the pattern should match:\n\n{description}\n\n"
            f"{extra_directions}\n\n"
            "Please repair the regex pattern so it is well-formed and accurately matches the described criteria."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
