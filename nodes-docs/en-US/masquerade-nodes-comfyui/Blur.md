---
tags:
- Blur
- VisualEffects
---

# Blur
## Documentation
- Class name: `Blur`
- Category: `Masquerade Nodes`
- Output node: `False`

The Blur node applies a Gaussian blur to an image, allowing for the adjustment of the blur's intensity and spread through parameters. This process can soften the image or reduce noise and detail, making it useful for post-processing effects or preparing images for further processing steps.
## Input types
### Required
- **`image`**
    - The input image to be blurred. This is the primary data upon which the blur effect is applied, affecting the visual clarity and detail of the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`radius`**
    - Determines the radius of the blur effect. A larger radius results in a more pronounced blur, affecting the overall softness of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma_factor`**
    - Controls the spread of the blur effect. A higher sigma value increases the spread of the blur, contributing to the intensity and softness of the effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The blurred image, which has undergone a Gaussian blur transformation to reduce detail and soften the image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [Mix Images By Mask](../../masquerade-nodes-comfyui/Nodes/Mix Images By Mask.md)



## Source code
```python
class BlurNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "radius": ("INT", {"default": 10, "min": 0, "max": 48, "step": 1}),
                "sigma_factor": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 3., "step": 0.01}),
            },
        }

    def gaussian_blur(self, image, kernel_size, sigma):
        # I'll be honest, I'm not sure this calculation is actually correct for a Gaussian blur, but it looks close enough
        kernel = torch.Tensor(kernel_size, kernel_size).to(device=image.device)
        center = kernel_size // 2
        variance = sigma**2
        for i in range(kernel_size):
            for j in range(kernel_size):
                x = i - center
                y = j - center
                kernel[i, j] = math.exp(-(x**2 + y**2)/(2*variance))
        kernel /= kernel.sum()

        # Pad the input tensor
        padding = (kernel_size - 1) // 2
        input_pad = torch.nn.functional.pad(image, (padding, padding, padding, padding), mode='reflect')

        # Reshape the padded input tensor for batched convolution
        batch_size, num_channels, height, width = image.shape
        input_reshaped = input_pad.reshape(batch_size*num_channels, 1, height+padding*2, width+padding*2)

        # Perform batched convolution with the Gaussian kernel
        output_reshaped = torch.nn.functional.conv2d(input_reshaped, kernel.unsqueeze(0).unsqueeze(0))

        # Reshape the output tensor to its original shape
        output_tensor = output_reshaped.reshape(batch_size, num_channels, height, width)

        return output_tensor

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "blur"

    CATEGORY = "Masquerade Nodes"

    def blur(self, image, radius, sigma_factor):
        if len(image.size()) == 3:
            image = image.unsqueeze(3)
        image = image.permute(0, 3, 1, 2)
        kernel_size = radius * 2 + 1
        sigma = sigma_factor * (0.6 * radius - 0.3)
        result = self.gaussian_blur(image, kernel_size, sigma).permute(0, 2, 3, 1)
        if result.size()[3] == 1:
            result = result[:, :, :, 0]
        return (result,)

```
