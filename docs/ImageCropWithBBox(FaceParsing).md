# Documentation
- Class name: ImageCropWithBBox
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

ImageCropWithBBox 节点旨在根据边界框坐标处理图像，通过裁剪出感兴趣的区域。它在将计算资源集中在图像的特定区域，从而提高后续图像分析任务的效率方面发挥着关键作用。

# Input types
## Required
- bbox
    - ‘bbox’参数至关重要，因为它定义了图像中要被裁剪的区域。它通过指定裁剪过程的坐标，直接影响节点的操作。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor
- image
    - ‘image’参数是ImageCropWithBBox节点的基本输入，因为它代表了将要处理的原始图像数据。图像数据的质量和格式对于裁剪操作的准确性至关重要。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor

# Output types
- cropped_image
    - ‘cropped_image’输出包含裁剪操作的结果。它很重要，因为它呈现了由‘bbox’参数指定的原始图像的区域，可供进一步分析或处理。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageCropWithBBox:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'bbox': ('BBOX', {}), 'image': ('IMAGE', {})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, bbox: Tensor, image: Tensor):
        results = []
        image_permuted = image.permute(0, 3, 1, 2)
        for image_item in image_permuted:
            bbox_int = bbox.int()
            l = bbox_int[0]
            t = bbox_int[1]
            r = bbox_int[2]
            b = bbox_int[3]
            cropped_image = functional.crop(image_item, t, l, b - t, r - l)
            result = cropped_image.permute(1, 2, 0).unsqueeze(0)
            results.append(result)
        try:
            final = torch.cat(results, dim=0)
        except:
            final = results
        return (final,)
```