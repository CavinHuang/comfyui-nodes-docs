---
tags:
- ConditionalSelection
- ImpactPack
---

# Control Bridge
## Documentation
- Class name: `ImpactControlBridge`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `True`

The ImpactControlBridge node serves as a dynamic control mechanism for managing the state of other nodes within a ComfyUI environment. It enables the activation, muting, or bypassing of specified nodes based on operational modes, thereby facilitating flexible workflow adjustments and error handling through the use of signals.
## Input types
### Required
- **`value`**
    - Represents the value to be processed, which can influence the control bridge's decision-making process.
    - Comfy dtype: `*`
    - Python dtype: `any`
- **`mode`**
    - Determines the operational mode of the node, such as active, mute, or bypass, affecting how other nodes are controlled.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
- **`behavior`**
    - Specifies the behavior of the node in terms of muting or bypassing, providing additional control over the workflow.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
## Output types
- **`value`**
    - Comfy dtype: `*`
    - The processed value, reflecting the outcome of the control bridge's operations.
    - Python dtype: `any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactControlBridge:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                      "value": (any_typ,),
                      "mode": ("BOOLEAN", {"default": True, "label_on": "Active", "label_off": "Mute/Bypass"}),
                      "behavior": ("BOOLEAN", {"default": True, "label_on": "Mute", "label_off": "Bypass"}),
                    },
                "hidden": {"unique_id": "UNIQUE_ID", "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"}
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("value",)
    OUTPUT_NODE = True

    @classmethod
    def IS_CHANGED(self, value, mode, behavior=True, unique_id=None, prompt=None, extra_pnginfo=None):
        nodes, links = workflow_to_map(extra_pnginfo['workflow'])

        next_nodes = []

        for link in nodes[unique_id]['outputs'][0]['links']:
            node_id = str(links[link][2])
            impact.utils.collect_non_reroute_nodes(nodes, links, next_nodes, node_id)

        return next_nodes


    def doit(self, value, mode, behavior=True, unique_id=None, prompt=None, extra_pnginfo=None):
        global error_skip_flag

        nodes, links = workflow_to_map(extra_pnginfo['workflow'])

        active_nodes = []
        mute_nodes = []
        bypass_nodes = []

        for link in nodes[unique_id]['outputs'][0]['links']:
            node_id = str(links[link][2])

            next_nodes = []
            impact.utils.collect_non_reroute_nodes(nodes, links, next_nodes, node_id)

            for next_node_id in next_nodes:
                node_mode = nodes[next_node_id]['mode']

                if node_mode == 0:
                    active_nodes.append(next_node_id)
                elif node_mode == 2:
                    mute_nodes.append(next_node_id)
                elif node_mode == 4:
                    bypass_nodes.append(next_node_id)

        if mode:
            # active
            should_be_active_nodes = mute_nodes + bypass_nodes
            if len(should_be_active_nodes) > 0:
                PromptServer.instance.send_sync("impact-bridge-continue", {"node_id": unique_id, 'actives': list(should_be_active_nodes)})
                error_skip_flag = True
                raise Exception("IMPACT-PACK-SIGNAL: STOP CONTROL BRIDGE\nIf you see this message, your ComfyUI-Manager is outdated. Please update it.")

        elif behavior:
            # mute
            should_be_mute_nodes = active_nodes + bypass_nodes
            if len(should_be_mute_nodes) > 0:
                PromptServer.instance.send_sync("impact-bridge-continue", {"node_id": unique_id, 'mutes': list(should_be_mute_nodes)})
                error_skip_flag = True
                raise Exception("IMPACT-PACK-SIGNAL: STOP CONTROL BRIDGE\nIf you see this message, your ComfyUI-Manager is outdated. Please update it.")

        else:
            # bypass
            should_be_bypass_nodes = active_nodes + mute_nodes
            if len(should_be_bypass_nodes) > 0:
                PromptServer.instance.send_sync("impact-bridge-continue", {"node_id": unique_id, 'bypasses': list(should_be_bypass_nodes)})
                error_skip_flag = True
                raise Exception("IMPACT-PACK-SIGNAL: STOP CONTROL BRIDGE\nIf you see this message, your ComfyUI-Manager is outdated. Please update it.")

        return (value, )

```
