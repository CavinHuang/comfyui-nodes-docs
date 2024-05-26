# Documentation
- Class name: DPJinja
- Category: Prompt Generation
- Output node: False
- Repo Ref: https://github.com/adieyal/comfyui-dynamicprompts.git

DPJinja节点旨在使用Jinja模板语法生成提示。它利用JinjaGenerator基于提供的文本和模板配置创建一组提示，提供了一种灵活的方法来生成根据特定需求量身定制的动态提示。

# Input types
## Required
- text
    - “text”参数是Jinja模板将生成提示的源材料。它至关重要，因为它直接影响生成提示的内容和多样性。
    - Comfy dtype: "str"
    - Python dtype: str

# Output types
- prompts
    - “prompts”输出是基于输入文本和Jinja模板生成的提示列表。它代表了节点功能的主要结果，包含了提示生成过程的动态特性。
    - Comfy dtype: COMBO["str"]
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class DPJinja(DPGeneratorNode):

    def generate_prompt(self, text):
        prompt_generator = JinjaGenerator()
        all_prompts = prompt_generator.generate(text, 1) or ['']
        return str(all_prompts[0])
```