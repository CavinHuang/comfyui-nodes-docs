---
tags:
- ImageNoise
- Noise
---

# ImageNoiseGaussian
## Documentation
- Class name: `ImageNoiseGaussian`
- Category: `image/noise`
- Output node: `False`

The ImageNoiseGaussian node applies Gaussian noise to images, allowing for the adjustment of noise strength and the option to apply the noise monochromatically or invert the noise effect. It operates on a per-channel basis, providing flexibility in how noise is applied across different image channels.
## Input types
### Required
- **`images`**
    - The input images to which Gaussian noise will be applied. This parameter is crucial for defining the base images that will undergo noise addition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`strength`**
    - Defines the strength of the Gaussian noise to be applied to the images. This parameter directly influences the intensity of the noise effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`monochromatic`**
    - Determines whether the noise should be applied monochromatically across all channels or individually per channel, affecting the visual outcome of the noise application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`invert`**
    - When set to true, inverts the noise effect, subtracting the noise from the images instead of adding it, which can lead to different visual effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`channels`**
    - Specifies the channels of the image to which the noise should be applied, allowing for targeted noise application on specific color channels.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output images with Gaussian noise applied, reflecting the specified strength, monochromatic setting, and inversion preference.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageNoiseGaussian:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "strength": ("FLOAT", {
                    "default": 0.5,
                    "step": 0.01
                }),
                "monochromatic": (["false", "true"],),
                "invert": (["false", "true"],),
                "channels": (["rgb", "rgba", "rg", "rb", "ra", "gb", "ga", "ba", "r", "g", "b", "a"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/noise"

    def noise(self, images, strength, monochromatic, invert):
        if monochromatic and images.shape[3] > 1:
            noise = np.random.normal(0, 1, images.shape[:3])
        else:
            noise = np.random.normal(0, 1, images.shape)

        noise = np.abs(noise)
        noise /= noise.max()

        if monochromatic and images.shape[3] > 1:
            noise = noise[..., np.newaxis].repeat(images.shape[3], -1)

        if invert:
            noise = images - noise * strength
        else:
            noise = images + noise * strength

        noise = np.clip(noise, 0.0, 1.0)
        noise = noise.astype(images.dtype)

        return noise

    def node(self, images, strength, monochromatic, invert, channels):
        tensor = images.clone().detach()

        monochromatic = True if monochromatic == "true" else False
        invert = True if invert == "true" else False

        return (channels_layer(tensor, channels, lambda x: self.noise(
            x, strength, monochromatic, invert
        )),)

```
