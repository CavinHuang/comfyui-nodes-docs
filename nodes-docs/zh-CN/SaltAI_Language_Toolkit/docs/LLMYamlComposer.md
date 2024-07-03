
# Documentation
- Class name: LLMYamlComposer
- Category: SALT/Language Toolkit/Tools/YAML
- Output node: False

LLMYamlComposer节点旨在利用指定的分类器和任何额外提供的指示，从给定的文本输入生成YAML文档。它抽象了YAML组合的复杂性，利用语言模型确保输出格式正确且全面。

# Input types
## Required
- llm_model
    - 指定用于生成YAML文档的语言模型。它在解释输入文本和分类器以生成结构良好的YAML输出方面发挥着关键作用。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- text_input
    - 用于生成YAML文档的主要文本输入。这个输入构成了将被结构化为YAML格式的内容基础。
    - Comfy dtype: STRING
    - Python dtype: str
- classifier_list
    - 一个逗号分隔的分类器列表，用于指导语言模型将输入文本结构化为YAML文档。这些分类器有助于更有效地对数据进行分类和组织。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_directions
    - 额外的指示，用于进一步指导语言模型生成YAML文档。这允许生成更加定制化和特定的YAML输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- yaml_output
    - 基于输入文本、分类器和任何额外提供的指示而生成的结构化和格式化的YAML文档。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMYamlComposer:
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
    RETURN_NAMES = ("yaml_output",)

    FUNCTION = "compose_yaml"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/YAML"

    def compose_yaml(self, llm_model, text_input, classifier_list, extra_directions=""):
        classifier_list = [item.strip() for item in classifier_list.split(",") if item.strip()]
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above text, create a valid YAML document utilizing *all* of the data; "
            f"using the following classifiers: {classifier_list}.\n\n"
            f"{extra_directions}\n\n"
            "Please ensure the YAML output is properly formatted, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
