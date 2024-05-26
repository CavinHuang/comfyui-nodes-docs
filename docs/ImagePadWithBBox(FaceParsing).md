# Documentation
- Class name: ImagePadWithBBox
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

该节点便于对带有边界框的图像进行精确填充，确保图像适当地被框架化并为进一步分析或处理做好准备。

# Input types
## Required
- bbox
    - 边界框参数对于确定图像中的兴趣区域至关重要。它决定了图像将从哪些坐标处被裁剪并相应地进行填充。
    - Comfy dtype: BBOX
    - Python dtype: torch.Tensor
- width
    - 宽度参数指定了填充后输出图像的期望宽度，影响最终产品的总体尺寸和长宽比。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数定义了填充后输出图像的期望高度，这直接影响图像的最终展示和布局。
    - Comfy dtype: INT
    - Python dtype: int
- image
    - 图像参数是主要的输入，节点基于提供的边界框和尺寸对这一输入进行操作，执行填充。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- output_image
    - 输出图像是填充过程的结果，展示了一个适当框架和尺寸的图像，准备好进行后续的处理阶段。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImagePadWithBBox:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'bbox': ('BBOX', {}), 'width': ('INT', {}), 'height': ('INT', {}), 'image': ('IMAGE', {})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, bbox: Tensor, width: int, height: int, image: Tensor):
        image_permuted = image.permute(0, 3, 1, 2)
        bbox_int = bbox.int()
        l = bbox_int[0]
        t = bbox_int[1]
        r = bbox_int[2]
        b = bbox_int[3]
        cropped_image = functional.pad(image_permuted, [l, t, width - r, height - b])
        final = cropped_image.permute(0, 2, 3, 1)
        return (final,)
```