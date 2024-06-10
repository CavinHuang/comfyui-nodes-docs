# Documentation
- Class name: IPAdapterTiled
- Category: ipadapter/tiled
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterTiled节点旨在通过平铺机制处理图像，这对于处理可能不适合作为整体处理时放入内存的大型图像特别有用。它对图像平铺应用一系列变换和调整，利用IPAdapter和CLIPVision模型的能力生成嵌入，这些嵌入可以用于进一步的处理或模型训练。

# Input types
## Required
- model
    - 模型参数是必需的，因为它代表了将用于处理图像数据的深度学习模型。它是节点功能的核心组件，决定了图像平铺最终如何被分析和转换。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数指定了适配器模型，该模型将与主模型一起使用以适配图像特征。它在节点修改和增强图像数据以提高模型性能的能力中起着关键作用。
    - Comfy dtype: IPADAPTER
    - Python dtype: Dict[str, Any]
- image
    - 图像输入是节点的主要数据源。它是原始图像数据，将被分解成平铺并由节点处理。图像数据的质量和格式直接影响节点的输出和后续分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- weight
    - 权重参数允许调整图像平铺对模型输出的影响。它可以微调每个平铺的贡献，以实现最终结果中所需的效果或平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - 输出模型代表了应用平铺和图像处理技术后的处理模型。它封装了已经应用于输入图像平铺的学到的特征和转换。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- tiles
    - 平铺输出包含处理后的图像平铺。每个平铺都经历了节点的转换过程，并且可以用于进一步使用或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- masks
    - 掩码输出提供了在处理图像平铺期间使用的关注掩码。这些掩码对于聚焦图像的特定区域或从分析中排除某些区域可能有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterTiled:

    def __init__(self):
        self.unfold_batch = False

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_type': (WEIGHT_TYPES,), 'combine_embeds': (['concat', 'add', 'subtract', 'average', 'norm average'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'sharpening': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',)}}
    RETURN_TYPES = ('MODEL', 'IMAGE', 'MASK')
    RETURN_NAMES = ('MODEL', 'tiles', 'masks')
    FUNCTION = 'apply_tiled'
    CATEGORY = 'ipadapter/tiled'

    def apply_tiled(self, model, ipadapter, image, weight, weight_type, start_at, end_at, sharpening, combine_embeds='concat', image_negative=None, attn_mask=None, clip_vision=None, embeds_scaling='V only'):
        if 'ipadapter' in ipadapter:
            ipadapter_model = ipadapter['ipadapter']['model']
            clip_vision = clip_vision if clip_vision is not None else ipadapter['clipvision']['model']
        else:
            ipadapter_model = ipadapter
            clip_vision = clip_vision
        if clip_vision is None:
            raise Exception('Missing CLIPVision model.')
        del ipadapter
        tile_size = 256
        (_, oh, ow, _) = image.shape
        if attn_mask is None:
            attn_mask = torch.ones([1, oh, ow], dtype=image.dtype, device=image.device)
        image = image.permute([0, 3, 1, 2])
        attn_mask = attn_mask.unsqueeze(1)
        attn_mask = T.Resize((oh, ow), interpolation=T.InterpolationMode.BICUBIC, antialias=True)(attn_mask)
        if oh / ow > 0.75 and oh / ow < 1.33:
            image = T.CenterCrop(min(oh, ow))(image)
            resize = (tile_size * 2, tile_size * 2)
            attn_mask = T.CenterCrop(min(oh, ow))(attn_mask)
        else:
            resize = (int(tile_size * ow / oh), tile_size) if oh < ow else (tile_size, int(tile_size * oh / ow))
        imgs = []
        for img in image:
            img = T.ToPILImage()(img)
            img = img.resize(resize, resample=Image.Resampling['LANCZOS'])
            imgs.append(T.ToTensor()(img))
        image = torch.stack(imgs)
        del imgs, img
        attn_mask = T.Resize(resize[::-1], interpolation=T.InterpolationMode.BICUBIC, antialias=True)(attn_mask)
        if oh / ow > 4 or oh / ow < 0.25:
            crop = (tile_size, tile_size * 4) if oh < ow else (tile_size * 4, tile_size)
            image = T.CenterCrop(crop)(image)
            attn_mask = T.CenterCrop(crop)(attn_mask)
        attn_mask = attn_mask.squeeze(1)
        if sharpening > 0:
            image = contrast_adaptive_sharpening(image, sharpening)
        image = image.permute([0, 2, 3, 1])
        (_, oh, ow, _) = image.shape
        tiles_x = math.ceil(ow / tile_size)
        tiles_y = math.ceil(oh / tile_size)
        overlap_x = max(0, (tiles_x * tile_size - ow) / (tiles_x - 1 if tiles_x > 1 else 1))
        overlap_y = max(0, (tiles_y * tile_size - oh) / (tiles_y - 1 if tiles_y > 1 else 1))
        base_mask = torch.zeros([attn_mask.shape[0], oh, ow], dtype=image.dtype, device=image.device)
        tiles = []
        masks = []
        for y in range(tiles_y):
            for x in range(tiles_x):
                start_x = int(x * (tile_size - overlap_x))
                start_y = int(y * (tile_size - overlap_y))
                tiles.append(image[:, start_y:start_y + tile_size, start_x:start_x + tile_size, :])
                mask = base_mask.clone()
                mask[:, start_y:start_y + tile_size, start_x:start_x + tile_size] = attn_mask[:, start_y:start_y + tile_size, start_x:start_x + tile_size]
                masks.append(mask)
        del mask
        model = model.clone()
        for i in range(len(tiles)):
            ipa_args = {'image': tiles[i], 'image_negative': image_negative, 'weight': weight, 'weight_type': weight_type, 'combine_embeds': combine_embeds, 'start_at': start_at, 'end_at': end_at, 'attn_mask': masks[i], 'unfold_batch': self.unfold_batch, 'embeds_scaling': embeds_scaling}
            model = ipadapter_execute(model, ipadapter_model, clip_vision, **ipa_args)
        return (model, torch.cat(tiles), torch.cat(masks))
```