---
tags:
- ImageNoise
- Noise
---

# ImageNoiseBinomial
## Documentation
- Class name: `ImageNoiseBinomial`
- Category: `image/noise`
- Output node: `False`

The ImageNoiseBinomial node applies binomial noise to images, allowing for adjustments in monochromaticity, inversion, and channel specificity. It manipulates image data to introduce stochastic variations, simulating the effect of binomial distribution-based noise on the visual content.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the input images to which binomial noise will be applied. It is crucial for defining the base data that will undergo noise addition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`n`**
    - The 'n' parameter specifies the number of trials in the binomial noise generation process, influencing the intensity and distribution of noise across the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`p`**
    - The 'p' parameter defines the success probability in each trial of the binomial distribution, affecting the overall appearance of the noise in the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`monochromatic`**
    - The 'monochromatic' parameter determines whether the noise should be applied uniformly across all channels or vary per channel, impacting the noise's visual uniformity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`invert`**
    - The 'invert' parameter decides if the noise effect should be inverted, offering a way to subtract noise from the images instead of adding it, altering the visual outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`channels`**
    - The 'channels' parameter specifies which color channels of the image the noise should be applied to, allowing for targeted noise application and control over the visual effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image or a set of images with binomial noise applied, reflecting the specified parameters' effects on the original input.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageNoiseBinomial:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "n": ("INT", {
                    "default": 128,
                    "min": 1,
                    "max": 255,
                }),
                "p": ("FLOAT", {
                    "default": 0.5,
                    "max": 1.0,
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

    def noise(self, images, n, p, monochromatic, invert):
        if monochromatic and images.shape[3] > 1:
            noise = np.random.binomial(n, p, images.shape[:3])
        else:
            noise = np.random.binomial(n, p, images.shape)

        noise = noise.astype(images.dtype)
        noise /= 255

        if monochromatic and images.shape[3] > 1:
            noise = noise[..., np.newaxis].repeat(images.shape[3], -1)

        if invert:
            noise = images - noise
        else:
            noise = images + noise

        noise = np.clip(noise, 0.0, 1.0)

        return noise

    def node(self, images, n, p, monochromatic, invert, channels):
        tensor = images.clone().detach()

        monochromatic = True if monochromatic == "true" else False
        invert = True if invert == "true" else False

        return (channels_layer(tensor, channels, lambda x: self.noise(
            x, n, p, monochromatic, invert
        )),)

```
