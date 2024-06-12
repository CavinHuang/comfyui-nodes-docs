---
tags:
- VisualEffects
---

# Image Film Grain
## Documentation
- Class name: `Image Film Grain`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

The node applies a film grain effect to images, simulating the appearance of traditional film photography. It allows customization of the grain's density, intensity, and highlights, offering a way to add texture and a vintage feel to digital images.
## Input types
### Required
- **`image`**
    - The input image to which the film grain effect will be applied. This parameter is crucial as it determines the base image that will be transformed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image`
- **`density`**
    - Controls the density of the grain effect, affecting how many noise pixels are added to the image. Higher values result in a more pronounced grain effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`intensity`**
    - Adjusts the intensity of the grain effect, influencing the visibility and impact of the grain on the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`highlights`**
    - Modifies the brightness of the highlights in the image, allowing for finer control over the appearance of the grain in lighter areas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`supersample_factor`**
    - A factor for supersampling the image before applying the grain, which can enhance the quality of the effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with the film grain effect applied, including adjustments to density, intensity, and highlights.
    - Python dtype: `PIL.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Film_Grain:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "density": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 1.0, "step": 0.01}),
                "intensity": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 1.0, "step": 0.01}),
                "highlights": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 255.0, "step": 0.01}),
                "supersample_factor": ("INT", {"default": 4, "min": 1, "max": 8, "step": 1})
            }
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "film_grain"

    CATEGORY = "WAS Suite/Image/Filter"

    def film_grain(self, image, density, intensity, highlights, supersample_factor):
        return (pil2tensor(self.apply_film_grain(tensor2pil(image), density, intensity, highlights, supersample_factor)), )

    def apply_film_grain(self, img, density=0.1, intensity=1.0, highlights=1.0, supersample_factor=4):
        """
        Apply grayscale noise with specified density, intensity, and highlights to a PIL image.
        """
        img_gray = img.convert('L')
        original_size = img.size
        img_gray = img_gray.resize(
            ((img.size[0] * supersample_factor), (img.size[1] * supersample_factor)), Image.Resampling(2))
        num_pixels = int(density * img_gray.size[0] * img_gray.size[1])

        noise_pixels = []
        for i in range(num_pixels):
            x = random.randint(0, img_gray.size[0]-1)
            y = random.randint(0, img_gray.size[1]-1)
            noise_pixels.append((x, y))

        for x, y in noise_pixels:
            value = random.randint(0, 255)
            img_gray.putpixel((x, y), value)

        img_noise = img_gray.convert('RGB')
        img_noise = img_noise.filter(ImageFilter.GaussianBlur(radius=0.125))
        img_noise = img_noise.resize(original_size, Image.Resampling(1))
        img_noise = img_noise.filter(ImageFilter.EDGE_ENHANCE_MORE)
        img_final = Image.blend(img, img_noise, intensity)
        enhancer = ImageEnhance.Brightness(img_final)
        img_highlights = enhancer.enhance(highlights)

        # Return the final image
        return img_highlights

```
