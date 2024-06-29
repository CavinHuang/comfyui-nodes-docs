---
tags:
- ImageNoise
- Noise
---

# Image to Noise
## Documentation
- Class name: `Image to Noise`
- Category: `WAS Suite/Image/Generate/Noise`
- Output node: `False`

This node transforms an input image into a noise pattern, incorporating various adjustments to simulate different noise effects. It leverages parameters such as color quantization, brightness modification, and optional gaussian blurring to produce a customized noise visualization. The node facilitates the creation of noise-based visual effects or textures from images, offering a range of customization options to achieve the desired noise pattern.
## Input types
### Required
- **`images`**
    - Represents the collection of input images to be transformed into noise patterns, serving as the foundation for the noise effect application.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[PIL.Image]`
- **`num_colors`**
    - Specifies the number of colors to quantize the input image to, affecting the color depth of the noise pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`black_mix`**
    - Determines the intensity of black pixels mixed into the noise pattern, influencing the pattern's darkness.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`gaussian_mix`**
    - Controls the level of Gaussian blur applied to the noise pattern, affecting its softness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`brightness`**
    - Adjusts the brightness of the noise pattern, modifying its overall lightness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`output_mode`**
    - Specifies the format of the output, either as a batch of images or a list, affecting the structure of the returned noise patterns.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - Sets the seed for random number generation, ensuring reproducibility of the noise pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image transformed into a noise pattern, showcasing the applied noise effect.
    - Python dtype: `Union[List[PIL.Image], torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - Mute / Bypass Repeater (rgthree)



## Source code
```python
class WAS_Image_To_Noise:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "num_colors": ("INT", {"default": 16, "max": 256, "min": 2, "step": 2}),
                "black_mix": ("INT", {"default": 0, "max": 20, "min": 0, "step": 1}),
                "gaussian_mix": ("FLOAT", {"default": 0.0, "max": 1024, "min": 0, "step": 0.1}),
                "brightness": ("FLOAT", {"default": 1.0, "max": 2.0, "min": 0.0, "step": 0.01}),
                "output_mode": (["batch","list"],),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    OUTPUT_IS_LIST = (False,)
    FUNCTION = "image_to_noise"

    CATEGORY = "WAS Suite/Image/Generate/Noise"

    def image_to_noise(self, images, num_colors, black_mix, gaussian_mix, brightness, output_mode, seed):

        noise_images = []
        for image in images:
            noise_images.append(pil2tensor(self.image2noise(tensor2pil(image), num_colors, black_mix, brightness, gaussian_mix, seed)))
        if output_mode == "list":
            self.OUTPUT_IS_LIST = (True,)
        else:
            noise_images = torch.cat(noise_images, dim=0)
        return (noise_images, )

    def image2noise(self, image, num_colors=16, black_mix=0, brightness=1.0, gaussian_mix=0, seed=0):

        random.seed(int(seed))
        image = image.quantize(colors=num_colors)
        image = image.convert("RGBA")
        pixel_data = list(image.getdata())
        random.shuffle(pixel_data)
        randomized_image = Image.new("RGBA", image.size)
        randomized_image.putdata(pixel_data)

        width, height = image.size
        black_noise = Image.new("RGBA", (width, height), (0, 0, 0, 0))

        for _ in range(black_mix):
            for x in range(width):
                for y in range(height):
                    if random.randint(0,1) == 1:
                        black_noise.putpixel((x, y), (0, 0, 0, 255))

        randomized_image = Image.alpha_composite(randomized_image, black_noise)
        enhancer = ImageEnhance.Brightness(randomized_image)
        randomized_image = enhancer.enhance(brightness)

        if gaussian_mix > 0:
            original_noise = randomized_image.copy()
            randomized_gaussian = randomized_image.filter(ImageFilter.GaussianBlur(radius=gaussian_mix))
            randomized_image = Image.blend(randomized_image, randomized_gaussian, 0.65)
            randomized_image = Image.blend(randomized_image, original_noise, 0.25)

        return randomized_image

```
