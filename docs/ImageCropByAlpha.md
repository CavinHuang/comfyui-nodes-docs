# Documentation
- Class name: ImageCropByAlpha
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

ImageCropByAlpha 节点旨在基于图像的 alpha 通道智能裁剪图像，有效地隔离图像的不透明区域。它通过提供一种精确和自动化的内容提取方法，增强了图像处理工作流程，特别适用于涉及复杂图像组合或需要清晰分离图像元素的应用程序。

# Input types
## Required
- image
    - 'image' 参数是节点的主要输入，代表将要处理的原始图像。它的重要性在于它是根据 alpha 通道裁剪的来源。节点的执行和生成的图像严重依赖于这个输入图像的内容和质量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- RGBA
    - 'RGBA' 参数是一个必要的输入，它提供了裁剪过程中必需的 alpha 通道信息。这个参数直接影响节点如何识别和隔离图像的非透明区域，因此在确定最终裁剪图像中起着关键作用。
    - Comfy dtype: RGBA
    - Python dtype: torch.Tensor

# Output types
- IMAGE
    - 'IMAGE' 输出是裁剪操作的结果，为用户提供了基于 alpha 通道隔离的图像内容。它很重要，因为它代表了节点功能的主要内容，展示了图像处理任务的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK
    - 'MASK' 输出是对应于原始图像非透明区域的二进制掩码，作为裁剪操作的视觉指南。它对于需要精确空间信息的应用程序来说很重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- AREA_MASK
    - 'AREA_MASK' 输出是一个掩码，它描绘了被识别为非透明的图像区域。这对于可能需要了解图像内特定区域的进一步图像分析或处理步骤非常有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- x
    - 'x' 输出提供了裁剪区域左上角的 x 坐标，这对于理解裁剪内容在原始图像中的空间位置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - 'y' 输出提供了裁剪区域左上角的 y 坐标，进一步定义了裁剪内容的空间位置。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 'width' 输出表示裁剪区域的宽度，这是了解隔离图像内容尺寸的关键测量。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height' 输出表示裁剪区域的高度，与宽度相辅相成，完整描述了提取的图像段的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ImageCropByAlpha:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'RGBA': ('RGBA',)}}
    RETURN_TYPES = ('IMAGE', 'MASK', 'MASK', 'INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('IMAGE', 'MASK', 'AREA_MASK', 'x', 'y', 'width', 'height')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True, True, True, True, True, True)

    def run(self, image, RGBA):
        image = image[0]
        RGBA = RGBA[0]
        bf_im = tensor2pil(image)
        im = tensor2pil(RGBA)
        im = im.convert('RGBA')
        (red, green, blue, alpha) = im.split()
        im = naive_cutout(bf_im, alpha)
        (x, y, w, h) = get_not_transparent_area(im)
        x = min(x, image.shape[2] - 1)
        y = min(y, image.shape[1] - 1)
        to_x = w + x
        to_y = h + y
        x_1 = x
        y_1 = y
        width_1 = w
        height_1 = h
        img = image[:, y:to_y, x:to_x, :]
        ori = RGBA[:, y:to_y, x:to_x, :]
        ori = tensor2pil(ori)
        new_image = Image.new('RGBA', ori.size)
        pixel_data = ori.load()
        new_pixel_data = new_image.load()
        for y in range(ori.size[1]):
            for x in range(ori.size[0]):
                (r, g, b, a) = pixel_data[x, y]
                if a != 0:
                    new_pixel_data[x, y] = (255, 255, 255, 255)
                else:
                    new_pixel_data[x, y] = (0, 0, 0, 0)
        ori = new_image.convert('L')
        ori = pil2tensor(ori)
        b_image = AreaToMask_run(RGBA)
        return ([img], [ori], [b_image], [x_1], [y_1], [width_1], [height_1])
```