
# Documentation
- Class name: DilateErodeMask
- Category: mask/filters
- Output node: False

DilateErodeMask节点用于通过扩张或腐蚀来修改掩码图像，具体取决于指定的半径和形状。这个过程调整掩码中物体的边界，可以扩大或缩小它们以达到所需的形态学效果。

# Input types
## Required
- masks
    - 指定要处理的掩码图像。通过扩张或腐蚀对这些掩码的修改会根据操作参数改变它们所包含物体的边界。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- radius
    - 决定扩张或腐蚀效果的程度。正半径会扩张掩码，扩大物体边界，而负半径则会腐蚀掩码，缩小边界。
    - Comfy dtype: INT
    - Python dtype: int
- shape
    - 定义用于扩张或腐蚀过程的结构元素的形状。可以是"box"（方框）或"circle"（圆形），影响形态学变换的性质。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- mask
    - 应用扩张或腐蚀操作后的修改后掩码图像，反映了掩码中物体边界的调整结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DilateErodeMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "masks": ("MASK",),
                "radius": ("INT", {
                    "default": 0,
                    "min": -1023,
                    "max": 1023,
                    "step": 1
                }),
                "shape": (["box", "circle"],),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "dilate_mask"

    CATEGORY = "mask/filters"

    def dilate_mask(self, masks, radius, shape):
        
        if radius == 0:
            return (masks,)
        
        s = abs(radius)
        d = s * 2 + 1
        k = np.zeros((d, d), np.uint8)
        if shape == "circle":
            k = cv2.circle(k, (s,s), s, 1, -1)
        else:
            k += 1
        
        dup = copy.deepcopy(masks.cpu().numpy())
        
        for index, mask in enumerate(dup):
            if radius > 0:
                dup[index] = cv2.dilate(mask, k, iterations=1)
            else:
                dup[index] = cv2.erode(mask, k, iterations=1)
        
        return (torch.from_numpy(dup),)

```
