
# Documentation
- Class name: SaltMaskHistogramEqualizationRegion
- Category: SALT/Masking/Filter
- Output node: False

该节点对一组遮罩集合中的每个遮罩应用直方图均衡化，以增强遮罩内区域的对比度。它旨在通过调整强度分布来改善每个遮罩内特征的可见度和区分度。

# Input types
## Required
- masks
    - 需要处理的遮罩集合。每个遮罩都会单独进行增强，通过直方图均衡化来改善其对比度。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 经过对比度增强的遮罩，这是对每个原始遮罩应用直方图均衡化后的结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskHistogramEqualizationRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "histogram_equalization"

    def histogram_equalization(self, masks):
        regions = []
        for mask in masks:
            pil_image = mask2pil(mask.unsqueeze(0))
            image_array = np.array(pil_image.convert('L'))            
            equalized = cv2.equalizeHist(image_array)
            equalized_pil = ImageOps.invert(Image.fromarray(equalized))
            region_tensor = pil2mask(equalized_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
