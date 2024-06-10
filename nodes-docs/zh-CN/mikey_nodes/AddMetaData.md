# Documentation
- Class name: AddMetaData
- Category: Mikey/Meta
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

AddMetaData节点旨在通过附加文本信息来丰富图像数据。它通过将指定的文本值附加到图像的元数据中来实现这一点，其中可以包括日期或工作流中其他节点的数据等动态元素。该节点在创建全面的元数据方面发挥着关键作用，可以增强图像的实用性和上下文，适用于各种应用场景。

# Input types
## Required
- image
    - 图像参数是必不可少的，因为它是节点操作的主要数据对象。它代表了将添加元数据的图像。节点的执行围绕这张图像进行，使其成为过程中的一个基本组成部分。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or similar image object
- label
    - 标签参数作为元数据的描述符。它是一个必需字段，为附加到图像的元数据提供文本标识符。这个标签很重要，因为它对正在添加的元数据进行分类和描述。
    - Comfy dtype: STRING
    - Python dtype: str
- text_value
    - 文本值参数对节点的功能至关重要，因为它定义了将包含在图像元数据中的特定文本。此文本可以是静态的或动态的，允许以灵活的方式丰富元数据。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prompt
    - 可选的提示参数可以用来将动态数据注入到元数据中。当元数据需要来自工作流中其他节点或组件的信息时，它特别有用，允许进行更具交互性和上下文感知的元数据创建过程。
    - Comfy dtype: PROMPT
    - Python dtype: dict or str
- extra_pnginfo
    - 额外的PNG信息参数虽然是可选的，但可以提供特定于图像的额外上下文或详细信息。它可以用来存储不属于主要元数据直接部分但对某些应用或分析仍相关的额外信息。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: dict or str

# Output types
- image_with_metadata
    - AddMetaData节点的输出是带有添加元数据的原始图像。这个输出代表了节点处理的成果，其中图像现在已用指定的文本值丰富，准备用于进一步使用或分发。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or similar image object

# Usage tips
- Infra type: CPU

# Source code
```
class AddMetaData:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'label': ('STRING', {'multiline': False, 'placeholder': 'Label for metadata'}), 'text_value': ('STRING', {'multiline': True, 'placeholder': 'Text to add to metadata'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'add_metadata'
    CATEGORY = 'Mikey/Meta'
    OUTPUT_NODE = True

    def add_metadata(self, image, label, text_value, prompt=None, extra_pnginfo=None):
        label = search_and_replace(label, extra_pnginfo, prompt)
        text_value = search_and_replace(text_value, extra_pnginfo, prompt)
        if extra_pnginfo is None:
            extra_pnginfo = {}
        if label in extra_pnginfo:
            extra_pnginfo[label] += ', ' + text_value
        else:
            extra_pnginfo[label] = text_value
        return (image,)
```