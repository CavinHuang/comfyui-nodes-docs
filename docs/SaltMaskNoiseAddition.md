
# Documentation
- Class name: SaltMaskNoiseAddition
- Category: SALT/Masking/Filter
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltMaskNoiseAddition节点专门设计用于向蒙版区域引入噪声，模拟真实场景中可能出现的变化和不完美之处。它允许通过诸如均值和标准差等参数来自定义噪声特征，从而实现广泛的噪声效果。

# Input types
## Required
- masks
    - masks输入是一组将被添加噪声的蒙版区域。这个参数对于定义噪声效果将应用的区域至关重要，直接影响节点的执行和噪声添加的视觉效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- mean
    - mean参数指定了噪声分布的平均值。调整这个值可以控制所添加噪声的整体亮度或暗度，从而影响蒙版的视觉表现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- stddev
    - stddev参数决定了噪声分布的标准差。这影响了添加到蒙版中的噪声的变化程度和强度，使得可以微调噪声效果以达到预期的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MASKS
    - 输出的MASKS包含了添加了噪声的原始蒙版区域，反映了指定的均值和标准差参数。这组修改后的蒙版可用于进一步处理或可视化。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskNoiseAddition:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "mean": ("FLOAT", {"default": 0.0, "min": -255.0, "max": 255.0, "step": 0.1}),
                "stddev": ("FLOAT", {"default": 25.0, "min": 0.0, "max": 100.0, "step": 0.1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "noise_addition"

    def noise_addition(self, masks, mean=0.0, stddev=25.0):
        if not isinstance(mean, list):
            mean = [mean]
        if not isinstance(stddev, list):
            stddev = [stddev]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image)

            current_mean = mean[i if i < len(mean) else -1]
            current_stddev = stddev[i if i < len(stddev) else -1]

            noise = np.random.normal(current_mean, current_stddev, image_array.shape)
            noisy_image = image_array + noise
            noisy_image = np.clip(noisy_image, 0, 255).astype(np.uint8)

            noisy_pil = Image.fromarray(noisy_image)
            region_tensor = pil2mask(noisy_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
