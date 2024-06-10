---
tags:
- ControlNet
---

# 🕹️ CR Apply Multi-ControlNet
## Documentation
- Class name: `CR Apply Multi-ControlNet`
- Category: `🧩 Comfyroll Studio/✨ Essential/🕹️ ControlNet`
- Output node: `False`

This node is designed to apply a stack of multiple ControlNets to a given set of conditioning data. It iterates through each ControlNet in the stack, applying them sequentially to modify the conditioning data based on the ControlNet's specifications and the provided image, strength, and percentage range. This allows for complex and layered modifications to the conditioning data, enabling more nuanced and controlled generation processes.
## Input types
### Required
- **`base_positive`**
    - The initial positive conditioning data to which the ControlNet stack will be applied. This data serves as the starting point for the sequential application of ControlNets.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`base_negative`**
    - The initial negative conditioning data to which the ControlNet stack will be applied. Similar to 'base_positive', this data is modified sequentially by the ControlNet stack.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`switch`**
    - A control switch to enable or disable the application of the ControlNet stack. If set to 'Off', the node will bypass the application process and return the original conditioning data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`controlnet_stack`**
    - A list of tuples, each representing a ControlNet to be applied. Each tuple contains the ControlNet's name or object, the image to use for control hints, the strength of application, and the start and end percentages for application range.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `List[Tuple[Union[str, comfy.controlnet.ControlNet], torch.Tensor, float, float, float]]`
## Output types
- **`base_pos`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`base_neg`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing help and additional information about the node and its usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)



## Source code
```python
class CR_ApplyControlNetStack:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"base_positive": ("CONDITIONING", ),
                             "base_negative": ("CONDITIONING",),
                             "switch": (["Off","On"],),
                             "controlnet_stack": ("CONTROL_NET_STACK", ),
                            }
        }                    

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "STRING", )
    RETURN_NAMES = ("base_pos", "base_neg", "show_help", )
    FUNCTION = "apply_controlnet_stack"
    CATEGORY = icons.get("Comfyroll/ControlNet")

    def apply_controlnet_stack(self, base_positive, base_negative, switch, controlnet_stack=None,):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/ControlNet-Nodes#cr-apply-multi-controlnet-stack"

        if switch == "Off":
            return (base_positive, base_negative, show_help, )
    
        if controlnet_stack is not None:
            for controlnet_tuple in controlnet_stack:
                controlnet_name, image, strength, start_percent, end_percent  = controlnet_tuple
                
                if type(controlnet_name) == str:
                    controlnet_path = folder_paths.get_full_path("controlnet", controlnet_name)
                    controlnet = comfy.sd.load_controlnet(controlnet_path)
                else:
                    controlnet = controlnet_name
                
                controlnet_conditioning = ControlNetApplyAdvanced().apply_controlnet(base_positive, base_negative,
                                                                                     controlnet, image, strength,
                                                                                     start_percent, end_percent)

                base_positive, base_negative = controlnet_conditioning[0], controlnet_conditioning[1]

        return (base_positive, base_negative, show_help, )

```
