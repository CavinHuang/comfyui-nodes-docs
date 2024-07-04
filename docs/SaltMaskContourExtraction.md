
# Documentation
- Class name: SaltMaskContourExtraction
- Category: SALT/Masking/Filter
- Output node: False

该节点旨在使用多个阈值从掩码区域中提取轮廓。它应用一系列阈值来识别并绘制掩码中感兴趣区域的轮廓,有效地突出显示其边界。

# Input types
## Required
- masks
    - 需要提取轮廓的输入掩码。这些掩码作为应用轮廓提取过程的主要数据。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

## Optional
- thresholds
    - 用于识别掩码中轮廓的阈值列表。每个阈值定义了一个特定的强度级别,用于检测和绘制轮廓,从而实现对掩码区域的多方面分析。
    - Comfy dtype: INT
    - Python dtype: List[int]

# Output types
- MASKS
    - 输出由表示从输入掩码中提取的轮廓的张量组成。这些张量根据指定的阈值突出显示掩码中区域的边界。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskContourExtraction:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "thresholds": ("INT", {"default": 128, "min": 0, "max": 255, "step": 1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "contour_extraction"

    def contour_extraction(self, masks, thresholds=[50, 100, 150, 200]):
        regions = []

        if not isinstance(thresholds, list):
            thresholds = [thresholds]

        for mask in masks:
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('L'))

            combined_contours = np.zeros_like(image_array)

            for threshold in thresholds:
                _, thresh_image = cv2.threshold(image_array, threshold, 255, cv2.THRESH_BINARY)
                contours, _ = cv2.findContours(thresh_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                cv2.drawContours(combined_contours, contours, -1, (255, 255, 255), 1)

            contour_pil = Image.fromarray(combined_contours)
            region_tensor = pil2mask(contour_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
