
# Documentation
- Class name: `ImageNoiseBeta`
- Category: `image/noise`
- Output node: `False`

ImageNoiseBeta节点用于向图像引入基于贝塔分布的噪声，可以模拟各种噪声效果。该节点能够调整噪声强度，并根据颜色通道选择性地应用噪声，支持单色和彩色噪声应用。

# Input types
## Required
- **`images`**
    - 需要应用贝塔噪声的输入图像。这个参数对于定义将要被修改的基础内容至关重要。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`a`**
    - 指定贝塔分布的alpha参数，影响噪声分布曲线的形状。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - 指定贝塔分布的beta参数，同样影响噪声分布曲线的形状。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`monochromatic`**
    - 决定噪声是应该以单色方式应用于所有通道，还是单独应用于每个通道。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`invert`**
    - 控制是否应该反转噪声效果，提供不同的视觉效果。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`channels`**
    - 指定应该应用噪声的颜色通道，允许选择性地应用噪声。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`

# Output types
- **`image`**
    - 应用了基于贝塔分布噪声的输出图像，反映了指定的强度和通道选择。
    - Comfy dtype: `IMAGE`
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
