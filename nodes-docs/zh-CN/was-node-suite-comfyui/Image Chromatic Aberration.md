# Documentation
- Class name: WAS_Image_Chromatic_Aberration
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Chromatic_Aberration节点旨在对输入图像应用色差效果，模拟由于镜头未能将所有颜色聚焦在同一点而导致图像边缘颜色模糊的光学现象。这种效果可以为图像添加独特的视觉风格，通常在摄影和电影中用于创造特定的美学效果。

# Input types
## Required
- image
    - 图像参数是节点的核心输入，代表将应用色差效果的图像。这张图像的质量和特性直接影响最终输出，决定了色差的范围和外观。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- red_offset
    - red_offset参数允许调整红色通道的偏移量，通过移动图像的红色分量来创建色差效果。它是实现所需视觉失真的重要部分。
    - Comfy dtype: INT
    - Python dtype: int
- green_offset
    - green_offset参数用于微调绿色通道对色差的贡献。通过调整此值，节点可以控制绿色在图像中的模糊方式。
    - Comfy dtype: INT
    - Python dtype: int
- blue_offset
    - blue_offset参数决定了蓝色通道在色差过程中的位移。这对于控制蓝色在失真图像中的扩散程度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- intensity
    - 强度参数控制色差效果的强度。较高的值将产生更明显的效应，而较低的值将产生更微妙的失真。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fade_radius
    - fade_radius参数定义了图像边缘的淡出效果半径。它有助于在色差和未失真的图像中心之间创建平滑的过渡。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出图像是将色差效果应用于输入图像后的结果。它反映了调整后的偏移量和强度，提供了原始图像的创造性失真版本。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Chromatic_Aberration:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'red_offset': ('INT', {'default': 2, 'min': -255, 'max': 255, 'step': 1}), 'green_offset': ('INT', {'default': -1, 'min': -255, 'max': 255, 'step': 1}), 'blue_offset': ('INT', {'default': 1, 'min': -255, 'max': 255, 'step': 1}), 'intensity': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'fade_radius': ('INT', {'default': 12, 'min': 0, 'max': 1024, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_chromatic_aberration'
    CATEGORY = 'WAS Suite/Image/Filter'

    def image_chromatic_aberration(self, image, red_offset=4, green_offset=2, blue_offset=0, intensity=1, fade_radius=12):
        return (pil2tensor(self.apply_chromatic_aberration(tensor2pil(image), red_offset, green_offset, blue_offset, intensity, fade_radius)),)

    def apply_chromatic_aberration(self, img, r_offset, g_offset, b_offset, intensity, fade_radius):

        def lingrad(size, direction, white_ratio):
            image = Image.new('RGB', size)
            draw = ImageDraw.Draw(image)
            if direction == 'vertical':
                black_end = size[1] - white_ratio
                range_start = 0
                range_end = size[1]
                range_step = 1
                for y in range(range_start, range_end, range_step):
                    color_ratio = y / size[1]
                    if y <= black_end:
                        color = (0, 0, 0)
                    else:
                        color_value = int((y - black_end) / (size[1] - black_end) * 255)
                        color = (color_value, color_value, color_value)
                    draw.line([(0, y), (size[0], y)], fill=color)
            elif direction == 'horizontal':
                black_end = size[0] - white_ratio
                range_start = 0
                range_end = size[0]
                range_step = 1
                for x in range(range_start, range_end, range_step):
                    color_ratio = x / size[0]
                    if x <= black_end:
                        color = (0, 0, 0)
                    else:
                        color_value = int((x - black_end) / (size[0] - black_end) * 255)
                        color = (color_value, color_value, color_value)
                    draw.line([(x, 0), (x, size[1])], fill=color)
            return image.convert('L')

        def create_fade_mask(size, fade_radius):
            mask = Image.new('L', size, 255)
            left = ImageOps.invert(lingrad(size, 'horizontal', int(fade_radius * 2)))
            right = left.copy().transpose(Image.FLIP_LEFT_RIGHT)
            top = ImageOps.invert(lingrad(size, 'vertical', int(fade_radius * 2)))
            bottom = top.copy().transpose(Image.FLIP_TOP_BOTTOM)
            mask = ImageChops.multiply(mask, left)
            mask = ImageChops.multiply(mask, right)
            mask = ImageChops.multiply(mask, top)
            mask = ImageChops.multiply(mask, bottom)
            mask = ImageChops.multiply(mask, mask)
            return mask
        (r, g, b) = img.split()
        r_offset_img = ImageChops.offset(r, r_offset, 0)
        g_offset_img = ImageChops.offset(g, 0, g_offset)
        b_offset_img = ImageChops.offset(b, 0, b_offset)
        merged = Image.merge('RGB', (r_offset_img, g_offset_img, b_offset_img))
        fade_mask = create_fade_mask(img.size, fade_radius)
        result = Image.composite(merged, img, fade_mask).convert('RGB')
        return result
```