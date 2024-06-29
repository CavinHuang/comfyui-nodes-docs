---
tags:
- Image
- ImagePreprocessing
---

# IP Adapter Settings (JPS)
## Documentation
- Class name: `IP Adapter Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to configure and adapt image processing settings for various stages of image generation or manipulation. It allows for the customization of parameters such as weight, noise, start and stop points, cropping, zooming, and model selection, facilitating fine-tuned control over the image processing pipeline.
## Input types
### Required
- **`ipa_weight`**
    - Specifies the weight of the image processing adaptation, influencing the intensity of the applied settings.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_wtype`**
    - Defines the type of weight application, such as linear or ease in-out, affecting the progression of the image processing effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ipa_noise`**
    - Sets the noise level to be applied during the image processing, adding texture or grain as specified.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_start`**
    - Determines the starting point of the image processing effect, allowing for precise control over when the adaptation begins.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_stop`**
    - Defines the stopping point of the image processing effect, enabling customization of the effect's duration.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_crop`**
    - Specifies the cropping preference, such as center or top, to adjust the focus area of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ipa_zoom`**
    - Sets the zoom level for the image processing, allowing for closer inspection or broader views as needed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_offset_x`**
    - Determines the horizontal offset for the image processing, enabling lateral adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ipa_offset_y`**
    - Specifies the vertical offset for the image processing, allowing for vertical adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ipa_mask`**
    - Defines the mask type used in the image processing, such as Mask Editor or Red from Image, to target specific areas.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `int`
- **`crop_intpol`**
    - Specifies the interpolation method for cropping, affecting the smoothness or sharpness of the edges.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - Sets the sharpening intensity, enhancing the clarity and detail of the processed image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_model`**
    - Selects the model type for the image processing, such as SDXL ViT-H, influencing the adaptation's characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `int`
## Output types
- **`ip_adapter_single_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - A tuple representing the configured settings for a single image processing adaptation. This output encapsulates all the necessary parameters to apply the specified image processing adjustments.
    - Python dtype: `Tuple[float, str, float, float, float, str, float, int, int, int, str, float, int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IP_Adapter_Settings:
    ipamasktype = ["No Mask","Mask Editor","Mask Editor (inverted)","Red from Image","Green from Image","Blue from Image"]    

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ipa_weight": ("FLOAT", {"default": 0.5, "min": 0, "max": 3, "step": 0.01}),
                "ipa_wtype": (["linear", "ease in", "ease out", "ease in-out", "reverse in-out", "weak input", "weak output", "weak middle", "strong middle"],),
                "ipa_noise": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
                "ipa_start": ("FLOAT", {"default": 0.00, "min": 0, "max": 1, "step": 0.05}),
                "ipa_stop": ("FLOAT", {"default": 1.00, "min": 0, "max": 1, "step": 0.05}),
                "ipa_crop": (["center","top", "bottom", "left", "right"],),
                "ipa_zoom": ("FLOAT", { "default": 1, "min": 1, "max": 5, "step": 0.1, "display": "number" }),
                "ipa_offset_x": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "ipa_offset_y": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),                
                "ipa_mask": (s.ipamasktype,),
                "crop_intpol": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", { "default": 0.0, "min": 0, "max": 1, "step": 0.05, "display": "number" }),
                "ipa_model": (["SDXL ViT-H", "SDXL Plus ViT-H", "SDXL Plus Face ViT-H"],),
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("ip_adapter_single_settings",)
    FUNCTION = "get_ipamodesingle"

    CATEGORY="JPS Nodes/Settings"

    def get_ipamodesingle(self,ipa_weight,ipa_wtype,ipa_noise,ipa_start,ipa_stop,ipa_crop,ipa_zoom,ipa_offset_x,ipa_offset_y,ipa_mask,crop_intpol,sharpening,ipa_model):

        ipamask = int(0)
        if(ipa_mask == "Mask Editor"):
            ipamask = int(1)
        elif(ipa_mask == "Mask Editor (inverted)"):
            ipamask = int(2)
        elif(ipa_mask == "Red from Image"):
            ipamask = int(3)
        elif(ipa_mask == "Green from Image"):
            ipamask = int(4)
        elif(ipa_mask == "Blue from Image"):
            ipamask = int(5)

        ipamodel = int (0)
        if(ipa_model == "SDXL ViT-H"):
            ipamodel = int(1)
        elif(ipa_model == "SDXL Plus ViT-H"):
            ipamodel = int(2)
        elif(ipa_model == "SDXL Plus Face ViT-H"):
            ipamodel = int(3)

        ipaweight = ipa_weight
        ipawtype = ipa_wtype
        ipanoise = ipa_noise
        ipastart = ipa_start
        ipastop = ipa_stop
        ipacrop = ipa_crop
        ipazoom = ipa_zoom
        ipaoffsetx = ipa_offset_x
        ipaoffsety = ipa_offset_y
        cropintpol = crop_intpol
        
        ip_adapter_settings = ipaweight,ipawtype,ipanoise,ipastart,ipastop,ipacrop,ipazoom,ipaoffsetx,ipaoffsety,ipamask,cropintpol,sharpening,ipamodel

        return(ip_adapter_settings,)

```
