# Documentation
- Class name: CR_ImageListSimple
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImageListSimple节点旨在将多个图像输入编译成单一的结构化格式。它通过将多个图像源整合成一份连贯的列表，简化了处理多个图像来源的过程，从而便于后续的图像处理任务。

# Input types
## Optional
- image_1
    - 'image_1'参数是可选的图像输入之一，可以提供给节点。它在将图像聚合成列表中发挥作用，有助于最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image_2
    - 'image_2'参数是节点的另一个可选图像输入。它对于增加图像列表的多样性至关重要，确保了视觉数据的全面收集。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image_3
    - 'image_3'参数用于向节点的处理流程中引入另一个可选图像。它的包含丰富了图像列表，增强了节点的功能。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image_4
    - 'image_4'参数允许包含一个额外的可选图像。它对于扩展可以由节点处理的图像范围具有重要意义。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image_5
    - 'image_5'参数是节点可以接受的最后一个可选图像输入。它确保节点可以处理广泛的图像输入，最大化其多功能性。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- image_list_simple
    - 'image_list_simple'参数是一个可选输入，允许将预先存在的图像列表输入到节点中。对于希望使用策划好的图像列表而不是单独输入的用户来说，它是必不可少的。
    - Comfy dtype: IMAGE_LIST_SIMPLE
    - Python dtype: Union[List[str], List[torch.Tensor]]

# Output types
- IMAGE_LIST_SIMPLE
    - 'IMAGE_LIST_SIMPLE'输出是节点处理后的图像的整合列表。它很重要，因为它构成了进一步图像操作或分析的基础。
    - Comfy dtype: IMAGE_LIST_SIMPLE
    - Python dtype: List[torch.Tensor]
- show_help
    - 'show_help'输出提供了一个文档的URL链接，以便进一步帮助。对于需要额外指导如何有效使用节点的用户来说，它是有用的。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImageListSimple:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'image_1': ('IMAGE',), 'image_2': ('IMAGE',), 'image_3': ('IMAGE',), 'image_4': ('IMAGE',), 'image_5': ('IMAGE',), 'image_list_simple': ('IMAGE_LIST_SIMPLE',)}}
    RETURN_TYPES = ('IMAGE_LIST_SIMPLE', 'STRING')
    RETURN_NAMES = ('IMAGE_LIST_SIMPLE', 'show_help')
    FUNCTION = 'image_list_simple'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def image_list_simple(self, image_1=None, image_2=None, image_3=None, image_4=None, image_5=None, image_list_simple=None):
        images = list()
        if image_list_simple is not None:
            images.append((l for l in image_list_simple))
        if image_1 != None:
            (images.append(image_1),)
        if image_2 != None:
            images.append(image_2)
        if image_3 != None:
            images.append(image_3)
        if image_4 != None:
            (images.append(image_4),)
        if image_5 != None:
            (images.append(image_5),)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-image-list-simple'
        return (images, show_help)
```