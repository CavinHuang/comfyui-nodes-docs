# Documentation
- Class name: CR_ThumbnailPreview
- Category: Comfyroll/Graphics/Template
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ThumbnailPreview节点旨在处理并展示一系列图像作为缩略图。它将图像缩小到指定大小，添加边框以视觉区分，并以网格格式排列它们，便于审查。该节点特别适用于需要紧凑显示多个图像的应用场景，如预览或画廊。

# Input types
## Required
- image
    - 'image'参数是表示要处理的图像的输入张量。它是节点操作的基础，因为它是将被转换成缩略图预览的原始数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- rescale_factor
    - 'rescale_factor'参数决定了图像的缩放比例。它对于控制缩略图的大小至关重要，允许用户根据需要调整预览大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_columns
    - 'max_columns'参数指定了缩略图网格布局中的最大列数。它影响图像的排列方式，对于整体网格的展示效果很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- ui
    - 'ui'输出参数是一个包含以网格排列的图像的字典。它很重要，因为它为显示目的提供了缩略图的最终视觉表示。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, List[Dict[str, Union[str, torch.Tensor]]]]
- result
    - 'result'输出参数是一个包含指向帮助文档URL的元组。对于需要有关节点功能额外指导或信息的用户来说，它是有用的。
    - Comfy dtype: TUPLE
    - Python dtype: Tuple[str,]

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ThumbnailPreview:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'rescale_factor': ('FLOAT', {'default': 0.25, 'min': 0.1, 'max': 1.0, 'step': 0.01}), 'max_columns': ('INT', {'default': 5, 'min': 0, 'max': 256})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('show_help',)
    OUTPUT_NODE = True
    FUNCTION = 'thumbnail'
    CATEGORY = icons.get('Comfyroll/Graphics/Template')

    def thumbnail(self, image, rescale_factor, max_columns):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Template-Nodes#cr-thumbnail-preview'
        result_images = []
        outline_thickness = 1
        for img in image:
            pil_img = tensor2pil(img)
            (original_width, original_height) = pil_img.size
            rescaled_img = apply_resize_image(tensor2pil(img), original_width, original_height, 8, 'rescale', 'false', rescale_factor, 256, 'lanczos')
            outlined_img = ImageOps.expand(rescaled_img, outline_thickness, fill='black')
            result_images.append(outlined_img)
        combined_image = make_grid_panel(result_images, max_columns)
        images_out = pil2tensor(combined_image)
        results = []
        for tensor in images_out:
            array = 255.0 * tensor.cpu().numpy()
            image = Image.fromarray(np.clip(array, 0, 255).astype(np.uint8))
            server = PromptServer.instance
            server.send_sync(BinaryEventTypes.UNENCODED_PREVIEW_IMAGE, ['PNG', image, None], server.client_id)
            results.append({'source': 'websocket', 'content-type': 'image/png', 'type': 'output'})
        return {'ui': {'images': results}, 'result': (show_help,)}
```