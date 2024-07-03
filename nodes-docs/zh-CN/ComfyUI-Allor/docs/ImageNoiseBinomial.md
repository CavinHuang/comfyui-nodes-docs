
# Documentation
- Class name: ImageNoiseBinomial
- Category: image/noise
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageNoiseBinomial节点对图像应用二项分布噪声，允许调整单色性、反转和特定通道。它操作图像数据以引入随机变化，模拟基于二项分布噪声对视觉内容的影响。这种方法可以用于创造各种视觉效果，从细微的纹理增强到更显著的图像扰动。

# Input types
## Required
- images
    - 'images'参数代表将要应用二项分布噪声的输入图像。它是定义将进行噪声添加的基础数据的关键。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- n
    - 'n'参数指定二项分布噪声生成过程中的试验次数，影响噪声在图像中的强度和分布。
    - Comfy dtype: INT
    - Python dtype: int
- p
    - 'p'参数定义二项分布中每次试验的成功概率，影响图像中噪声的整体外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- monochromatic
    - 'monochromatic'参数决定噪声是否应均匀地应用于所有通道或每个通道都有变化，影响噪声的视觉一致性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- invert
    - 'invert'参数决定是否应该反转噪声效果，提供了一种从图像中减去噪声而不是添加噪声的方法，改变视觉结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- channels
    - 'channels'参数指定应该将噪声应用于图像的哪些颜色通道，允许有针对性的噪声应用和对视觉效果的控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 输出是应用了二项分布噪声的图像或一组图像，反映了指定参数对原始输入的影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
