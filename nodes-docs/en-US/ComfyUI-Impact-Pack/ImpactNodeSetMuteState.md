---
tags:
- ConditionalSelection
- ImpactPack
---

# Set Mute State
## Documentation
- Class name: `ImpactNodeSetMuteState`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `True`

This node is designed to control the mute state of other nodes within a workflow. It sends a command to mute or activate specified nodes based on the provided state, enhancing the flexibility and control over the workflow's execution.
## Input types
### Required
- **`signal`**
    - A generic signal input that triggers the node's operation. It's essential for initiating the mute or activation process.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`node_id`**
    - Specifies the unique identifier of the node whose mute state is to be controlled. It determines the target node for the mute or activation command.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`set_state`**
    - A boolean value indicating the desired mute state. When true, the target node is activated; when false, it is muted.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`signal_opt`**
    - Comfy dtype: `*`
    - Returns the original signal input, allowing for seamless integration into the workflow without altering the data flow.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactNodeSetMuteState:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "signal": (any_typ,),
                    "node_id": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "set_state": ("BOOLEAN", {"default": True, "label_on": "active", "label_off": "mute"}),
                    }
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("signal_opt",)
    OUTPUT_NODE = True

    def doit(self, signal, node_id, set_state):
        PromptServer.instance.send_sync("impact-node-mute-state", {"node_id": node_id, "is_active": set_state})
        return (signal,)

```
