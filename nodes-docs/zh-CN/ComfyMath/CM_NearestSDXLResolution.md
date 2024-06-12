# Documentation
- Class name: NearestSDXLResolution
- Category: math/graphics
- Output node: False
- Repo Ref: https://github.com/evanspearman/ComfyMath

NearestSDXLResolution节点旨在选择与输入图像分辨率最接近的受支持分辨率。它通过计算输入图像的宽高比并将其与支持的分辨率列表进行比较，然后选择差异最小的分辨率来实现这一点。该节点的功能对于确保图形处理应用中的兼容性和最佳显示质量至关重要。

# Input types
## Required
- image
    - 'image'参数至关重要，因为它作为节点的输入。这是其分辨率要与支持的分辨率匹配的图像。节点的操作完全依赖于这个输入，因为它决定了最近支持分辨率的选择。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- width
    - 'width'参数表示所选分辨率的宽度。它是一个关键的输出，因为它定义了分辨率匹配过程后图像的水平维度。对于依赖图像尺寸的任何后续图形操作来说，这个输出非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height'参数表示所选分辨率的高度。与'width'参数类似，它是一个重要的输出，它为进一步处理确定了图像的垂直维度。它确保了分辨率选择后图像的宽高比得以保持。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class NearestSDXLResolution:

    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('width', 'height')
    FUNCTION = 'op'
    CATEGORY = 'math/graphics'

    def op(self, image) -> tuple[int, int]:
        image_width = image.size()[2]
        image_height = image.size()[1]
        print(f'Input image resolution: {image_width}x{image_height}')
        image_ratio = image_width / image_height
        differences = [(abs(image_ratio - resolution[2]), resolution) for resolution in SDXL_SUPPORTED_RESOLUTIONS]
        smallest = None
        for difference in differences:
            if smallest is None:
                smallest = difference
            elif difference[0] < smallest[0]:
                smallest = difference
        if smallest is not None:
            width = smallest[1][0]
            height = smallest[1][1]
        else:
            width = 1024
            height = 1024
        print(f'Selected SDXL resolution: {width}x{height}')
        return (width, height)
```