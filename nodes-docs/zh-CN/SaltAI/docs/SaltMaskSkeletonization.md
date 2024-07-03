
# Documentation
- Class name: SaltMaskSkeletonization
- Category: SALT/Masking/Filter
- Output node: False

SaltMaskSkeletonization节点旨在将输入的掩码图像转换为其骨架化版本，有效地将掩码简化为最简单的形式，同时保留其整体几何结构。这个过程对于需要掩码中形状最小化表示的应用来说非常有用。

# Input types
## Required
- masks
    - 需要进行骨架化处理的输入掩码，每个掩码代表一个将被处理成骨架形式的不同区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

## Optional
- iterations
    - 指定每个掩码应用腐蚀操作的次数，影响最终骨架的细度。
    - Comfy dtype: INT
    - Python dtype: List[int]
- strength
    - 决定骨架化过程的强度，影响最终骨架结构的显著程度。
    - Comfy dtype: INT
    - Python dtype: List[int]

# Output types
- MASKS
    - 输出张量包含输入掩码的骨架化版本，每个骨架代表原始掩码的最小结构。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskSkeletonization:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "iterations": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
                "strength": ("INT", {"default": 1, "min": 1, "max": 12, "step": 1})
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "skeletonization"

    def skeletonization(self, masks, iterations=[1], strength=[1]):
        if not isinstance(iterations, list):
            iterations = [iterations]
        if not isinstance(strength, list):
            strength = [strength]

        iterations = [int(val) for val in iterations]
        strength = [int(val) for val in strength]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('L'))

            skeleton = np.zeros_like(image_array)
            element = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
            while True:
                eroded = image_array
                for _ in range(iterations[i if i < len(iterations) else -1]):
                    eroded = cv2.erode(eroded, element)

                temp = cv2.dilate(eroded, element)
                temp = cv2.subtract(image_array, temp)
                skeleton = cv2.bitwise_or(skeleton, temp)
                image_array = eroded.copy()

                if cv2.countNonZero(image_array) == 0:
                    break

                for _ in range(strength[i if i < len(strength) else -1]):
                    image_array = image_array + image_array

            skeleton_pil = Image.fromarray(skeleton)
            region_tensor = pil2mask(skeleton_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
