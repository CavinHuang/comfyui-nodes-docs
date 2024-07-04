
# Documentation
- Class name: LLMJsonComposer
- Category: SALT/Language Toolkit/Tools/JSON
- Output node: False

LLMJsonComposer节点旨在利用语言模型从给定的文本输入生成有效的JSON对象。它处理文本数据以及一组分类器和可选的指示，以构建准确而连贯地封装所提供信息的JSON结构。

# Input types
## Required
- llm_model
    - 指定用于生成JSON对象的语言模型，在解释输入文本和分类器以产生所需输出方面发挥关键作用。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- text_input
    - 将用于组成JSON对象的主要文本数据，作为生成过程的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- classifier_list
    - 一个以逗号分隔的分类器列表，通过对输入文本进行分类来指导JSON的组成，影响生成的JSON的结构和内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_directions
    - 可选的额外指示，供语言模型在组成JSON时遵循，允许生成更加定制和具体的输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- json_output
    - 生成的JSON对象，以字符串形式表示，代表输入文本和分类器的结构化和有效的JSON格式。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMJsonComposer:
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
    RETURN_NAMES = ("json_output",)

    FUNCTION = "compose_json"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/JSON"

    def compose_json(self, llm_model, text_input, classifier_list, extra_directions=""):
        classifier_list = [item.strip() for item in classifier_list.split(",") if item.strip()]
        prompt = f"{text_input}\n\n###\n\nGiven the above text, create a valid JSON object utilizing *all* of the data; using the following classifiers: {classifier_list}.\n\n{extra_directions}\n\nPlease ensure the JSON output is properly formatted, and does not omit any data."
        response = llm_model['llm'].complete(prompt)
        return (response.text,)

```
