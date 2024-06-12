---
tags:
- ConditionalSelection
- ImpactPack
---

# ImpactValueSender
## Documentation
- Class name: `ImpactValueSender`
- Category: `ImpactPack/Logic`
- Output node: `True`

The ImpactValueSender node is designed to transmit a specified value to a designated link within the system, optionally carrying an additional signal. It serves as a conduit for sending data across different parts of the application, facilitating communication and data flow.
## Input types
### Required
- **`value`**
    - The value to be sent. This parameter is central to the node's function as it determines the data that will be transmitted.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`link_id`**
    - Identifies the target link for sending the value. It specifies the destination within the system, ensuring the data reaches the intended recipient.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`signal_opt`**
    - An optional signal that can be sent along with the value. It provides additional context or control information accompanying the main data.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`signal`**
    - Comfy dtype: `*`
    - The optional signal sent along with the value, if provided. It represents additional data or control information that accompanies the main value.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactValueSender:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "value": (any_typ, ),
                    "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                    },
                "optional": {
                        "signal_opt": (any_typ,),
                    }
                }

    OUTPUT_NODE = True

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = (any_typ, )
    RETURN_NAMES = ("signal", )

    def doit(self, value, link_id=0, signal_opt=None):
        PromptServer.instance.send_sync("value-send", {"link_id": link_id, "value": value})
        return (signal_opt, )

```
