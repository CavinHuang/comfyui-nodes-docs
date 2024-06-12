---
tags:
- ImageEnhancement
- VisualEffects
---

# Image Lucy Sharpen
## Documentation
- Class name: `Image Lucy Sharpen`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

The node applies a Lucy-Richardson deconvolution algorithm to sharpen images. It iteratively enhances the contrast of edges by deblurring the image through a series of convolutions with a specified kernel, improving the visual clarity and detail of the image.
## Input types
### Required
- **`images`**
    - The input images to be sharpened. This parameter is crucial as it determines the base images that will undergo the sharpening process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[numpy.ndarray] or numpy.ndarray`
- **`iterations`**
    - Specifies the number of times the sharpening process is applied. Higher values result in a more pronounced sharpening effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`kernel_size`**
    - Determines the size of the convolution kernel used for sharpening. A larger kernel size can lead to a smoother sharpening effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output sharpened images, with enhanced edges and details.
    - Python dtype: `List[PIL.Image] or PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [TilePreprocessor](../../comfyui_controlnet_aux/Nodes/TilePreprocessor.md)



## Source code
```python
class WAS_Lucy_Sharpen:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "iterations": ("INT", {"default": 2, "min": 1, "max": 12, "step": 1}),
                "kernel_size": ("INT", {"default": 3, "min": 1, "max": 16, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "sharpen"

    CATEGORY = "WAS Suite/Image/Filter"

    def sharpen(self, images, iterations, kernel_size):

        tensors = []
        if len(images) > 1:
            for img in images:
                tensors.append(pil2tensor(self.lucy_sharpen(tensor2pil(img), iterations, kernel_size)))
            tensors = torch.cat(tensors, dim=0)
        else:
            return (pil2tensor(self.lucy_sharpen(tensor2pil(images), iterations, kernel_size)),)

        return (tensors,)


    def lucy_sharpen(self, image, iterations=10, kernel_size=3):

        from scipy.signal import convolve2d

        image_array = np.array(image, dtype=np.float32) / 255.0
        kernel = np.ones((kernel_size, kernel_size), dtype=np.float32) / (kernel_size ** 2)
        sharpened_channels = []

        padded_image_array = np.pad(image_array, ((kernel_size, kernel_size), (kernel_size, kernel_size), (0, 0)), mode='edge')

        for channel in range(3):
            channel_array = padded_image_array[:, :, channel]

            for _ in range(iterations):
                blurred_channel = convolve2d(channel_array, kernel, mode='same')
                ratio = channel_array / (blurred_channel + 1e-6)
                channel_array *= convolve2d(ratio, kernel, mode='same')

            sharpened_channels.append(channel_array)

        cropped_sharpened_image_array = np.stack(sharpened_channels, axis=-1)[kernel_size:-kernel_size, kernel_size:-kernel_size, :]
        sharpened_image_array = np.clip(cropped_sharpened_image_array * 255.0, 0, 255).astype(np.uint8)
        sharpened_image = Image.fromarray(sharpened_image_array)
        return sharpened_image

```
