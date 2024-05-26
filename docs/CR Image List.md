# Documentation
- Class name: CR_ImageList
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ImageList 节点旨在管理和组织图像列表。它允许用户输入单独的图像及其对应的别名，并将它们组合成单个图像列表。这个节点特别适用于需要一起处理或显示图像集合的应用程序。

# Input types
## Optional
- image_1
    - 'image_1' 参数表示可以添加到图像列表中的第一个图像。它在节点的操作中起着关键作用，通过贡献给节点管理的最终图像集合。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]
- alias1
    - 'alias1' 参数是一个可选的字符串，可用于为 'image_1' 提供别名。这对于以更易读的格式引用图像非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- image_list
    - 'image_list' 参数是一个包含别名和图像的元组列表。这个参数至关重要，因为它允许节点处理一个预先存在的图像和别名集合。
    - Comfy dtype: image_LIST
    - Python dtype: List[Tuple[str, Union[str, torch.Tensor]]]

# Output types
- IMAGE_LIST
    - 'IMAGE_LIST' 输出是图像别名与其对应图像配对的列表。它代表了节点处理的所有输入图像和别名的集合。
    - Comfy dtype: image_LIST
    - Python dtype: List[Tuple[str, Union[str, torch.Tensor]]]
- show_help
    - 'show_help' 输出提供了一个链接到文档的URL，以获得更多帮助。这对于寻求如何有效使用节点的更多信息的用户特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ImageList:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'image_1': ('IMAGE',), 'alias1': ('STRING', {'multiline': False, 'default': ''}), 'image_2': ('IMAGE',), 'alias2': ('STRING', {'multiline': False, 'default': ''}), 'image_3': ('IMAGE',), 'alias3': ('STRING', {'multiline': False, 'default': ''}), 'image_4': ('IMAGE',), 'alias4': ('STRING', {'multiline': False, 'default': ''}), 'image_5': ('IMAGE',), 'alias5': ('STRING', {'multiline': False, 'default': ''}), 'image_list': ('image_LIST',)}}
    RETURN_TYPES = ('IMAGE_LIST', 'STRING')
    RETURN_NAMES = ('IMAGE_LIST', 'show_help')
    FUNCTION = 'image_list'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def image_list(self, image_1=None, alias1=None, image_2=None, alias2=None, image_3=None, alias3=None, image_4=None, alias4=None, image_5=None, alias5=None, image_list=None):
        images = list()
        if image_list is not None:
            image_tup = [(alias1, image_1)]
            images.extend([l for l in image_list])
        if image_1 != None:
            (images.extend([(alias1, image_1)]),)
        if image_2 != None:
            (images.extend([(alias2, image_2)]),)
        if image_3 != None:
            (images.extend([(alias3, image_3)]),)
        if image_4 != None:
            (images.extend([(alias4, image_4)]),)
        if image_5 != None:
            (images.extend([(alias5, image_5)]),)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-image-list'
        return (images, show_help)
```