# Documentation
- Class name: FooocusPromptExpansion
- Category: prompt
- Output node: True
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

该节点旨在根据输入文本和种子值扩展和生成新文本，种子值引入了随机性，旨在增强生成内容的多样性和创造性，同时通过种子值保持一定程度的可控性。

# Input types
## Required
- text
    - 文本参数是节点文本扩展过程的源材料。它至关重要，因为它为新内容的生成提供了上下文和基础。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- seed
    - 种子参数为文本扩展过程引入随机性，允许从相同的输入文本生成多样化的输出。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - 结果参数包含扩展后的文本，是节点文本扩展过程的输出。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class FooocusPromptExpansion:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'main'
    CATEGORY = 'prompt'
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True

    @staticmethod
    def scale_seed(seed):
        return seed % (2 ** 32 - 1)

    def main(self, text, seed):
        seed = FooocusPromptExpansion.scale_seed(seed)
        res = do_expansion(text, seed)
        logger.info(f'[FooocusPromptExpansion] (seed={seed}) expand |{text}| to |{res}|')
        return {'ui': {'result': [res]}, 'result': ([res],)}
```