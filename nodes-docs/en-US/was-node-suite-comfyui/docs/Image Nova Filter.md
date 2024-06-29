---
tags:
- ImageFilter
- VisualEffects
---

# Image Nova Filter
## Documentation
- Class name: `Image Nova Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

The node applies a 'Nova' filter effect to images, enhancing them with a specific visual style that alters their appearance in a distinctive way. This process involves modifying various aspects of the image to achieve the desired aesthetic, contributing to a broad range of creative and artistic applications.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image(s) to which the Nova filter effect will be applied. It plays a crucial role in determining the final output, as the filter effect directly modifies the visual characteristics of these images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`amplitude`**
    - The 'amplitude' parameter adjusts the intensity of the Nova filter effect, influencing the degree of visual alteration applied to the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frequency`**
    - The 'frequency' parameter controls the frequency of the visual patterns introduced by the Nova filter effect, affecting the overall texture and appearance of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the transformed image(s) after the application of the Nova filter effect, showcasing the distinctive visual style imparted by the filter.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Nova_Filter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "amplitude": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.001}),
                "frequency": ("FLOAT", {"default": 3.14, "min": 0.0, "max": 100.0, "step": 0.001}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "nova_sine"

    CATEGORY = "WAS Suite/Image/Filter"

    def nova_sine(self, image, amplitude, frequency):

        # Convert image to numpy
        img = tensor2pil(image)

        # Convert the image to a numpy array
        img_array = np.array(img)

        # Define a sine wave function
        def sine(x, freq, amp):
            return amp * np.sin(2 * np.pi * freq * x)

        # Calculate the sampling frequency of the image
        resolution = img.info.get('dpi')  # PPI
        physical_size = img.size  # pixels

        if resolution is not None:
            # Convert PPI to pixels per millimeter (PPM)
            ppm = 25.4 / resolution
            physical_size = tuple(int(pix * ppm) for pix in physical_size)

        # Set the maximum frequency for the sine wave
        max_freq = img.width / 2

        # Ensure frequency isn't outside visual representable range
        if frequency > max_freq:
            frequency = max_freq

        # Apply levels to the image using the sine function
        for i in range(img_array.shape[0]):
            for j in range(img_array.shape[1]):
                for k in range(img_array.shape[2]):
                    img_array[i, j, k] = int(
                        sine(img_array[i, j, k]/255, frequency, amplitude) * 255)

        return (torch.from_numpy(img_array.astype(np.float32) / 255.0).unsqueeze(0), )

```
