
# Documentation
- Class name: LLMYamlRepair
- Category: SALT/Language Toolkit/Tools/YAML
- Output node: False

LLMYamlRepair节点旨在检查和修正格式错误的YAML内容，确保其有效性和正确格式，同时避免数据丢失，并可根据可选的附加指令进行引导。

# Input types
## Required
- llm_model
    - 指定用于修复YAML的语言模型，是解释和纠正格式错误输入的核心。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- text_input
    - 需要修复的格式错误YAML内容，作为分析和纠正的主要输入。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_directions
    - 可选的指令，用于指导修复过程，允许自定义修复策略。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- yaml_output
    - 修复过程产生的经过纠正且有效的YAML内容。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMYamlRepair:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Malformed YAML..."}),
            },
            "optional": {
                "extra_directions": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Extra directions for the LLM to follow..."}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("yaml_output",)

    FUNCTION = "repair_yaml"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/YAML"

    def repair_yaml(self, llm_model, text_input, extra_directions=""):
        prompt = (
            f"{text_input}\n\n###\n\n"
            "Given the above malformed YAML, please inspect it and repair it so that it's valid YAML, without changing or losing any data if possible."
            f"{extra_directions}\n\n"
            "Please ensure the YAML output is properly formatted, and does not omit any data."
        )
        
        response = llm_model['llm'].complete(prompt)
        
        return (response.text,)

```
