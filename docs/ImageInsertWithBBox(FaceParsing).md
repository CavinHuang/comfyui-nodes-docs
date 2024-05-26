# Documentation
- Class name: ImageInsertWithBBox
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

该节点旨在将一张图片插入到另一张图片的指定边界框位置，这对于人脸解析和对象跟踪等应用至关重要。它处理了调整大小、填充和掩蔽的过程，以确保源图像无缝插入目标图像，有助于对视觉内容的整体理解和分析。

# Input types
## Required
- bbox
    - 边界框参数对于定义图像插入的区域至关重要。它直接影响图像在目标中的裁剪和放置，确保精确的定位和集成。
    - Comfy dtype: BBOX
    - Python dtype: torch.Tensor
- image_src
    - 源图像是将插入目标图像的主要视觉内容。其质量和尺寸对最终输出至关重要，因为它决定了插入图像如何与背景融合。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image
    - 图像参数代表源图像将被插入的目标图像。该图像的特性，如分辨率和色彩空间，对整体处理和最终结果很重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- result
    - 输出是源图像插入指定边界框后的最终图像。它代表了两个视觉元素的成功集成，这对于进一步的分析和可视化任务至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ImageInsertWithBBox:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'bbox': ('BBOX', {}), 'image_src': ('IMAGE', {}), 'image': ('IMAGE', {})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, bbox: Tensor, image_src: Tensor, image: Tensor):
        bbox_int = bbox.int()
        l = bbox_int[0]
        t = bbox_int[1]
        r = bbox_int[2]
        b = bbox_int[3]
        image_permuted = image.permute(0, 3, 1, 2)
        resized = functional.resize(image_permuted, [b - t, r - l])
        (_, h, w, c) = image_src.shape
        padded = functional.pad(resized, [l, t, w - r, h - b])
        src_permuted = image_src.permute(0, 3, 1, 2)
        mask = torch.zeros(src_permuted.shape)
        mask[:, :, t:b, l:r] = 1
        result = torch.where(mask == 0, src_permuted, padded)
        final = result.permute(0, 2, 3, 1)
        return (final,)
```