
# Documentation
- Class name: LLMMarkdownComposer
- Category: SALT/Language Toolkit/Tools/Markdown
- Output node: False

LLMMarkdownComposer 节点旨在将输入文本转换为结构良好的 Markdown 文档。它利用语言模型来解释和格式化给定的文本,根据指定的分类器和额外指示进行处理,确保输出符合 Markdown 语法,同时包含所有提供的数据。

# Input types
## Required
- llm_model
    - 指定用于生成 Markdown 文档的语言模型。它在理解输入文本并根据 Markdown 语法进行格式化方面起着至关重要的作用。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- text_input
    - 将被转换为 Markdown 文档的主要文本输入。这段文本作为 Markdown 生成过程的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- classifier_list
    - 用逗号分隔的分类器列表,用于指导语言模型构建 Markdown 文档的结构。这些分类器有助于适当地分类和格式化输入文本。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_directions
    - 语言模型在生成 Markdown 文档时需要遵循的额外指示。这些指示可以包括特定的格式要求或内容结构指南。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- markdown_output
    - 根据输入规格和额外指示生成的 Markdown 文档,经过结构化和格式化处理。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMMarkdownComposer:
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
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("markdown_output",)

    FUNCTION = "compose_markdown"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/Markdown"

    def compose_markdown(self, llm_model, text_input, classifier_list, extra_directions=""):
        classifier_list = [item.strip() for item in classifier_list.split(",") if item.strip()]
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above text, create a valid Markdown document utilizing *all* of the data; "
            f"using the following classifiers: {classifier_list}.\n\n"
            f"{extra_directions}\n\n"
            "Please ensure the Markdown output is well-structured, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
