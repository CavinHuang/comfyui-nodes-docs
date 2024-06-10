---
tags:
- ImageNoise
- Noise
---

# ImageNoiseBeta
## Documentation
- Class name: `ImageNoiseBeta`
- Category: `image/noise`
- Output node: `False`

The ImageNoiseBeta node introduces beta distribution-based noise to images, allowing for the simulation of various noise effects. This node can adjust the noise intensity and apply it selectively based on color channels, supporting both monochromatic and colored noise applications.
## Input types
### Required
- **`images`**
    - The input images to which the beta noise will be applied. This parameter is crucial for defining the base content that will be modified.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`a`**
    - Specifies the alpha parameter of the beta distribution, influencing the shape of the noise distribution curve.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - Specifies the beta parameter of the beta distribution, also influencing the shape of the noise distribution curve.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`monochromatic`**
    - Determines whether the noise should be applied in a monochromatic fashion across all channels or individually per channel.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`invert`**
    - Controls whether the noise effect should be inverted, offering a different visual effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`channels`**
    - Specifies the color channels to which the noise should be applied, allowing for selective noise application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with beta distribution-based noise applied, reflecting the specified intensity and channel selections.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageNoiseBeta:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "a": ("INT", {
                    "default": 1,
                    "min": 1,
                }),
                "b": ("INT", {
                    "default": 1,
                    "min": 1,
                }),
                "monochromatic": (["false", "true"],),
                "invert": (["false", "true"],),
                "channels": (["rgb", "rgba", "rg", "rb", "ra", "gb", "ga", "ba", "r", "g", "b", "a"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/noise"

    def noise(self, images, a, b, monochromatic, invert):
        if monochromatic and images.shape[3] > 1:
            noise = np.random.beta(a, b, images.shape[:3])
        else:
            noise = np.random.beta(a, b, images.shape)

        if monochromatic and images.shape[3] > 1:
            noise = noise[..., np.newaxis].repeat(images.shape[3], -1)

        if invert:
            noise = images - noise
        else:
            noise = images + noise

        noise = noise.astype(images.dtype)

        return noise

    def node(self, images, a, b, monochromatic, invert, channels):
        tensor = images.clone().detach()

        monochromatic = True if monochromatic == "true" else False
        invert = True if invert == "true" else False

        return (channels_layer(tensor, channels, lambda x: self.noise(
            x, a, b, monochromatic, invert
        )),)

```
