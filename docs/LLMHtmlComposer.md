
# Documentation
- Class name: LLMHtmlComposer
- Category: SALT/Language Toolkit/Tools/HTML
- Output node: False

LLMHtmlComposer节点旨在根据给定的文本输入、分类器列表和可选的额外指令生成HTML内容。它利用语言模型来组合完整的HTML页面文档或HTML片段，具体取决于指定的模式，确保输出结构良好且有效。

# Input types
## Required
- llm_model
    - 表示用于生成HTML内容的语言模型。它对于解释输入文本和分类器以产生所需的HTML输出至关重要。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- text_input
    - 用于生成HTML内容的主要文本输入。这段文本作为composition过程的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- classifier_list
    - 以逗号分隔的字符串形式提供的分类器列表。这些分类器指导语言模型生成符合特定标准或类别的HTML内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_directions
    - 可选的附加指令，用于进一步指导HTML生成过程，允许生成更加定制化的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- composer_mode
    - 指定HTML composition的模式，可以是完整的HTML页面文档或HTML片段，影响输出中HTML元素的结构和包含。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- html_output
    - 生成的HTML内容，可以是完整的HTML页面或HTML片段，基于输入文本、分类器和可选指令。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMHtmlComposer:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Data..."}),
                "classifier_list": ("STRING", {"multiline": False, "dynamicPrompts": False}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
                "composer_mode": (["full_markup", "blocked_markup"],)
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("html_output",)

    FUNCTION = "compose_html"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/HTML"

    def compose_html(self, llm_model, text_input, classifier_list, extra_directions="", composer_mode="full_markup"):
        classifier_list = [item.strip() for item in classifier_list.split(",") if item.strip()]
        markup_style = "full HTML page document" if composer_mode == "full_markup" else "HTML snippet (without html, head, body or any extraneous containers)"
        prompt = (
            f"{text_input}\n\n###\n\n"
            f"Given the above text, create a valid {markup_style} utilizing *all* of the data, intact; "
            f"using the following classifiers: {classifier_list}.\n\n"
            f"{extra_directions}\n\n"
            "Please ensure the HTML output is well-structured, valid, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
