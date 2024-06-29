# Documentation
- Class name: SeargeOutput7
- Category: Searge/_deprecated_/UI/Outputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为数据解复用接口，将输入数据分离成不同的流以进行进一步处理。它旨在通过组织和优先处理数据流来增强工作流程，确保特定的数据属性得到它们所需的适当关注。

# Input types
## Required
- parameters
    - 该参数至关重要，因为它包含了节点将要解复用的数据，允许根据预定义的结构分离不同的属性。
    - Comfy dtype: COMBO[{"type": "dict", "schema": {"lora_strength": "float"}}]
    - Python dtype: Dict[str, float]

# Output types
- parameters
    - 输出保留了输入数据的原始结构，确保解复用后的数据有组织且易于后续操作访问。
    - Comfy dtype: dict
    - Python dtype: Dict[str, Any]
- lora_strength
    - 此输出代表从输入数据中解复用出的特定属性，突出了它在数据处理工作流中的重要性。
    - Comfy dtype: float
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeOutput7:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameters': ('PARAMETERS',)}}
    RETURN_TYPES = ('PARAMETERS', 'FLOAT')
    RETURN_NAMES = ('parameters', 'lora_strength')
    FUNCTION = 'demux'
    CATEGORY = 'Searge/_deprecated_/UI/Outputs'

    def demux(self, parameters):
        lora_strength = parameters['lora_strength']
        return (parameters, lora_strength)
```