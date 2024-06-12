---
tags:
- ImageNoise
- Noise
---

# ImageNoiseBytes
## Documentation
- Class name: `ImageNoiseBytes`
- Category: `image/noise`
- Output node: `False`

The ImageNoiseBytes node applies a specific type of noise transformation to images. It manipulates the pixel values across one or more channels based on the provided parameters, enhancing the images with a noise effect that can be adjusted for monochromatic or color variations and optionally inverted.
## Input types
### Required
- **`images`**
    - The input images to which the noise effect will be applied. This parameter is crucial for defining the base on which the noise transformation will be performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`monochromatic`**
    - Determines whether the noise effect should be applied in a monochromatic fashion across all channels or individually per channel, affecting the visual outcome of the noise effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`invert`**
    - Specifies if the noise effect should be inverted, altering the visual contrast of the noise effect in the images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`channels`**
    - Defines the specific channels of the images that the noise effect will be applied to, allowing for targeted noise application on selected color channels.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed images with the applied noise effect, showcasing the visual alteration resulting from the noise parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageNoiseBytes:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "monochromatic": (["false", "true"],),
                "invert": (["false", "true"],),
                "channels": (["rgb", "rgba", "rg", "rb", "ra", "gb", "ga", "ba", "r", "g", "b", "a"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/noise"

    def noise(self, images, monochromatic, invert):
        if monochromatic and images.shape[3] > 1:
            noise = np.random.bytes(np.prod(images.shape[:3]))
            noise = np.frombuffer(noise, np.uint8)
            noise = np.reshape(noise, images.shape[:3])
        else:
            noise = np.random.bytes(np.prod(images.shape))
            noise = np.frombuffer(noise, np.uint8)
            noise = np.reshape(noise, images.shape)

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

    def node(self, images, monochromatic, invert, channels):
        tensor = images.clone().detach()

        monochromatic = True if monochromatic == "true" else False
        invert = True if invert == "true" else False

        return (channels_layer(tensor, channels, lambda x: self.noise(
            x, monochromatic, invert
        )),)

```
