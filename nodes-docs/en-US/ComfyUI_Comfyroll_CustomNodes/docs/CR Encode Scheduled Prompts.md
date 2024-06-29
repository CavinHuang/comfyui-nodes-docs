---
tags:
- AnimationScheduling
- Scheduling
---

# 📝 CR Encode Scheduled Prompts
## Documentation
- Class name: `CR Encode Scheduled Prompts`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📝 Prompt`
- Output node: `False`

This node is designed to encode scheduled prompts for animation sequences, converting them into a format suitable for further processing and animation generation. It focuses on organizing and preparing prompt data based on predefined schedules, ensuring that the animation prompts are correctly sequenced and formatted for optimal use.
## Input types
### Required
- **`clip`**
    - The clip input represents the animation clip for which the scheduled prompts are being encoded. It is crucial for determining the context and sequence of the animation.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.Tensor`
- **`current_prompt`**
    - The current prompt is the starting point of the animation sequence, setting the initial context for the animation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`next_prompt`**
    - The next prompt specifies the subsequent context in the animation sequence, allowing for a smooth transition between frames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`weight`**
    - The weight parameter influences the blending of prompts between frames, affecting the smoothness and transition quality of the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - The CONDITIONING output is a processed format of the input prompts, ready for animation generation.
    - Python dtype: `List[torch.Tensor, Dict]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_EncodeScheduledPrompts:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"clip": ("CLIP",),
                             "current_prompt": ("STRING", {"multiline": True}),
                             "next_prompt": ("STRING", {"multiline": True}),
                             "weight": ("FLOAT", {"default": 0.0, "min": -9999.0, "max": 9999.0, "step": 0.01,}),
                            }
        }
    
    RETURN_TYPES = ("CONDITIONING", "STRING", )
    RETURN_NAMES = ("CONDITIONING", "show_help", )
    FUNCTION = "condition"
    CATEGORY = icons.get("Comfyroll/Animation/Prompt")

    def condition(self, clip, current_prompt, next_prompt, weight):      
        
        # CLIP text encoding
        tokens = clip.tokenize(str(next_prompt))
        cond_from, pooled_from = clip.encode_from_tokens(tokens, return_pooled=True)
        tokens = clip.tokenize(str(current_prompt))
        cond_to, pooled_to = clip.encode_from_tokens(tokens, return_pooled=True)
        
        #return (addWeighted([[cond_to, {"pooled_output": pooled_to}]], [[cond_from, {"pooled_output": pooled_from}]], weight),)
        print(weight)
        
        # Average conditioning
        conditioning_to_strength = weight
        conditioning_from = [[cond_from, {"pooled_output": pooled_from}]]
        conditioning_to = [[cond_to, {"pooled_output": pooled_to}]]
        out = []

        if len(conditioning_from) > 1:
            print("Warning: Conditioning from contains more than 1 cond, only the first one will actually be applied to conditioning_to.")

        cond_from = conditioning_from[0][0]
        pooled_output_from = conditioning_from[0][1].get("pooled_output", None)

        for i in range(len(conditioning_to)):
            t1 = conditioning_to[i][0]
            pooled_output_to = conditioning_to[i][1].get("pooled_output", pooled_output_from)
            t0 = cond_from[:,:t1.shape[1]]
            if t0.shape[1] < t1.shape[1]:
                t0 = torch.cat([t0] + [torch.zeros((1, (t1.shape[1] - t0.shape[1]), t1.shape[2]))], dim=1)

            tw = torch.mul(t1, conditioning_to_strength) + torch.mul(t0, (1.0 - conditioning_to_strength))
            t_to = conditioning_to[i][1].copy()
            if pooled_output_from is not None and pooled_output_to is not None:
                t_to["pooled_output"] = torch.mul(pooled_output_to, conditioning_to_strength) + torch.mul(pooled_output_from, (1.0 - conditioning_to_strength))
            elif pooled_output_from is not None:
                t_to["pooled_output"] = pooled_output_from

            n = [tw, t_to]
            out.append(n)
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-encode-scheduled-prompts"
        return (out, show_help, )

```
