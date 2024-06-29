---
tags:
- LoRA
---

# 💊 CR Random LoRA Stack
## Documentation
- Class name: `CR Random LoRA Stack`
- Category: `🧩 Comfyroll Studio/✨ Essential/💊 LoRA`
- Output node: `False`

The CR_RandomLoRAStack node is designed to manage and manipulate stacks of LoRA (Low-Rank Adaptation) instances, specifically focusing on randomizing and applying LoRA modifications to models. It enables the dynamic adjustment of model weights through LoRA techniques, supporting exclusive modes, stride-based re-randomization, and the integration of multiple LoRA instances into a single stack.
## Input types
### Required
- **`exclusive_mode`**
    - Determines whether only one LoRA instance should be applied at a time, enabling a mode where the instance with the highest chance is selected exclusively.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`stride`**
    - Sets the minimum number of cycles before a re-randomization of the LoRA weights is performed, controlling the frequency of weight adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`force_randomize_after_stride`**
    - Forces a re-randomization of the LoRA weights after a specified number of cycles, ensuring dynamic adjustments over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_name_1`**
    - Specifies the first LoRA instance's name, part of the trio of LoRA instances that can be applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`switch_1`**
    - Controls whether the first LoRA instance is active or not, allowing for selective application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`chance_1`**
    - Determines the chance of the first LoRA instance being applied, used in exclusive mode to select the most likely instance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`model_weight_1`**
    - Defines the model weight for the first LoRA instance, influencing how it modifies the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_weight_1`**
    - Sets the clipping weight for the first LoRA instance, affecting its impact on the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_name_2`**
    - Specifies the second LoRA instance's name, part of the trio of LoRA instances that can be applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`switch_2`**
    - Controls whether the second LoRA instance is active or not, allowing for selective application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`chance_2`**
    - Determines the chance of the second LoRA instance being applied, used in exclusive mode to select the most likely instance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`model_weight_2`**
    - Defines the model weight for the second LoRA instance, influencing how it modifies the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_weight_2`**
    - Sets the clipping weight for the second LoRA instance, affecting its impact on the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_name_3`**
    - Specifies the third LoRA instance's name, part of the trio of LoRA instances that can be applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`switch_3`**
    - Controls whether the third LoRA instance is active or not, allowing for selective application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`chance_3`**
    - Determines the chance of the third LoRA instance being applied, used in exclusive mode to select the most likely instance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`model_weight_3`**
    - Defines the model weight for the third LoRA instance, influencing how it modifies the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clip_weight_3`**
    - Sets the clipping weight for the third LoRA instance, affecting its impact on the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`lora_stack`**
    - An optional stack of existing LoRA instances to be extended or modified by the current operation.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `List[Tuple[str, float, float]]`
## Output types
- **`lora_stack`**
    - Comfy dtype: `LORA_STACK`
    - Returns a modified stack of LoRA instances, incorporating the adjustments and randomizations specified in the input parameters.
    - Python dtype: `List[Tuple[str, float, float]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_RandomLoRAStack:

    @classmethod
    def INPUT_TYPES(cls):

        loras = ["None"] + folder_paths.get_filename_list("loras")

        return {"required": {
                    "exclusive_mode": (["Off","On"],),
                    "stride": (("INT", {"default": 1, "min": 1, "max": 1000})),
                    "force_randomize_after_stride": (["Off","On"],),
                    "lora_name_1": (loras,),
                    "switch_1": (["Off","On"],),
                    "chance_1": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "model_weight_1": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_weight_1": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "lora_name_2": (loras,),
                    "switch_2": (["Off","On"],),
                    "chance_2": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "model_weight_2": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_weight_2": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "lora_name_3": (loras,),
                    "switch_3": (["Off","On"],),
                    "chance_3": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "model_weight_3": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                    "clip_weight_3": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                },
                "optional": {"lora_stack": ("LORA_STACK",)
                },
        }

    RETURN_TYPES = ("LORA_STACK",)
    FUNCTION = "random_lora_stacker"
    CATEGORY = icons.get("Comfyroll/LoRA")

    UsedLorasMap = {}
    StridesMap = {}
    LastHashMap = {}

    @staticmethod
    def getIdHash(lora_name_1: str, lora_name_2: str, lora_name_3: str) -> int:
        id_set = set([lora_name_1, lora_name_2, lora_name_3])
        id_hash = hash(frozenset(id_set))
        return id_hash

    @staticmethod
    def deduplicateLoraNames(lora_name_1: str, lora_name_2: str, lora_name_3: str):
        is_same_1 = False
        is_same_2 = False
        is_same_3 = False

        if lora_name_1 == lora_name_2:
            is_same_1 = True
            is_same_2 = True
        if lora_name_1 == lora_name_3:
            is_same_1 = True
            is_same_3 = True
        if lora_name_2 == lora_name_3:
            is_same_2 = True
            is_same_3 = True

        if is_same_1:
            lora_name_1 = lora_name_1 + "CR_RandomLoRAStack_1"
        if is_same_2:
            lora_name_2 = lora_name_2 + "CR_RandomLoRAStack_2"
        if is_same_3:
            lora_name_3 = lora_name_3 + "CR_RandomLoRAStack_3"

        return lora_name_1, lora_name_2, lora_name_3

    @staticmethod
    def cleanLoraName(lora_name) -> str:
        if "CR_RandomLoRAStack_1" in lora_name:
            lora_name = lora_name.replace("CR_RandomLoRAStack_1", "")
        elif "CR_RandomLoRAStack_2" in lora_name:
            lora_name = lora_name.replace("CR_RandomLoRAStack_2", "")
        elif "CR_RandomLoRAStack_3" in lora_name:
            lora_name = lora_name.replace("CR_RandomLoRAStack_3", "")
        return lora_name


    @classmethod
    def IS_CHANGED(cls, exclusive_mode, stride, force_randomize_after_stride, lora_name_1, model_weight_1, clip_weight_1, switch_1, chance_1, lora_name_2,
                    model_weight_2, clip_weight_2, switch_2, chance_2, lora_name_3, model_weight_3, clip_weight_3, switch_3, chance_3, lora_stack=None):     
        lora_set = set()

        lora_name_1, lora_name_2, lora_name_3 = CR_RandomLoRAStack.deduplicateLoraNames(lora_name_1, lora_name_2, lora_name_3)        
        id_hash = CR_RandomLoRAStack.getIdHash(lora_name_1, lora_name_2, lora_name_3)

        if id_hash not in CR_RandomLoRAStack.StridesMap:
            CR_RandomLoRAStack.StridesMap[id_hash] = 0

        CR_RandomLoRAStack.StridesMap[id_hash] += 1

        if stride > 1 and CR_RandomLoRAStack.StridesMap[id_hash] < stride and id_hash in CR_RandomLoRAStack.LastHashMap:
            return CR_RandomLoRAStack.LastHashMap[id_hash]
        else:
            CR_RandomLoRAStack.StridesMap[id_hash] = 0

        total_on = 0
        if lora_name_1 != "None" and switch_1 == "On" and chance_1 > 0.0: total_on += 1
        if lora_name_2 != "None" and switch_2 == "On" and chance_2 > 0.0: total_on += 1
        if lora_name_3 != "None" and switch_3 == "On" and chance_3 > 0.0: total_on += 1

        def perform_randomization() -> set:    
            _lora_set = set()

            rand_1 = random()
            rand_2 = random()
            rand_3 = random()

            apply_1 = True if (rand_1 <= chance_1 and switch_1 == "On") else False
            apply_2 = True if (rand_2 <= chance_2 and switch_2 == "On") else False
            apply_3 = True if (rand_3 <= chance_3 and switch_3 == "On") else False

            num_to_apply = sum([apply_1, apply_2, apply_3])

            if exclusive_mode == "On" and num_to_apply > 1:
                rand_dict = {}
                if apply_1: rand_dict[1] = rand_1
                if apply_2: rand_dict[2] = rand_2
                if apply_3: rand_dict[3] = rand_3
                sorted_rands = sorted(rand_dict.keys(), key=lambda k: rand_dict[k])
                if sorted_rands[0] == 1:
                    apply_2 = False
                    apply_3 = False
                elif sorted_rands[0] == 2:
                    apply_1 = False
                    apply_3 = False
                elif sorted_rands[0] == 3:
                    apply_1 = False
                    apply_2 = False

            if lora_name_1 != "None" and switch_1 == "On" and apply_1:
                _lora_set.add(lora_name_1)
            if lora_name_2 != "None" and switch_2 == "On" and apply_2:
                _lora_set.add(lora_name_2)
            if lora_name_3 != "None" and switch_3 == "On" and apply_3:
                _lora_set.add(lora_name_3)
            return _lora_set

        last_lora_set = CR_RandomLoRAStack.UsedLorasMap.get(id_hash, set())
        lora_set = perform_randomization()

        if force_randomize_after_stride == "On" and len(last_lora_set) > 0 and total_on > 1:
            while lora_set == last_lora_set:
                lora_set = perform_randomization()

        CR_RandomLoRAStack.UsedLorasMap[id_hash] = lora_set        

        hash_str = str(hash(frozenset(lora_set)))
        CR_RandomLoRAStack.LastHashMap[id_hash] = hash_str
        return hash_str

    def random_lora_stacker(self, exclusive_mode, stride, force_randomize_after_stride, lora_name_1, model_weight_1, clip_weight_1, switch_1, chance_1, lora_name_2,
                    model_weight_2, clip_weight_2, switch_2, chance_2, lora_name_3, model_weight_3, clip_weight_3, switch_3, chance_3, lora_stack=None):

        # Initialise the list
        lora_list=list()

        if lora_stack is not None:
            lora_list.extend([l for l in lora_stack if l[0] != "None"])

        lora_name_1, lora_name_2, lora_name_3 = CR_RandomLoRAStack.deduplicateLoraNames(lora_name_1, lora_name_2, lora_name_3)
        id_hash = CR_RandomLoRAStack.getIdHash(lora_name_1, lora_name_2, lora_name_3)

        used_loras = CR_RandomLoRAStack.UsedLorasMap.get(id_hash, set())

        if lora_name_1 != "None" and switch_1 == "On" and lora_name_1 in used_loras:
            lora_list.extend([(CR_RandomLoRAStack.cleanLoraName(lora_name_1), model_weight_1, clip_weight_1)]),

        if lora_name_2 != "None" and switch_2 == "On" and lora_name_2 in used_loras:
            lora_list.extend([(CR_RandomLoRAStack.cleanLoraName(lora_name_2), model_weight_2, clip_weight_2)]),

        if lora_name_3 != "None" and switch_3 == "On" and lora_name_3 in used_loras:
            lora_list.extend([(CR_RandomLoRAStack.cleanLoraName(lora_name_3), model_weight_3, clip_weight_3)]),

        return (lora_list,)

```
