
# Documentation
- Class name: ImageNoiseBytes
- Category: image/noise
- Output node: False

ImageNoiseBytes节点向图像应用特定类型的噪声变换。它根据提供的参数在一个或多个通道上操作像素值，用可调整为单色或彩色变化并可选择性反转的噪声效果增强图像。

# Input types
## Required
- images
    - 将应用噪声效果的输入图像。此参数对于定义进行噪声变换的基础至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- monochromatic
    - 决定噪声效果是应该在所有通道上以单色方式应用，还是在每个通道上单独应用，从而影响噪声效果的视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- invert
    - 指定是否应反转噪声效果，改变图像中噪声效果的视觉对比度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- channels
    - 定义将应用噪声效果的图像的特定通道，允许在选定的颜色通道上进行有针对性的噪声应用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 应用了噪声效果的转换后的图像，展示了由噪声参数产生的视觉变化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
