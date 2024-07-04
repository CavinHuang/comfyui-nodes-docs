
# Documentation
- Class name: ColorBlend
- Category: stability/image/postprocessing
- Output node: False

ColorBlend节点用于将两个图像进行混合，具体是将黑白图层与彩色图层结合，生成一张融合了黑白图层亮度和彩色图层色彩信息的单一图像。这一混合过程是通过复杂的色彩空间操作和图像处理技术来实现的。

# Input types
## Required
- bw_layer
    - 需要混合的黑白图层图像。它作为混合过程中亮度通道的基础，影响最终图像的明暗区域。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- color_layer
    - 需要混合的彩色图层图像。该图层为混合过程提供色彩信息，影响最终图像的色彩和鲜艳度。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray

# Output types
- image
    - 黑白图层与彩色图层混合的结果，生成的图像结合了前者的亮度和后者的色彩信息。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class ColorBlend:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "bw_layer": ("IMAGE",),
                "color_layer": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "color_blending_mode"

    CATEGORY = "stability/image/postprocessing"

    def color_blending_mode(self, bw_layer, color_layer):
        if bw_layer.shape[0] < color_layer.shape[0]:
            bw_layer = bw_layer.repeat(color_layer.shape[0], 1, 1, 1)[:color_layer.shape[0]]
        if bw_layer.shape[0] > color_layer.shape[0]:
            color_layer = color_layer.repeat(bw_layer.shape[0], 1, 1, 1)[:bw_layer.shape[0]]

        batch_size, height, width, _ = bw_layer.shape
        tensor_output = torch.empty_like(bw_layer)

        image1 = bw_layer.cpu()
        image2 = color_layer.cpu()
        if image1.shape != image2.shape:
            #print(image1.shape)
            #print(image2.shape)
            image2 = image2.permute(0, 3, 1, 2)
            image2 = comfy.utils.common_upscale(image2, image1.shape[2], image1.shape[1], upscale_method='bicubic', crop='center')
            image2 = image2.permute(0, 2, 3, 1)
        image1  = (image1 * 255).to(torch.uint8).numpy()
        image2 = (image2 * 255).to(torch.uint8).numpy()

        for i in range(batch_size):
            blend = color_blend(image1[i],image2[i])
            blend = np.stack([blend])
            tensor_output[i:i+1] = (torch.from_numpy(blend.transpose(0, 3, 1, 2))/255.0).permute(0, 2, 3, 1)

        return (tensor_output,)

```
