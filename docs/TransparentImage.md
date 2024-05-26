# Documentation
- Class name: TransparentImage
- Category: ♾️Mixlab/Image
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

TransparentImage节点旨在处理和操作具有透明度的图像，提供创建和管理带有遮罩的图像的功能。它能够进行颜色反转、保存处理后的图像以及处理各种图像格式。该节点在增强视觉内容方面发挥着关键作用，通过将遮罩应用于图像，允许实现创新的视觉效果和修改。

# Input types
## Required
- images
    - ‘images’参数对于节点的操作至关重要，因为它是将被处理的输入图像。这是一个关键元素，直接影响节点的输出，决定了将被转换和操作的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- masks
    - ‘masks’参数定义了将应用于输入图像的遮罩。它是节点功能的必要组成部分，因为它决定了图像中将受到遮罩处理影响的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- invert
    - ‘invert’参数允许在处理后的图像中反转颜色。这是一个可选功能，可以显著改变视觉结果，提供了一种在图像内部创建对比效果的手段。
    - Comfy dtype: COMBO['yes', 'no']
    - Python dtype: str
- save
    - ‘save’参数决定处理后的图像是否会被保存到磁盘。这是节点的一个关键决策点，因为它影响对图像所做的视觉更改的持久性。
    - Comfy dtype: COMBO['yes', 'no']
    - Python dtype: str
- filename_prefix
    - ‘filename_prefix’参数用于指定保存的图像文件的前缀。它提供了一种更有效地组织和识别输出文件的方法，增强了保存的视觉内容的可管理性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- file_path
    - ‘file_path’输出提供了保存的图像文件的路径。它很重要，因为它许用户定位和访问处理后的图像，以供进一步使用或分发。
    - Comfy dtype: STRING
    - Python dtype: str
- IMAGE
    - ‘IMAGE’输出代表了以RGB格式处理后的图像。它是节点操作的直接结果，对于可视化对输入图像所做的修改至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- RGBA
    - ‘RGBA’输出包含了带有透明度信息的处理后的图像。对于需要保留原始图像的alpha通道以进行进一步编辑或合成的应用来说，这是一个重要方面。
    - Comfy dtype: RGBA
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class TransparentImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'masks': ('MASK',), 'invert': (['yes', 'no'],), 'save': (['yes', 'no'],)}, 'optional': {'filename_prefix': ('STRING', {'multiline': False, 'default': 'Mixlab_save'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('STRING', 'IMAGE', 'RGBA')
    RETURN_NAMES = ('file_path', 'IMAGE', 'RGBA')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    OUTPUT_IS_LIST = (True, True, True)

    def run(self, images, masks, invert, save, filename_prefix, prompt=None, extra_pnginfo=None):
        ui_images = []
        image_paths = []
        count = images.shape[0]
        masks_new = []
        nh = masks.shape[0] // count
        masks_new = masks
        if images.shape[0] == masks.shape[0] and images.shape[1] == masks.shape[1] and (images.shape[2] == masks.shape[2]):
            print('TransparentImage', images.shape, images.size(), masks.shape, masks.size())
        elif nh * count == masks.shape[0]:
            masks_new = split_mask_by_new_height(masks, nh)
        else:
            masks_new = split_mask_by_new_height(masks, masks.shape[0])
        is_save = True if save == 'yes' else False
        images_rgb = []
        images_rgba = []
        for i in range(len(images)):
            image = images[i]
            mask = masks_new[i]
            result = doMask(image, mask, is_save, filename_prefix, invert, not is_save, prompt, extra_pnginfo)
            for item in result['result']:
                ui_images.append(item)
            image_paths.append(result['image_path'])
            images_rgb.append(result['im_tensor'])
            images_rgba.append(result['im_rgba_tensor'])
        return {'ui': {'images': ui_images, 'image_paths': image_paths}, 'result': (image_paths, images_rgb, images_rgba)}
```