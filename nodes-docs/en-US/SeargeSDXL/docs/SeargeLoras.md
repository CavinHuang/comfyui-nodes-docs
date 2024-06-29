---
tags:
- LoRA
---

# Lora Selector v2
## Documentation
- Class name: `SeargeLoras`
- Category: `Searge/UI/Inputs`
- Output node: `False`

SeargeLoras is designed to manage and apply LoRA (Low-Rank Adaptation) adjustments to models within a generative AI framework. It dynamically adjusts the LoRA stack based on input parameters, ensuring that the model's behavior is modified according to specified LoRA configurations for enhanced performance or specific outcomes.
## Input types
### Required
- **`lora_i`**
    - Specifies the LoRA's name, serving as a key identifier for applying specific LoRA adjustments. This is a generic placeholder for multiple LoRA inputs (lora_1 to lora_5).
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_i_strength`**
    - Determines the strength of the LoRA's effect, influencing how significantly the LoRA adjustment alters the model. This applies to multiple LoRA inputs, each having its own strength parameter.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`data`**
    - An optional data structure that can be provided to include additional context or parameters for the LoRA adjustments.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Returns the updated data structure including the modified LoRA stack, reflecting the applied LoRA adjustments.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeLoras:
    def __init__(self):
        self.expected_lora_stack_size = None

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "lora_1": (UI.LORAS_WITH_NONE(),),
                "lora_1_strength": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.05},),
                "lora_2": (UI.LORAS_WITH_NONE(),),
                "lora_2_strength": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.05},),
                "lora_3": (UI.LORAS_WITH_NONE(),),
                "lora_3_strength": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.05},),
                "lora_4": (UI.LORAS_WITH_NONE(),),
                "lora_4_strength": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.05},),
                "lora_5": (UI.LORAS_WITH_NONE(),),
                "lora_5_strength": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.05},),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(loras, lora_1, lora_1_strength, lora_2, lora_2_strength, lora_3, lora_3_strength,
                    lora_4, lora_4_strength, lora_5, lora_5_strength):
        loras += [
            {
                UI.F_LORA_NAME: lora_1,
                UI.F_LORA_STRENGTH: round(lora_1_strength, 3),
            },
            {
                UI.F_LORA_NAME: lora_2,
                UI.F_LORA_STRENGTH: round(lora_2_strength, 3),
            },
            {
                UI.F_LORA_NAME: lora_3,
                UI.F_LORA_STRENGTH: round(lora_3_strength, 3),
            },
            {
                UI.F_LORA_NAME: lora_4,
                UI.F_LORA_STRENGTH: round(lora_4_strength, 3),
            },
            {
                UI.F_LORA_NAME: lora_5,
                UI.F_LORA_STRENGTH: round(lora_5_strength, 3),
            },
        ]

        return {
            UI.F_LORA_STACK: loras,
        }

    def get(self, lora_1, lora_1_strength, lora_2, lora_2_strength, lora_3, lora_3_strength, lora_4, lora_4_strength,
            lora_5, lora_5_strength, data=None):
        if data is None:
            data = {}

        loras = retrieve_parameter(UI.F_LORA_STACK, retrieve_parameter(UI.S_LORAS, data), [])

        if self.expected_lora_stack_size is None:
            self.expected_lora_stack_size = len(loras)
        elif self.expected_lora_stack_size == 0:
            loras = []
        elif len(loras) > self.expected_lora_stack_size:
            loras = loras[:self.expected_lora_stack_size]

        data[UI.S_LORAS] = self.create_dict(
            loras,
            lora_1,
            lora_1_strength,
            lora_2,
            lora_2_strength,
            lora_3,
            lora_3_strength,
            lora_4,
            lora_4_strength,
            lora_5,
            lora_5_strength,
        )

        return (data,)

```
