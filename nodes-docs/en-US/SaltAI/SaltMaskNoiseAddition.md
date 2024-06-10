---
tags:
- Mask
- MaskRegion
---

# Add Noise to Mask Regions
## Documentation
- Class name: `SaltMaskNoiseAddition`
- Category: `SALT/Masking/Filter`
- Output node: `False`

The SaltMaskNoiseAddition node is designed to introduce noise into mask regions, simulating variations and imperfections that might occur in real-world scenarios. It allows for the customization of the noise characteristics through parameters such as mean and standard deviation, enabling a wide range of noise effects.
## Input types
### Required
- **`masks`**
    - The 'masks' input is a collection of mask regions to which noise will be added. This parameter is essential for defining the areas where the noise effect will be applied, impacting the node's execution and the visual outcome of the noise addition.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
### Optional
- **`mean`**
    - The 'mean' parameter specifies the average value of the noise distribution. Adjusting this value allows for controlling the overall brightness or darkness of the added noise, influencing the visual appearance of the masks.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`stddev`**
    - The 'stddev' parameter determines the standard deviation of the noise distribution. This affects the variability and intensity of the noise added to the masks, enabling fine-tuning of the noise effect to achieve desired outcomes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output 'MASKS' consists of the original mask regions with added noise, reflecting the specified mean and standard deviation parameters. This modified set of masks can be used for further processing or visualization.
    - Python dtype: `torch.Tensor`
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
