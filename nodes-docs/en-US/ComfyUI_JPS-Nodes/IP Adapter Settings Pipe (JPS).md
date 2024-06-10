---
tags:
- Image
- ImagePreprocessing
---

# IP Adapter Settings Pipe (JPS)
## Documentation
- Class name: `IP Adapter Settings Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The IP Adapter Settings Pipe node is designed to process and adapt image processing settings, facilitating the customization and application of various image processing techniques based on the provided settings. It abstracts the complexity of configuring and applying these settings, making it easier to achieve desired image manipulation effects.
## Input types
### Required
- **`ip_adapter_settings`**
    - Specifies the settings for image processing adaptation, including weights, types, noise levels, start and stop points, cropping preferences, zoom levels, offsets, mask types, interpolation methods, sharpening levels, and model types. This comprehensive set of parameters allows for detailed customization of the image processing pipeline.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[float, str, float, float, float, str, float, int, int, int, str, float, int]`
## Output types
- **`ipa_weight`**
    - Comfy dtype: `FLOAT`
    - The weight factor applied to the image processing settings, influencing the intensity of the applied effects.
    - Python dtype: `float`
- **`ipa_wtype`**
    - Comfy dtype: `COMBO[STRING]`
    - The type of weight application method used in the image processing settings, such as linear or ease in-out.
    - Python dtype: `str`
- **`ipa_noise`**
    - Comfy dtype: `FLOAT`
    - The level of noise to be applied to the image as part of the processing settings.
    - Python dtype: `float`
- **`ipa_start`**
    - Comfy dtype: `FLOAT`
    - The starting point for applying the image processing effects, typically related to the intensity or duration of the effect.
    - Python dtype: `float`
- **`ipa_stop`**
    - Comfy dtype: `FLOAT`
    - The stopping point for the image processing effects, marking the end of the effect application.
    - Python dtype: `float`
- **`ipa_crop`**
    - Comfy dtype: `COMBO[STRING]`
    - The cropping method applied to the image, which can be directional (e.g., center, top, bottom) or based on specific dimensions.
    - Python dtype: `str`
- **`ipa_zoom`**
    - Comfy dtype: `FLOAT`
    - The zoom level applied to the image, affecting the focus and scale of the processed image.
    - Python dtype: `float`
- **`ipa_offset_x`**
    - Comfy dtype: `INT`
    - The horizontal offset applied to the image, adjusting its position along the x-axis.
    - Python dtype: `int`
- **`ipa_offset_y`**
    - Comfy dtype: `INT`
    - The vertical offset applied to the image, adjusting its position along the y-axis.
    - Python dtype: `int`
- **`ipa_mask`**
    - Comfy dtype: `INT`
    - The type of mask applied to the image, which can influence the areas of the image that are affected by the processing settings.
    - Python dtype: `int`
- **`crop_intpol`**
    - Comfy dtype: `COMBO[STRING]`
    - The interpolation method used for cropping the image, affecting the smoothness and quality of the cropped areas.
    - Python dtype: `str`
- **`sharpening`**
    - Comfy dtype: `FLOAT`
    - The level of sharpening applied to the image, enhancing its clarity and detail.
    - Python dtype: `float`
- **`ipa_model`**
    - Comfy dtype: `INT`
    - The model type used for processing the image, which can affect the overall style and quality of the output.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IP_Adapter_Settings_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ip_adapter_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("FLOAT",["linear", "ease in", "ease out", "ease in-out", "reverse in-out", "weak input", "weak output", "weak middle", "strong middle"],"FLOAT","FLOAT","FLOAT",["center","top", "bottom", "left", "right"],"FLOAT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT","INT")
    RETURN_NAMES = ("ipa_weight","ipa_wtype","ipa_noise","ipa_start","ipa_stop","ipa_crop","ipa_zoom","ipa_offset_x","ipa_offset_y","ipa_mask","crop_intpol","sharpening","ipa_model")
    FUNCTION = "get_ipamode_single"

    CATEGORY="JPS Nodes/Pipes"

    def get_ipamode_single(self,ip_adapter_settings):

        ipaweight,ipawtype,ipanoise,ipastart,ipastop,ipacrop,ipazoom,ipaoffsetx,ipaoffsety,ipamask,cropintpol,sharpening,ipamodel = ip_adapter_settings

        return(float(ipaweight),ipawtype,float(ipanoise),float(ipastart),float(ipastop),ipacrop,float(ipazoom),int(ipaoffsetx),int(ipaoffsety),int(ipamask),cropintpol,float(sharpening),int(ipamodel),)

```
