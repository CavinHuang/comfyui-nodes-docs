
# Documentation
- Class name: DistanceTransform
- Category: Bmad/CV/Thresholding
- Output node: False

DistanceTransform节点用于对二值图像应用距离变换。它将二值图像转换为灰度图像，其中每个像素的亮度与其到最近的二值前景像素的距离成比例。该节点支持不同的距离类型和掩码大小，以便根据需求定制变换效果。

# Input types
## Required
- binary_image
    - 需要进行距离变换的二值图像。它作为计算到最近前景像素距离的输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- distance_type
    - 指定要使用的距离计算类型，允许自定义距离变换效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- mask_size
    - 确定距离变换中使用的掩码大小，影响距离计算的精细程度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 距离变换后的结果图像。这是一个灰度图像，其中每个像素的亮度反映了它到最近前景像素的距离。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DistanceTransform:
    distance_types_map = {
        "DIST_L2": cv.DIST_L2,
        "DIST_L1": cv.DIST_L1,
        "DIST_C": cv.DIST_C,
    }
    distance_types = list(distance_types_map.keys())

    mask_sizes_map = {
        "DIST_MASK_3": cv.DIST_MASK_3,
        "DIST_MASK_5": cv.DIST_MASK_5,
        "DIST_MASK_PRECISE": cv.DIST_MASK_PRECISE
    }
    mask_sizes = list(mask_sizes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "binary_image": ("IMAGE",),
                "distance_type": (s.distance_types, {"default": s.distance_types[0]}),
                "mask_size": (s.mask_sizes, {"default": s.mask_sizes[0]}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/CV/Thresholding"

    def apply(self, binary_image, distance_type, mask_size):
        binary_image = tensor2opencv(binary_image, 1)
        distance_transform = cv.distanceTransform(
            binary_image,
            self.distance_types_map[distance_type],
            self.mask_sizes_map[mask_size])
        distance_transform = opencv2tensor(distance_transform)
        return (distance_transform,)

```
