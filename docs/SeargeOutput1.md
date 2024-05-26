# Documentation
- Class name: SeargeOutput1
- Category: Searge/_deprecated_/UI/Outputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类作为一个接口，用于将输入参数解复用为不同的输出，便于系统内部数据的组织和流动。

# Input types
## Required
- parameters
    - 参数输入对于节点的操作至关重要，它包含了节点操作所需的各种提示和图像。它是解复用过程的主要信息来源。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- parameters
    - 输出'parameters'是输入的反映，标志着通过节点的数据完整性。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]
- main_prompt
    - 输出'main_prompt'代表指导系统内部后续处理或内容生成的主要文本输入。
    - Comfy dtype: String
    - Python dtype: str
- secondary_prompt
    - 此输出提供补充的文本内容，以丰富用于系统进一步操作的数据。
    - Comfy dtype: String
    - Python dtype: str
- style_prompt
    - 输出'style_prompt'用于定义应纳入系统处理或生成的风格元素或主题。
    - Comfy dtype: String
    - Python dtype: str
- negative_prompt
    - 此输出包含系统在处理或内容生成过程中应避免或排除的信息。
    - Comfy dtype: String
    - Python dtype: str
- negative_style
    - 输出'negative_style'指定系统在生成内容时应有意识避免的风格元素或主题。
    - Comfy dtype: String
    - Python dtype: str
- image
    - 输出'image'是一个视觉元素，可以作为输入提供或在系统内部生成，影响后续的视觉处理或内容创建。
    - Comfy dtype: Image
    - Python dtype: PIL.Image
- mask
    - 输出'mask'是一个二进制或多类别的数组，它指示在处理过程中哪些部分的图像或内容应该被操作或保护。
    - Comfy dtype: Mask
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeOutput1:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameters': ('PARAMETERS',)}}
    RETURN_TYPES = ('PARAMETERS', 'STRING', 'STRING', 'STRING', 'STRING', 'STRING', 'IMAGE', 'MASK')
    RETURN_NAMES = ('parameters', 'main_prompt', 'secondary_prompt', 'style_prompt', 'negative_prompt', 'negative_style', 'image', 'mask')
    FUNCTION = 'demux'
    CATEGORY = 'Searge/_deprecated_/UI/Outputs'

    def demux(self, parameters):
        main_prompt = parameters['main_prompt']
        secondary_prompt = parameters['secondary_prompt']
        style_prompt = parameters['style_prompt']
        negative_prompt = parameters['negative_prompt']
        negative_style = parameters['negative_style']
        image = parameters['image']
        mask = parameters['mask']
        return (parameters, main_prompt, secondary_prompt, style_prompt, negative_prompt, negative_style, image, mask)
```