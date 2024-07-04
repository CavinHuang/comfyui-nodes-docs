
# Documentation
- Class name: LLMJsonRepair
- Category: SALT/Language Toolkit/Tools/JSON
- Output node: False

LLMJsonRepair节点旨在使用语言模型来修复格式错误的JSON字符串。它接收一个可能存在错误的JSON输入和可选的指示，然后输出修复后的JSON版本，确保数据完整性和正确的格式。

# Input types
## Required
- llm_model
    - 指定用于修复JSON的语言模型。它对于解释输入和生成修正后的输出至关重要。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- text_input
    - 需要修复的格式错误的JSON字符串。这个输入对于节点理解需要修复的内容至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- extra_directions
    - 可选的额外指示，用于在修复过程中指导语言模型，允许进行更加定制化的修正。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- json_output
    - 修复后的JSON字符串，已纠正语法和格式错误以确保有效性。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMJsonRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Malformed JSON..."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("json_output",)

    FUNCTION = "compose_json"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/JSON"

    def compose_json(self, llm_model, text_input, extra_directions=""):
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above malformed JSON, please inspect it and repair it so that it's valid JSON, without changing or loosing any data if possible."
            f"{extra_directions}\n\n"
            "Please ensure the JSON output is properly formatted, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
