---
tags:
- LoRA
---

# 💊 CR Random Weight LoRA
## Documentation
- Class name: `CR Random Weight LoRA`
- Category: `🧩 Comfyroll Studio/✨ Essential/💊 LoRA`
- Output node: `False`

The CR_RandomWeightLoRA node is designed to manage and manipulate LoRA (Locally Reweighted Approximations) weights within a specified range, incorporating randomness and conditional logic based on the provided parameters. It facilitates the dynamic adjustment of LoRA weights, enabling more flexible and adaptive model behavior.
## Input types
### Required
- **`stride`**
    - Defines the interval at which the LoRA weights are potentially randomized, affecting the frequency of weight adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`force_randomize_after_stride`**
    - Determines whether to force a re-randomization of weights after a specified number of strides, enhancing the variability of model behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`lora_name`**
    - Identifies the specific LoRA instance to be manipulated, serving as a key for tracking and adjusting its weight.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`switch`**
    - Controls whether the LoRA weight adjustment is active ('On') or bypassed ('Off'), allowing for conditional execution.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight_min`**
    - Sets the minimum boundary for the random weight selection, constraining the range of possible weights.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_max`**
    - Defines the maximum limit for the random weight selection, establishing the upper boundary of the weight range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_weight`**
    - Specifies a clipping value for the LoRA weight, ensuring that the weight does not exceed this threshold.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`lora_stack`**
    - Optionally provides a stack of existing LoRA instances for integration or modification, allowing for cumulative adjustments.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `list`
## Output types
- **`lora_stack`**
    - Comfy dtype: `LORA_STACK`
    - Returns a stack of LoRA instances with their adjusted weights, ready for further processing or application.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_RandomWeightLoRA:

    @classmethod
    def INPUT_TYPES(cls):

        loras = ["None"] + folder_paths.get_filename_list("loras")

        return {"required": {
                    "stride": (("INT", {"default": 1, "min": 1, "max": 1000})),
                    "force_randomize_after_stride": (["Off","On"],),
                    "lora_name": (loras,),
                    "switch": (["Off","On"],),
                    "weight_min": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "weight_max": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_weight": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                },
                "optional": {"lora_stack": ("LORA_STACK",)
                },
        }

    RETURN_TYPES = ("LORA_STACK",)
    FUNCTION = "random_weight_lora"
    CATEGORY = icons.get("Comfyroll/LoRA")

    LastWeightMap = {}
    StridesMap = {}
    LastHashMap = {}

    @staticmethod
    def getIdHash(lora_name: str, force_randomize_after_stride, stride, weight_min, weight_max, clip_weight) -> int:
        fl_str = f"{lora_name}_{force_randomize_after_stride}_{stride}_{weight_min:.2f}_{weight_max:.2f}_{clip_weight:.2f}"
        return hashlib.sha256(fl_str.encode('utf-8')).hexdigest()

    @classmethod
    def IS_CHANGED(cls, stride, force_randomize_after_stride, lora_name, switch, weight_min, weight_max, clip_weight, lora_stack=None):     
        id_hash = CR_RandomWeightLoRA.getIdHash(lora_name, force_randomize_after_stride, stride, weight_min, weight_max, clip_weight)

        if switch == "Off":
            return id_hash + "_Off"
        if lora_name == "None":
            return id_hash

        if id_hash not in CR_RandomWeightLoRA.StridesMap:
            CR_RandomWeightLoRA.StridesMap[id_hash] = 0

        CR_RandomWeightLoRA.StridesMap[id_hash] += 1

        if stride > 1 and CR_RandomWeightLoRA.StridesMap[id_hash] < stride and id_hash in CR_RandomWeightLoRA.LastHashMap:
            return CR_RandomWeightLoRA.LastHashMap[id_hash]
        else:
            CR_RandomWeightLoRA.StridesMap[id_hash] = 0

        last_weight = CR_RandomWeightLoRA.LastWeightMap.get(id_hash, None)
        weight = uniform(weight_min, weight_max)

        if last_weight is not None:
            while weight == last_weight:
                weight = uniform(weight_min, weight_max)

        CR_RandomWeightLoRA.LastWeightMap[id_hash] = weight 

        hash_str = f"{id_hash}_{weight:.3f}"
        CR_RandomWeightLoRA.LastHashMap[id_hash] = hash_str
        return hash_str

    def random_weight_lora(self, stride, force_randomize_after_stride, lora_name, switch, weight_min, weight_max, clip_weight, lora_stack=None):
        id_hash = CR_RandomWeightLoRA.getIdHash(lora_name, force_randomize_after_stride, stride, weight_min, weight_max, clip_weight)

        # Initialise the list
        lora_list=list()

        if lora_stack is not None:
            lora_list.extend([l for l in lora_stack if l[0] != "None"])

        weight = CR_RandomWeightLoRA.LastWeightMap.get(id_hash, 0.0)

        if lora_name != "None" and switch == "On":
            lora_list.extend([(lora_name, weight, clip_weight)]),

        return (lora_list,)

```
