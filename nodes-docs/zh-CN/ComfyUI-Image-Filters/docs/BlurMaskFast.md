
# Documentation
- Class name: BlurMaskFast
- Category: mask/filters
- Output node: False

BlurMaskFast节点用于对遮罩应用高斯模糊，可以软化边缘并创建更平滑的遮罩外观。这种操作在需要减少遮罩边界锐利度的图像处理任务中特别有用。

# Input types
## Required
- masks
    - 指定要进行模糊处理的遮罩。这个输入对于定义图像中将应用模糊效果的区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- radius_x
    - 确定高斯模糊的水平半径。较大的半径会在水平方向产生更明显的模糊效果。
    - Comfy dtype: INT
    - Python dtype: int
- radius_y
    - 确定高斯模糊的垂直半径。较大的半径会在垂直方向产生更明显的模糊效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 输出是经过高斯模糊处理的遮罩，与原始遮罩相比，边缘更加柔和。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BlurMaskFast:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "masks": ("MASK",),
                "radius_x": ("INT", {
                    "default": 1,
                    "min": 0,
                    "max": 1023,
                    "step": 1
                }),
                "radius_y": ("INT", {
                    "default": 1,
                    "min": 0,
                    "max": 1023,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "blur_mask"

    CATEGORY = "mask/filters"

    def blur_mask(self, masks, radius_x, radius_y):
        
        if radius_x + radius_y == 0:
            return (masks,)
        
        dx = radius_x * 2 + 1
        dy = radius_y * 2 + 1
        
        dup = copy.deepcopy(masks.cpu().numpy())
        
        for index, mask in enumerate(dup):
            dup[index] = cv2.GaussianBlur(mask, (dx, dy), 0)
        
        return (torch.from_numpy(dup),)

```
