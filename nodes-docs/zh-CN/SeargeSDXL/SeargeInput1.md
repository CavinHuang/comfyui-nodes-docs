# Documentation
- Class name: SeargeInput1
- Category: Searge/_deprecated_/UI/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeInput1节点作为Searge系统的输入接口，用于收集和组织各种提示和可选输入。它旨在通过允许用户指定主要、次要、风格和负面提示，以及可选的图像、掩码和附加参数，将它们封装成结构化格式以供下游任务使用，从而简化输入过程。

# Input types
## Required
- main_prompt
    - main_prompt参数对于定义输入的主要上下文或主题至关重要。它是一个可以跨越多行的字符串，允许详细的描述，这对于节点的操作和生成所需的输出至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- secondary_prompt
    - secondary_prompt提供补充main_prompt的附加上下文或细节。它增强了节点理解和处理输入的能力，有助于产生更细致的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- style_prompt
    - style_prompt参数用于指定输出应体现的风格元素或语气。它是塑造最终结果的美学或主题质量的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - negative_prompt用于指示在输出中应避免哪些方面或特征。它在引导节点从最终产品中排除不需要的元素中起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_style
    - negative_style参数通过进一步指定要省略的风格或质量来补充negative_prompt。它是微调输出以满足特定要求的重要工具。
    - Comfy dtype: STRING
    - Python dtype: str
- inputs
    - inputs参数是一个可选的字典，可以包含节点使用的其他参数。它提供了节点操作的灵活性，允许根据特定用例进行定制。
    - Comfy dtype: PARAMETER_INPUTS
    - Python dtype: Dict[str, Any]
- image
    - image参数是一个可选输入，允许包含视觉数据进行处理。当处理与图像相关的任务时，它可以显著影响节点的执行和输出的性质。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- mask
    - mask参数是一个可选输入，用于定义在处理期间应该被不同对待或忽略的图像区域。对于需要选择性操作视觉数据的任务来说，它是必不可少的。
    - Comfy dtype: MASK
    - Python dtype: np.ndarray

# Output types
- inputs
    - 'inputs'输出是封装了节点提供的提示和可选输入的结构化参数集合。它是Searge系统内后续处理步骤的基础。
    - Comfy dtype: PARAMETER_INPUTS
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeInput1:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'main_prompt': ('STRING', {'multiline': True, 'default': ''}), 'secondary_prompt': ('STRING', {'multiline': True, 'default': ''}), 'style_prompt': ('STRING', {'multiline': True, 'default': ''}), 'negative_prompt': ('STRING', {'multiline': True, 'default': ''}), 'negative_style': ('STRING', {'multiline': True, 'default': ''})}, 'optional': {'inputs': ('PARAMETER_INPUTS',), 'image': ('IMAGE',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('PARAMETER_INPUTS',)
    RETURN_NAMES = ('inputs',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/UI/Inputs'

    def mux(self, main_prompt, secondary_prompt, style_prompt, negative_prompt, negative_style, inputs=None, image=None, mask=None):
        if inputs is None:
            parameters = {}
        else:
            parameters = inputs
        parameters['main_prompt'] = main_prompt
        parameters['secondary_prompt'] = secondary_prompt
        parameters['style_prompt'] = style_prompt
        parameters['negative_prompt'] = negative_prompt
        parameters['negative_style'] = negative_style
        parameters['image'] = image
        parameters['mask'] = mask
        return (parameters,)
```