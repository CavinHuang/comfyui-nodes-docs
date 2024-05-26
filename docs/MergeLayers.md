# Documentation
- Class name: MergeLayers
- Category: ♾️Mixlab/Layer
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

MergeLayers节点旨在将多个层集成到基础图像上。它处理一系列图像和相应的层，将每个层应用到基础图像上，位置已指定，可进行可选缩放，并生成一个合成图像以及一个遮罩，该遮罩描绘了分层区域。

# Input types
## Required
- layers
    - 'layers'参数是字典列表，每个字典代表要合并到基础图像上的一个层。每个字典包含一个层的图像、遮罩和位置属性，这些属性对于确定分层图像的最终组合至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: List[Dict[str, Union[str, torch.Tensor]]]
- images
    - 'images'参数是要合并层的基础图像列表。每个图像都应该是张量格式，表示将作为分层过程画布的原始像素数据。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: List[torch.Tensor]

# Output types
- IMAGE
    - 'IMAGE'输出是一个张量，代表通过将输入层合并到基础图像上形成的最终合成图像。它包含了分层过程的视觉结果。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- MASK
    - 'MASK'输出是一个张量，代表在分层过程中应用的遮罩。它用于识别图像的分层区域，清晰地区分不同的层。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MergeLayers:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'layers': ('LAYER',), 'images': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    RETURN_NAMES = ('IMAGE', 'MASK')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Layer'
    INPUT_IS_LIST = True

    def run(self, layers, images):
        bg_images = []
        masks = []
        for img in images:
            for bg_image in img:
                bg_image = tensor2pil(bg_image)
                layers_new = sorted(layers, key=lambda x: x['z_index'])
                (width, height) = bg_image.size
                final_mask = Image.new('L', (width, height), 0)
                for layer in layers_new:
                    image = layer['image']
                    mask = layer['mask']
                    if 'type' in layer and layer['type'] == 'base64' and (type(image) == str):
                        im = base64_to_image(image)
                        im = im.convert('RGB')
                        image = pil2tensor(im)
                        mask = base64_to_image(mask)
                        mask = mask.convert('L')
                        mask = pil2tensor(mask)
                    layer_image = tensor2pil(image)
                    layer_mask = tensor2pil(mask)
                    bg_image = merge_images(bg_image, layer_image, layer_mask, layer['x'], layer['y'], layer['width'], layer['height'], layer['scale_option'])
                    final_mask = merge_images(final_mask, layer_mask.convert('RGB'), layer_mask, layer['x'], layer['y'], layer['width'], layer['height'], layer['scale_option'])
                    final_mask = final_mask.convert('L')
                final_mask = pil2tensor(final_mask)
                bg_image = bg_image.convert('RGB')
                bg_image = pil2tensor(bg_image)
                bg_images.append(bg_image)
                masks.append(final_mask)
        bg_images = torch.cat(bg_images, dim=0)
        masks = torch.cat(masks, dim=0)
        return (bg_images, masks)
```