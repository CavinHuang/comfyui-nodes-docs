---
tags:
- ImageEnhancement
---

# UnTonemap
## Documentation
- Class name: `UnTonemap`
- Category: `image/filters`
- Output node: `False`

The UnTonemap node is designed to reverse the effects of tonemapping on images, converting them back from a tonemapped representation to their original linear or sRGB color space. This process is essential for restoring the original dynamic range and color fidelity of images that have undergone tonemapping.
## Input types
### Required
- **`images`**
    - The images to be untonemapped. This input is crucial for defining the set of images that will undergo the reverse tonemapping process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`input_mode`**
    - Specifies the color space of the input images, either 'sRGB' or 'linear', which determines the initial conversion step before untonemapping.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_mode`**
    - Defines the desired color space of the output images, either 'linear' or 'sRGB', affecting the final conversion step after untonemapping.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tonemap_scale`**
    - A scaling factor applied during the untonemapping process to adjust the intensity of the effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The untonemapped images, returned in the specified output color space, either 'linear' or 'sRGB'.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UnTonemap:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "input_mode": (["sRGB", "linear"],),
                "output_mode": (["linear", "sRGB"],),
                "tonemap_scale": ("FLOAT", {"default": 1, "min": 0.1, "max": 10, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"

    CATEGORY = "image/filters"

    def apply(self, images, input_mode, output_mode, tonemap_scale):
        t = images.detach().clone().cpu().numpy().astype(np.float32)
        
        if input_mode == "sRGB":
            sRGBtoLinear(t[:,:,:,:3])
        
        tonemapToLinear(t[:,:,:,:3], tonemap_scale)
        
        if output_mode == "sRGB":
            linearToSRGB(t[:,:,:,:3])
            t = np.clip(t, 0, 1)
        
        t = torch.from_numpy(t)
        return (t,)

```
