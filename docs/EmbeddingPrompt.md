# Documentation
- Class name: EmbeddingPrompt
- Category: ♾️Mixlab/Prompt
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点类基于嵌入和相关权重生成提示，使用户能够调整特定嵌入在输出中的影响。

# Input types
## Required
- embedding
    - 嵌入参数至关重要，因为它定义了生成提示的基础上下文或主题。它从可用嵌入的列表中选择，确保提示与所选上下文相关。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- weight
    - 权重参数调整所选嵌入对最终提示的影响，允许对输出强调嵌入上下文的细微控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- prompt
    - 输出提示是一个字符串，整合了所选嵌入及其权重，形成了一个简洁且针对性的声明，可作为各种应用的输入。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class EmbeddingPrompt:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'embedding': (get_files_with_extension(embeddings_path, '.pt'),), 'weight': ('FLOAT', {'default': 1, 'min': -2, 'max': 2, 'step': 0.01, 'display': 'slider'})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Prompt'
    OUTPUT_IS_LIST = (False,)

    def run(self, embedding, weight):
        weight = round(weight, 3)
        prompt = 'embedding:' + embedding
        if weight != 1:
            prompt = '(' + prompt + ':' + str(weight) + ')'
        prompt = ' ' + prompt + ' '
        return (prompt,)
```