---
tags:
- Color
- HSVColorSpace
---

# SampleColorHSV
## Documentation
- Class name: `SampleColorHSV`
- Category: `Bmad/CV/Color A.`
- Output node: `False`

This node is designed to sample pixels from an RGB image and convert these samples into the HSV color space. It aims to facilitate the analysis and manipulation of color information within images by providing a representative subset of the image's color distribution in HSV format.
## Input types
### Required
- **`rgb_image`**
    - The RGB image from which pixels will be sampled. This image is the primary input for generating a subset of color information in HSV format.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`sample_size`**
    - Determines the number of pixels to sample from the RGB image. A larger sample size provides a more representative subset of the image's color distribution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sampling_seed`**
    - A seed value for the random number generator used in sampling pixels. This ensures reproducibility of the sampled subset across different runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`hsv_samples`**
    - Comfy dtype: `HSV_SAMPLES`
    - The output is a collection of sampled pixels converted from RGB to HSV color space, providing a basis for further color analysis or manipulation.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SampleColorHSV:
    @classmethod
    def INPUT_TYPES(s):
        import sys
        return {"required": {
            "rgb_image": ("IMAGE",),
            "sample_size": ("INT", {"default": 1000, "min": 1, "max": 256 * 256, }),
            "sampling_seed": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1})
        }}

    RETURN_TYPES = ("HSV_SAMPLES",)
    FUNCTION = "sample"
    CATEGORY = "Bmad/CV/Color A."

    def sample(self, rgb_image, sample_size, sampling_seed):
        image = tensor2opencv(rgb_image, 3)
        image_width = image.shape[1]

        # sample pixels
        np.random.seed(sampling_seed)
        random_indices = np.random.choice(image.shape[0] * image_width, sample_size, replace=False)
        sample_pixels = np.array([image[i // image_width, i % image_width] for i in random_indices])
        sample_pixels = sample_pixels.reshape((1, -1, 3))

        # only convert samples to HSV
        sample_pixels_hsv = cv.cvtColor(sample_pixels, cv.COLOR_RGB2HSV)
        samples_object = HSV_Samples(sample_pixels_hsv[0, :, :])
        return (samples_object,)

```
