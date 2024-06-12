---
tags:
- Image
- ImageThresholding
---

# AdaptiveThresholding
## Documentation
- Class name: `AdaptiveThresholding`
- Category: `Bmad/CV/Thresholding`
- Output node: `False`

The AdaptiveThresholding node applies adaptive thresholding techniques to images, converting them from grayscale to binary images based on local image characteristics. This process enhances the visibility of features in various lighting conditions, making it suitable for preprocessing images in computer vision tasks.
## Input types
### Required
- **`src`**
    - The source image to be thresholded. It is crucial for defining the input image on which adaptive thresholding will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`max_value`**
    - The maximum intensity value that a pixel can have after thresholding. It determines the brightness of the white regions in the output binary image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`adaptive_method`**
    - Specifies the method used for calculating the threshold for a pixel based on the pixel values in its neighborhood. It affects the adaptiveness of the thresholding process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`threshold_type`**
    - Determines whether the pixel value is set to the maximum value or zero, based on the comparison with the threshold. It influences the binary outcome of the thresholding.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`block_size`**
    - The size of the neighborhood area used to calculate the threshold for each pixel. It impacts the granularity of the thresholding.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`c`**
    - A constant subtracted from the mean or weighted mean calculated. It fine-tunes the thresholding by adjusting the threshold value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The binary image resulting from the adaptive thresholding process. It highlights the features of interest in the image by converting it into a binary format.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AdaptiveThresholding:
    adaptive_modes_map = {
        "ADAPTIVE_THRESH_MEAN_C": cv.ADAPTIVE_THRESH_MEAN_C,
        "ADAPTIVE_THRESH_GAUSSIAN_C": cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    }
    adaptive_modes = list(adaptive_modes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
                "max_value": ("INT", {"default": 255, "min": 0, "max": 255, "step": 1}),
                # maybe should just allow for 255? may just confuse some people that don't read documentation
                "adaptive_method": (s.adaptive_modes, {"default": s.adaptive_modes[1]}),
                "threshold_type": (thresh_types, {"default": thresh_types[0]}),
                "block_size": ("INT", {"default": 4, "min": 2, "step": 2}),
                "c": ("INT", {"default": 2, "min": -999, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "thresh"
    CATEGORY = "Bmad/CV/Thresholding"

    def thresh(self, src, max_value, adaptive_method, threshold_type, block_size, c):
        # maybe allow to use from a specific channel 1st? nah, just create a node to fetch the channel
        # might be useful for other nodes
        src = tensor2opencv(src, 1)
        src = cv.adaptiveThreshold(src, max_value, self.adaptive_modes_map[adaptive_method], \
                                   thresh_types_map[threshold_type], block_size + 1, c)
        src = cv.cvtColor(src, cv.COLOR_GRAY2RGB)
        src = opencv2tensor(src)
        return (src,)

```
