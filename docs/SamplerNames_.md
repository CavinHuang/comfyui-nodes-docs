# Documentation
- Class name: CreateSampler_names
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点简化了生成采样器名称列表的过程，这些名称可以在各种采样应用中使用。它强调节点在准备和清理输入以提取有效的采样器名称方面的作用，确保输出是一套干净且可用的标识符集合。

# Input types
## Required
- sampler_names
    - 这个参数至关重要，因为它提供了将从中提取采样器名称的原始文本。它对节点执行的影响很大，因为输入文本的质量和格式直接影响到生成的采样器名称的准确性和实用性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- sampler_names
    - 输出代表一个经过精炼的有效采样器名称列表，去除了所有不必要的信息。这个列表对于依赖准确采样器标识符正确运行的下游过程至关重要。
    - Comfy dtype: LIST
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class CreateSampler_names:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'sampler_names': ('STRING', {'multiline': True, 'default': '\n'.join(comfy.samplers.KSampler.SAMPLERS), 'dynamicPrompts': False})}}
    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ('sampler_names',)
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'

    def run(self, sampler_names):
        sampler_names = sampler_names.split('\n')
        sampler_names = [name for name in sampler_names if name.strip()]
        return (sampler_names,)
```