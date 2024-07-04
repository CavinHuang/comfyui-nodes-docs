
# Documentation
- Class name: LLMRegexCreator
- Category: SALT/Language Toolkit/Tools/Regex
- Output node: False

LLMRegexCreator节点旨在根据给定的描述和可选的额外指示生成正则表达式（regex）模式。它利用语言模型来解析需求，并生成一个符合指定标准的完整正则表达式模式。

# Input types
## Required
- llm_model
    - 指定用于生成正则表达式模式的语言模型。它对于解析描述和额外指示以创建正则表达式至关重要。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- description
    - 要创建的正则表达式模式的主要描述。这个描述是正则表达式生成的基础，指导语言模型构建模式。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- extra_directions
    - 可选的附加指示或约束，用于指导语言模型生成正则表达式模式。这些指示可以通过提供更多上下文或特定要求来优化输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- regex_pattern
    - 根据提供的描述和可选的额外指示生成的正则表达式模式。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMRegexCreator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "description": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Describe regex pattern to create, optionally provide example"}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("regex_pattern",)

    FUNCTION = "create_regex"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/Regex"

    def create_regex(self, llm_model, description, extra_directions=""):
        prompt = (
            f"Create only a well formed regex pattern based on the following description:\n\n"
            f"{description}\n\n"
            f"{extra_directions}\n\n"
            "Please ensure the regex pattern is concise and accurately matches the described criteria."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
