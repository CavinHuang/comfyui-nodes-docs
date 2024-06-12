# Documentation
- Class name: CR_SeamlessChecker
- Category: Comfyroll/Graphics/Template
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SeamlessChecker节点用于检查图像的无缝拼接效果。该节点通过调整图像大小、生成网格布局，并展示多个图像的缩放版本，使用户能够识别和评估图像的拼接质量。它广泛应用于图形设计和图像处理领域，确保最终的视觉效果实现无缝衔接。

# Input types
## Required
- image
    - 图像参数是节点处理的主要对象，它直接影响节点的执行和检查结果，是进行无缝拼接检查的源数据。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image 或 torch.Tensor
- rescale_factor
    - 缩放因子参数用于调整图像尺寸，对于评估图像的无缝拼接效果非常关键。用户可以通过此参数控制图像的缩放程度，以便更精确地查看拼接的细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- grid_options
    - 网格选项参数用于定义图像在网格中的布局方式，它决定了在进行无缝拼接检查时展示的图像数量。此参数对于展示多个图像的缩放版本以及评估整个网格的拼接效果具有重要意义。
    - Comfy dtype: COMBO['2x2', '3x3', '4x4', '5x5', '6x6']
    - Python dtype: str

# Output types
- show_help
    - 帮助信息提供了节点使用指南和进一步的资源链接，以便用户能够更有效地理解和操作节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SeamlessChecker:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'rescale_factor': ('FLOAT', {'default': 0.25, 'min': 0.1, 'max': 1.0, 'step': 0.01}), 'grid_options': (['2x2', '3x3', '4x4', '5x5', '6x6'],)}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('show_help',)
    OUTPUT_NODE = True
    FUNCTION = 'thumbnail'
    CATEGORY = icons.get('Comfyroll/Graphics/Template')

    def thumbnail(self, image, rescale_factor, grid_options):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-seamless-checker'
        outline_thickness = 0
        pil_img = tensor2pil(image)
        (original_width, original_height) = pil_img.size
        rescaled_img = apply_resize_image(tensor2pil(image), original_width, original_height, 8, 'rescale', 'false', rescale_factor, 256, 'lanczos')
        outlined_img = ImageOps.expand(rescaled_img, outline_thickness, fill='black')
        max_columns = int(grid_options[0])
        repeat_images = [outlined_img] * max_columns ** 2
        combined_image = make_grid_panel(repeat_images, max_columns)
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