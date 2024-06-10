# Documentation
- Class name: SaveImageIfTrue
- Category: Mikey/Image
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

方法 'save_image_if_true' 旨在根据条件保存图像到文件。它评估一个保存条件，如果条件满足，则使用 'SaveImagesMikey' 类来执行实际的图像保存过程，包括处理元数据和文件命名约定。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它代表了可能被保存的图像。其质量和内容直接影响保存过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- save_condition
    - save_condition 参数作为保存过程的开关。它非常重要，因为它的值（0或1）决定了图像是否会被保存。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- filename_prefix
    - filename_prefix 参数对于定义保存图像文件的前缀很重要。它可以自定义命名约定，特别适用于组织保存的文件。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - result 参数封装了保存操作的结果。它包括诸如图像保存的文件名和子文件夹等详细信息，提供了保存过程的记录。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Union[str, Dict[str, str]]]

# Usage tips
- Infra type: CPU

# Source code
```
class SaveImageIfTrue:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'save_condition': ('INT', {'default': 0, 'min': 0, 'max': 1}), 'filename_prefix': ('STRING', {'default': ''})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save_image_if_true'
    OUTPUT_NODE = True
    CATEGORY = 'Mikey/Image'

    def save_image_if_true(self, image, save_condition, filename_prefix, prompt=None, extra_pnginfo=None):
        if save_condition == 1:
            save_images = SaveImagesMikey()
            result = save_images.save_images(image, filename_prefix, prompt, extra_pnginfo, positive_prompt='', negative_prompt='')
            return result
        else:
            return {'save_image_if_true': {'filename': '', 'subfolder': ''}}
```