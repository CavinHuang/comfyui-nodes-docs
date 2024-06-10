---
tags:
- Conditioning
---

# ⚙️ CR Conditioning Mixer
## Documentation
- Class name: `CR Conditioning Mixer`
- Category: `🧩 Comfyroll Studio/✨ Essential/📦 Core`
- Output node: `False`

The CR Conditioning Mixer node is designed to blend or combine different conditioning inputs into a single, cohesive output. It supports various mixing methods such as combining, averaging, or concatenating conditioning inputs, allowing for flexible manipulation of conditioning data.
## Input types
### Required
- **`conditioning_1`**
    - The first set of conditioning inputs to be mixed. It serves as a base or starting point for the mixing process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
- **`conditioning_2`**
    - The second set of conditioning inputs to be mixed with the first set. It adds or modifies the initial conditioning based on the mixing method.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
- **`mix_method`**
    - Specifies the method used for mixing the conditioning inputs. It affects how the inputs are blended together, offering options like 'Combine', 'Average', or 'Concatenate'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`average_strength`**
    - Determines the strength or weight of the second set of conditioning inputs when using the 'Average' mixing method. It controls the balance between the two sets of inputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - The result of mixing the conditioning inputs according to the specified method. It represents the blended conditioning data.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to a help page with more information about the CR Conditioning Mixer node and its usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - Reroute



## Source code
```python
class CR_ConditioningMixer:

    @classmethod
    def INPUT_TYPES(cls):
    
        mix_methods = ["Combine", "Average", "Concatenate"]
        
        return {"required":
                    {"conditioning_1": ("CONDITIONING", ),
                     "conditioning_2": ("CONDITIONING", ),      
                     "mix_method": (mix_methods, ),
                     "average_strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                    }
               }

    RETURN_TYPES = ("CONDITIONING", "STRING", )
    RETURN_NAMES = ("CONDITIONING", "show_help", )
    FUNCTION = "conditioning"
    CATEGORY = icons.get("Comfyroll/Essential/Core")
    
    def conditioning(self, mix_method, conditioning_1, conditioning_2, average_strength):

        conditioning_from = conditioning_1
        conditioning_to = conditioning_2
        conditioning_to_strength = average_strength

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-conditioning-mixer"
    
        if mix_method == "Combine":
            return (conditioning_1 + conditioning_2, show_help, )

        if mix_method == "Average":
        
            out = []

            if len(conditioning_from) > 1:
                print("Warning: ConditioningAverage conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to.")

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
            return (out, show_help, )

        if mix_method == "Concatenate":
        
            out = []

            if len(conditioning_from) > 1:
                print("Warning: ConditioningConcat conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to.")

            cond_from = conditioning_from[0][0]

            for i in range(len(conditioning_to)):
                t1 = conditioning_to[i][0]
                tw = torch.cat((t1, cond_from),1)
                n = [tw, conditioning_to[i][1].copy()]
                out.append(n)
            return (out, show_help, )

```
