---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Color Blend
## Documentation
- Class name: `ColorBlend`
- Category: `stability/image/postprocessing`
- Output node: `False`

The ColorBlend node is designed to blend two images, specifically a black and white layer with a color layer, to produce a single image that combines the luminosity of the black and white layer with the color information of the color layer. This blending process is achieved through a sophisticated manipulation of color spaces and image processing techniques.
## Input types
### Required
- **`bw_layer`**
    - The black and white layer image to be blended. It serves as the base for the luminosity channel in the blending process, influencing the final image's light and dark areas.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`color_layer`**
    - The color layer image to be blended. This layer provides the color information for the blending process, affecting the final image's coloration and vibrancy.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The result of blending the black and white layer with the color layer, producing an image that combines the luminosity of the former with the color information of the latter.
    - Python dtype: `numpy.ndarray`
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
