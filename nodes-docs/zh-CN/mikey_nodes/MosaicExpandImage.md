# Documentation
- Class name: MosaicExpandImage
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

MosaicExpandImage节点旨在通过在图像边框周围创建马赛克效果来增强图像的视觉吸引力。它以一种非均匀的、艺术化的方式智能扩展图像，产生的结果既视觉上引人注目，又保持了原始图像内容的完整性。

# Input types
## Required
- image
    - 图像参数是节点的核心输入，代表将要通过马赛克效果艺术性扩展的原始图像。它对节点的操作至关重要，因为它决定了将要转换的基础内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- left
    - left参数指定在图像左侧添加的马赛克块的数量。它在确定左侧扩展区域的宽度方面起着关键作用，有助于形成最终马赛克效果的整体美感。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - top参数决定在图像顶部添加的马赛克块的数量。它在塑造顶部扩展区域的高度方面很重要，影响所创建的整体马赛克图案。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - right参数设置要添加到图像右侧的马赛克块的数量。它对于控制右侧马赛克边框的宽度至关重要，影响马赛克扩展的最终视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - bottom参数确定要在图像底部包含的马赛克块的数量。它是建立底部马赛克边框高度的关键因素，这对于整体马赛克设计至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result_img
    - result_img输出参数代表应用了马赛克扩展的最终图像。它是节点处理的结果，展示了通过马赛克效果实现的艺术增强。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - mask输出参数提供了一个二进制掩码，用于划分原始图像区域和马赛克扩展区域。在需要区分原始区域和扩展区域的应用中，它非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MosaicExpandImage:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE', {'default': None}), 'left': ('INT', {'default': 0, 'min': 0, 'max': 5}), 'top': ('INT', {'default': 0, 'min': 0, 'max': 5}), 'right': ('INT', {'default': 0, 'min': 0, 'max': 5}), 'bottom': ('INT', {'default': 0, 'min': 0, 'max': 5})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    RETURN_NAMES = ('result_img',)
    FUNCTION = 'mosaic_expand'
    CATEGORY = 'Mikey/Image'

    def mosaic_expand(self, image, left, top, right, bottom):
        img = tensor2pil(image)
        (width, height) = img.size
        (width_5th, height_5th) = (width // 5, height // 5)

        def create_mosaic(side_img, num_fifths, vertical=False):
            block_size = 50
            num_blocks_wide = side_img.width // block_size
            num_blocks_high = num_fifths * height_5th // block_size if vertical else side_img.height // block_size
            mosaic_width = block_size * num_blocks_wide
            mosaic_height = block_size * num_blocks_high
            mosaic_img = Image.new('RGB', (mosaic_width, mosaic_height))
            for i in range(num_blocks_wide):
                for j in range(num_blocks_high):
                    section = side_img.crop((i * block_size, j * block_size, (i + 1) * block_size, (j + 1) * block_size))
                    avg_color = np.array(section).mean(axis=(0, 1)).astype(np.uint8)
                    for x in range(block_size):
                        for y in range(block_size):
                            mosaic_x = i * block_size + x
                            mosaic_y = j * block_size + y
                            mosaic_img.putpixel((mosaic_x, mosaic_y), tuple(avg_color))
            return mosaic_img
        self.new_width = width + width_5th * (left + right)
        self.new_height = height + height_5th * (top + bottom)
        new_img = Image.new('RGB', (self.new_width, self.new_height))
        if right > 0:
            right_side = img.crop((width - width_5th * right, 0, width, height))
            right_mosaic = create_mosaic(right_side, right)
            right_mosaic = right_mosaic.transpose(Image.FLIP_LEFT_RIGHT)
            right_mosaic = right_mosaic.resize((width_5th * right + 8, self.new_height))
            new_img.paste(right_mosaic, (width + width_5th * left, 0))
        if left > 0:
            left_side = img.crop((0, 0, width_5th * left, height))
            left_mosaic = create_mosaic(left_side, left)
            left_mosaic = left_mosaic.transpose(Image.FLIP_LEFT_RIGHT)
            left_mosaic = left_mosaic.resize((width_5th * left + 8, self.new_height))
            new_img.paste(left_mosaic, (0, 0))
        if top > 0:
            top_side = img.crop((0, 0, width, height_5th * top))
            top_mosaic = create_mosaic(top_side, top, vertical=True)
            top_mosaic = top_mosaic.transpose(Image.FLIP_TOP_BOTTOM)
            top_mosaic = top_mosaic.resize((width + 32, height_5th * top + 8))
            new_img.paste(top_mosaic, (width_5th * left, 0))
        if bottom > 0:
            bottom_side = img.crop((0, height - height_5th * bottom, width, height))
            bottom_mosaic = create_mosaic(bottom_side, bottom, vertical=True)
            bottom_mosaic = bottom_mosaic.transpose(Image.FLIP_TOP_BOTTOM)
            bottom_mosaic = bottom_mosaic.resize((width + 32, height_5th * bottom + 8))
            new_img.paste(bottom_mosaic, (width_5th * left, height + height_5th * top))
        new_img.paste(img, (width_5th * left, height_5th * top))
        new_img = pil2tensor(new_img)
        mask = Image.new('RGB', (self.new_width, self.new_height), (0, 0, 0))
        white = Image.new('RGB', (width, height), (255, 255, 255))
        if right > 0:
            white = white.crop((0, 0, width - 64, height))
        if left > 0:
            white = white.crop((64, 0, width, height))
        if top > 0:
            white = white.crop((0, 64, width, height))
        if bottom > 0:
            white = white.crop((0, 0, width, height - 64))
        paste_x = width_5th * left + 64
        if left > 0:
            paste_x += 64
        paste_y = height_5th * top
        if top > 0:
            paste_y += 64
        mask.paste(white, (paste_x, paste_y))
        mask = np.array(mask.getchannel('R')).astype(np.float32) / 255.0
        mask = 1.0 - torch.from_numpy(mask)
        mask = mask.unsqueeze(0)
        return (new_img, mask)
```