
# Documentation
- Class name: SaltMaskClipHardeningFilter
- Category: SALT/Masking/Filter
- Output node: False

该节点对遮罩区域应用剪裁硬化滤镜，通过锐化处理增强其边缘和细节。它允许调整强度以控制效果的强弱。

# Input types
## Required
- masks
    - 要处理的遮罩,用于增强其清晰度和定义。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
## Optional
- strength
    - 控制应用于遮罩的锐化效果强度。值越高,效果越明显。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MASKS
    - 经过剪裁硬化滤镜处理后的遮罩,边缘和细节得到增强。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskClipHardeningFilter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "strength": ("FLOAT", {"default": 1.5, "min": 0.1, "max": 6.0, "step": 0.01}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "sharpening_filter"

    def sharpening_filter(self, masks, strength=1.5):
        if not isinstance(strength, list):
            strength = [strength]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('RGB'))

            current_strength = strength[i if i < len(strength) else -1]

            kernel = np.array([[-1, -1, -1],
                               [-1, 8 * current_strength, -1],
                               [-1, -1, -1]])

            sharpened = cv2.filter2D(image_array, -1, kernel)
            sharpened = np.clip(sharpened, 0, 255).astype(np.uint8)

            sharpened_pil = Image.fromarray(sharpened)
            region_tensor = pil2mask(sharpened_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
