---
tags:
- ControlNet
---

# Control Net Stacker
## Documentation
- Class name: `Control Net Stacker`
- Category: `Efficiency Nodes/Stackers`
- Output node: `False`

The TSC Control Net Stacker node is designed to aggregate control networks along with their associated images, strengths, and percentage ranges into a stack. This functionality is crucial for managing and applying multiple control networks in a sequential or layered manner, enhancing the flexibility and efficiency of image manipulation processes.
## Input types
### Required
- **`control_net`**
    - The control network to be added to the stack. It plays a central role in defining the manipulation or adjustment to be applied to the image.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `str`
- **`image`**
    - The image associated with the control network. This image serves as a reference or target for the control network's application.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`strength`**
    - Defines the intensity of the control network's effect on the image, allowing for fine-tuned adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Specifies the starting point of the control network's effect in terms of the image's generation process, enabling precise control over the application timing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Determines the ending point of the control network's effect, further refining the application's temporal precision.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`cnet_stack`**
    - An existing stack of control networks to which the new control network will be added, facilitating the accumulation of multiple networks.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `list`
## Output types
- **`CNET_STACK`**
    - Comfy dtype: `CONTROL_NET_STACK`
    - The updated stack of control networks, each associated with specific images, strengths, and percentage ranges, ready for sequential or layered application.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)



## Source code
```python
class TSC_Control_Net_Stacker:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"control_net": ("CONTROL_NET",),
                             "image": ("IMAGE",),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                             "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001})},
                "optional": {"cnet_stack": ("CONTROL_NET_STACK",)},
                }

    RETURN_TYPES = ("CONTROL_NET_STACK",)
    RETURN_NAMES = ("CNET_STACK",)
    FUNCTION = "control_net_stacker"
    CATEGORY = "Efficiency Nodes/Stackers"

    def control_net_stacker(self, control_net, image, strength, start_percent, end_percent, cnet_stack=None):
        # If control_net_stack is None, initialize as an empty list
        cnet_stack = [] if cnet_stack is None else cnet_stack

        # Extend the control_net_stack with the new tuple
        cnet_stack.extend([(control_net, image, strength, start_percent, end_percent)])

        return (cnet_stack,)

```
