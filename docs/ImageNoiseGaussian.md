
# Documentation
- Class name: ImageNoiseGaussian
- Category: image/noise
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageNoiseGaussian节点为图像添加高斯噪声。它允许调整噪声强度，并提供选项来单色应用噪声或反转噪声效果。该节点在每个通道的基础上操作，为如何在不同图像通道上应用噪声提供了灵活性。

# Input types
## Required
- images
    - 将要应用高斯噪声的输入图像。这个参数对于定义将要进行噪声添加的基础图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- strength
    - 定义要应用于图像的高斯噪声的强度。这个参数直接影响噪声效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- monochromatic
    - 决定噪声是否应该在所有通道上单色应用，或者在每个通道上单独应用，这会影响噪声应用的视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- invert
    - 当设置为true时，会反转噪声效果，从图像中减去噪声而不是添加噪声，这可能会导致不同的视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- channels
    - 指定应该应用噪声的图像通道，允许在特定颜色通道上进行有针对性的噪声应用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- image
    - 应用了高斯噪声的输出图像，反映了指定的强度、单色设置和反转偏好。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
