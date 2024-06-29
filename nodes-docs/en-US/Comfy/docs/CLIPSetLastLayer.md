---
tags:
- CLIP
- Conditioning
---

# CLIP Set Last Layer
## Documentation
- Class name: `CLIPSetLastLayer`
- Category: `conditioning`
- Output node: `False`

This node is designed to modify the behavior of a CLIP model by setting a specific layer as the last one to be executed. It allows for the customization of the depth of processing within the CLIP model, potentially affecting the model's output by limiting the amount of information processed.
## Input types
### Required
- **`clip`**
    - The CLIP model to be modified. This parameter allows the node to directly interact with and alter the structure of the CLIP model.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`stop_at_clip_layer`**
    - Specifies the layer at which the CLIP model should stop processing. This allows for control over the depth of computation and can be used to adjust the model's behavior or performance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`clip`**
    - Comfy dtype: `CLIP`
    - The modified CLIP model with the specified layer set as the last one. This output enables further use or analysis of the adjusted model.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [CR Apply LoRA Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply LoRA Stack.md)
    - [Text to Conditioning](../../was-node-suite-comfyui/Nodes/Text to Conditioning.md)
    - Reroute
    - PromptControlSimple
    - [BatchPromptSchedule](../../ComfyUI_FizzNodes/Nodes/BatchPromptSchedule.md)
    - CLIPTextEncodeA1111
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - BNK_CutoffBasePrompt



## Source code
```python
class CLIPSetLastLayer:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip": ("CLIP", ),
                              "stop_at_clip_layer": ("INT", {"default": -1, "min": -24, "max": -1, "step": 1}),
                              }}
    RETURN_TYPES = ("CLIP",)
    FUNCTION = "set_last_layer"

    CATEGORY = "conditioning"

    def set_last_layer(self, clip, stop_at_clip_layer):
        clip = clip.clone()
        clip.clip_layer(stop_at_clip_layer)
        return (clip,)

```
