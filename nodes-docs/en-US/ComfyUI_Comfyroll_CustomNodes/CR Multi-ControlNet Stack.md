---
tags:
- ControlNet
---

# 🕹️ CR Multi-ControlNet Stack
## Documentation
- Class name: `CR Multi-ControlNet Stack`
- Category: `🧩 Comfyroll Studio/✨ Essential/🕹️ ControlNet`
- Output node: `False`

This node is designed to create a stack of ControlNet configurations, each with its own switch, allowing for the dynamic application of multiple ControlNet effects based on specified conditions. It facilitates the layering and conditional application of various ControlNet adjustments to images, enhancing flexibility and control in image manipulation workflows.
## Input types
### Required
### Optional
- **`switch_1`**
    - Determines whether the first ControlNet configuration in the stack is active ('On') or inactive ('Off').
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`controlnet_1`**
    - The first ControlNet configuration to be applied, if 'switch_1' is 'On'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`controlnet_strength_1`**
    - The strength of the first ControlNet effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent_1`**
    - The starting percentage of the image where the first ControlNet effect begins to apply.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent_1`**
    - The ending percentage of the image where the first ControlNet effect stops applying.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`switch_2`**
    - Determines whether the second ControlNet configuration in the stack is active ('On') or inactive ('Off').
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`controlnet_2`**
    - The second ControlNet configuration to be applied, if 'switch_2' is 'On'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`controlnet_strength_2`**
    - The strength of the second ControlNet effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent_2`**
    - The starting percentage of the image where the second ControlNet effect begins to apply.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent_2`**
    - The ending percentage of the image where the second ControlNet effect stops applying.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`switch_3`**
    - Determines whether the third ControlNet configuration in the stack is active ('On') or inactive ('Off').
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`controlnet_3`**
    - The third ControlNet configuration to be applied, if 'switch_3' is 'On'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`controlnet_strength_3`**
    - The strength of the third ControlNet effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent_3`**
    - The starting percentage of the image where the third ControlNet effect begins to apply.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent_3`**
    - The ending percentage of the image where the third ControlNet effect stops applying.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`image_1`**
    - The image to which the first ControlNet configuration is applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image_2`**
    - The image to which the second ControlNet configuration is applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image_3`**
    - The image to which the third ControlNet configuration is applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`controlnet_stack`**
    - A list of additional ControlNet configurations to be applied, each including the ControlNet's name, the image to apply it to, the strength of the effect, and the start and end percentages for the effect's application.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `List[Tuple[str, Image, float, float, float]]`
## Output types
- **`CONTROLNET_STACK`**
    - Comfy dtype: `CONTROL_NET_STACK`
    - The compiled list of ControlNet configurations to be applied, including those specified individually and those included in the 'controlnet_stack'.
    - Python dtype: `List[Tuple[str, Image, float, float, float]]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the documentation for further assistance on using the CR Multi-ControlNet Stack node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CR Apply Multi-ControlNet](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply Multi-ControlNet.md)
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)
    - [Eff. Loader SDXL](../../efficiency-nodes-comfyui/Nodes/Eff. Loader SDXL.md)



## Source code
```python
class CR_ControlNetStack:

    controlnets = ["None"] + folder_paths.get_filename_list("controlnet")
    
    @classmethod
    def INPUT_TYPES(cls):
        #controlnets = ["None"]
        return {"required": {
                },
                "optional": {
                    "switch_1": (["Off","On"],),
                    "controlnet_1": (cls.controlnets,),
                    "controlnet_strength_1": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "start_percent_1": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "end_percent_1": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    #
                    "switch_2": (["Off","On"],),
                    "controlnet_2": (cls.controlnets,),
                    "controlnet_strength_2": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "start_percent_2": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "end_percent_2": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    #
                    "switch_3": (["Off","On"],),
                    "controlnet_3": (cls.controlnets,),
                    "controlnet_strength_3": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "start_percent_3": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "end_percent_3": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    #
                    "image_1": ("IMAGE",),
                    "image_2": ("IMAGE",),
                    "image_3": ("IMAGE",),
                    "controlnet_stack": ("CONTROL_NET_STACK",)
                },
        }

    RETURN_TYPES = ("CONTROL_NET_STACK", "STRING", )
    RETURN_NAMES = ("CONTROLNET_STACK", "show_help", )
    FUNCTION = "controlnet_stacker"
    CATEGORY = icons.get("Comfyroll/ControlNet")

    def controlnet_stacker(self, switch_1, controlnet_1, controlnet_strength_1, start_percent_1, end_percent_1,
                           switch_2, controlnet_2, controlnet_strength_2, start_percent_2, end_percent_2,
                           switch_3, controlnet_3, controlnet_strength_3, start_percent_3, end_percent_3,
                           image_1=None, image_2=None, image_3=None, controlnet_stack=None):

        # Initialise the list
        controlnet_list= []
        
        if controlnet_stack is not None:
            controlnet_list.extend([l for l in controlnet_stack if l[0] != "None"])
        
        if controlnet_1 != "None" and  switch_1 == "On" and image_1 is not None:
            controlnet_path = folder_paths.get_full_path("controlnet", controlnet_1)
            controlnet_1 = comfy.controlnet.load_controlnet(controlnet_path)
            controlnet_list.extend([(controlnet_1, image_1, controlnet_strength_1, start_percent_1, end_percent_1)]),

        if controlnet_2 != "None" and  switch_2 == "On" and image_2 is not None:
            controlnet_path = folder_paths.get_full_path("controlnet", controlnet_2)
            controlnet_2 = comfy.controlnet.load_controlnet(controlnet_path)
            controlnet_list.extend([(controlnet_2, image_2, controlnet_strength_2, start_percent_2, end_percent_2)]),

        if controlnet_3 != "None" and  switch_3 == "On" and image_3 is not None:
            controlnet_path = folder_paths.get_full_path("controlnet", controlnet_3)
            controlnet_3 = comfy.controlnet.load_controlnet(controlnet_path)
            controlnet_list.extend([(controlnet_3, image_3, controlnet_strength_3, start_percent_3, end_percent_3)]),

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/ControlNet-Nodes#cr-multi-controlnet-stack"

        return (controlnet_list, show_help, )

```
