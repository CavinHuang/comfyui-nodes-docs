
# Documentation
- Class name: SaltMaskGradientRegion
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/DimaChaichan/LAiChanRYFork

SaltMaskGradientRegion节点主要用于对掩码区域应用梯度滤波器，增强掩码内的边缘和过渡区域，从而突出变化的区域。该节点设计用于处理掩码输入，并应用形态学梯度操作，以强调掩码区域中的轮廓和过渡部分。

# Input types
## Required
- masks
    - masks输入代表将要应用梯度滤波器的掩码区域。这个输入对于定义需要进行边缘增强和过渡突出的感兴趣区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
## Optional
- kernel_size
    - kernel_size参数指定了在形态学梯度操作中使用的内核大小。它影响掩码区域中边缘增强和过渡突出的程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASKS
    - 输出的MASKS是将梯度滤波器应用于输入掩码区域后的结果，特点是边缘和过渡区域得到增强。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskGradientRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "kernel_size": ("INT", {"default": 3, "min": 1, "max": 31, "step": 2}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "gradient_region"

    def gradient_region(self, masks, kernel_size=3):
        if not isinstance(kernel_size, list):
            kernel_size = [kernel_size]
        regions = []
        for i, mask in enumerate(masks):
            pil_image = mask2pil(mask.unsqueeze(0))
            image_array = np.array(pil_image.convert('L'))

            current_kernel_size = kernel_size[i if i < len(kernel_size) else -1]
            kernel = np.ones((current_kernel_size, current_kernel_size), np.uint8)

            gradient = cv2.morphologyEx(image_array, cv2.MORPH_GRADIENT, kernel)
            gradient_pil = Image.fromarray(gradient)

            region_tensor = pil2mask(gradient_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
