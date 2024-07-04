
# Documentation
- Class name: LLMHtmlRepair
- Category: SALT/Language Toolkit/Tools/HTML
- Output node: False
- Repo Ref: https://github.com/saltlang/salt-ComfyUI

LLMHtmlRepair节点利用语言模型来分析和修正格式错误的HTML内容，确保输出结果是结构良好且有效的HTML，而不会丢失任何数据。

# Input types
## Required
- llm_model
    - 指定用于修复HTML的语言模型。它对于理解输入和生成修正后的HTML至关重要。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- text_input
    - 需要修复的格式错误HTML内容。它是修正过程的主要输入。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- extra_directions
    - 可选的额外指令，用于指导语言模型进行更具体的修复过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- html_output
    - 修复后的HTML内容，结构良好且有效，确保没有遗漏任何数据。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMHtmlRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Malformed HTML..."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("html_output",)

    FUNCTION = "repair_html"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/HTML"

    def repair_html(self, llm_model, text_input, extra_directions=""):
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above malformed HTML, please inspect it and repair it so that it's valid HTML, without changing or losing any data if possible."
            f"{extra_directions}\n\n"
            "Please ensure the HTML output is well-structured, valid,, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
