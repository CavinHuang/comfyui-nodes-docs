
# Documentation
- Class name: SaltMaskAdaptiveThresholdingRegion
- Category: SALT/Masking/Filter
- Output node: False

该节点对一组遮罩图像应用自适应阈值处理，根据局部像素值的变化将其转换为二值图像。它旨在通过动态调整整个图像的阈值，增强不同照明区域中特征的可见性。

# Input types
## Required
- masks
    - 需要进行自适应阈值处理的输入遮罩。这些遮罩将使用局部自适应阈值转换为二值图像。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
## Optional
- block_size
    - 用于计算每个像素阈值的局部区域大小。它决定了阈值处理过程对局部照明变化的适应性。
    - Comfy dtype: INT
    - Python dtype: List[int] or int
- constant
    - 从block_size计算的平均值或加权平均值中减去的常数。这用于微调阈值处理过程。
    - Comfy dtype: INT
    - Python dtype: List[int] or int

# Output types
- MASKS
    - 包含应用自适应阈值处理后的区域的输出张量，增强了遮罩中的局部特征。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskAdaptiveThresholdingRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "block_size": ("INT", {"default": 11, "min": 3, "max": 255, "step": 2}),
                "constant": ("INT", {"default": 2, "min": 0, "max": 10, "step": 1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "adaptive_thresholding"

    def adaptive_thresholding(self, masks, block_size=11, constant=2):
        if not isinstance(block_size, list):
            block_size = [block_size]
        if not isinstance(constant, list):
            constant = [constant]

        block_size = [closest_odd(val) for val in block_size]
        
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            image_array = np.array(pil_image.convert('L'))
            
            current_block_size = block_size[i if i < len(block_size) else -1]
            current_C = constant[i if i < len(constant) else -1]
            
            adaptive_thresh = cv2.adaptiveThreshold(image_array, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                                    cv2.THRESH_BINARY, current_block_size, current_C)

            adaptive_pil = ImageOps.invert(Image.fromarray(adaptive_thresh))
            region_tensor = pil2mask(adaptive_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
