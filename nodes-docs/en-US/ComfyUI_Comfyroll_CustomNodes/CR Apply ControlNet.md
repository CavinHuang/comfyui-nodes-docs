---
tags:
- ControlNet
---

# 🕹️ CR Apply ControlNet
## Documentation
- Class name: `CR Apply ControlNet`
- Category: `🧩 Comfyroll Studio/✨ Essential/🕹️ ControlNet`
- Output node: `False`

This node applies a ControlNet to an image based on specified conditions, allowing for dynamic image manipulation through control networks. It optionally provides a mechanism to adjust the intensity of the effect and to enable or disable the application of the ControlNet.
## Input types
### Required
- **`conditioning`**
    - Represents the conditions under which the ControlNet is applied, affecting how the image is manipulated.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`control_net`**
    - The ControlNet to be applied to the image, defining the specific transformations or effects.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `CONTROL_NET`
- **`image`**
    - The image to which the ControlNet is applied, serving as the base for manipulation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`switch`**
    - A toggle to enable or disable the application of the ControlNet, allowing for conditional application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - Adjusts the intensity of the ControlNet's effect on the image, providing control over the manipulation's strength.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditions after applying the ControlNet.
    - Python dtype: `tuple`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to documentation or help related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_ApplyControlNet:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                             "control_net": ("CONTROL_NET", ),
                             "image": ("IMAGE", ),
                             "switch": (["On","Off"],),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01})
                             }
               }
               
    RETURN_TYPES = ("CONDITIONING", "STRING", )
    RETURN_NAMES = ("CONDITIONING", "show_help", )
    FUNCTION = "apply_controlnet"
    CATEGORY = icons.get("Comfyroll/ControlNet")

    def apply_controlnet(self, conditioning, control_net, image, switch, strength):
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/ControlNet-Nodes#cr-apply-controlnet"
        
        if strength == 0 or switch == "Off":
            return (conditioning, show_help, )

        c = []
        control_hint = image.movedim(-1,1)
        for t in conditioning:
            n = [t[0], t[1].copy()]
            c_net = control_net.copy().set_cond_hint(control_hint, strength)
            if 'control' in t[1]:
                c_net.set_previous_controlnet(t[1]['control'])
            n[1]['control'] = c_net
            c.append(n)
            
        return (c, show_help, )

```
