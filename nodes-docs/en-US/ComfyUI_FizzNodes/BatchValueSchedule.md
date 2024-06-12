---
tags:
- AnimationScheduling
- Scheduling
---

# Batch Value Schedule 📅🅕🅝
## Documentation
- Class name: `BatchValueSchedule`
- Category: `FizzNodes 📅🅕🅝/BatchScheduleNodes`
- Output node: `False`

The BatchValueSchedule node is designed to process a batch of text inputs, applying a scheduling algorithm to generate a sequence of values based on the text's key frames over a specified number of frames. It supports batch processing for efficiency and can optionally print the output for debugging purposes.
## Input types
### Required
- **`text`**
    - The text input containing key frames for value generation. It supports multiline input and plays a crucial role in determining the sequence of generated values.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`max_frames`**
    - Specifies the maximum number of frames for which values will be generated. It defines the length of the output sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A boolean flag that, when set to True, enables printing of the output for debugging purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The first element of the output tuple, representing the generated values as floating-point numbers.
    - Python dtype: `List[float]`
- **`int`**
    - Comfy dtype: `INT`
    - The second element of the output tuple, representing the generated values converted to integers.
    - Python dtype: `List[int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchValueSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": True, "default": defaultValue}),
                            "max_frames": ("INT", {"default": 120.0, "min": 1.0, "max": 999999.0, "step": 1.0}),
                            "print_output": ("BOOLEAN", {"default": False})}}

    RETURN_TYPES = ("FLOAT", "INT")
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/BatchScheduleNodes"

    def animate(self, text, max_frames, print_output):
        t = batch_get_inbetweens(batch_parse_key_frames(text, max_frames), max_frames)
        if print_output is True:
            print("ValueSchedule: ", t)
        return (t, list(map(int,t)),)

```
