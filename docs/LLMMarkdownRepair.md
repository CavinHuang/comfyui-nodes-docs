
# Documentation
- Class name: LLMMarkdownRepair
- Category: SALT/Language Toolkit/Tools/Markdown
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Ltdrdata

LLMMarkdownRepair节点旨在修复格式错误的Markdown文本，确保将其转换为有效且结构良好的Markdown，同时不遗漏任何数据。它利用语言模型分析并根据给定的指令修正输入文本。

# Input types
## Required
- llm_model
    - 指定用于修复Markdown的语言模型。它在理解和修复格式错误的Markdown方面起着至关重要的作用，基于提供的提示进行处理。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- text_input
    - 需要修复的格式错误Markdown文本。这个输入至关重要，因为它提供了节点将要处理以生成有效Markdown的内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_directions
    - 可选的额外指令，用于指导语言模型在修复Markdown时遵循。这可以根据特定要求更精确地指导修复过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- markdown_output
    - 修复后的Markdown文本，是语言模型处理输入文本和任何额外指令的结果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMMarkdownRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Malformed Markdown..."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("markdown_output",)

    FUNCTION = "repair_markdown"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/Markdown"

    def repair_markdown(self, llm_model, text_input, extra_directions=""):
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above malformed Markdown, please inspect it and repair it so that it's valid Markdown, without changing or losing any data if possible."
            f"{extra_directions}\n\n"
            "Please ensure the Markdown output is well-structured, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
