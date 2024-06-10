---
tags:
- AnimationScheduling
- Scheduling
---

# Batch Value Schedule (Latent Input) 📅🅕🅝
## Documentation
- Class name: `BatchValueScheduleLatentInput`
- Category: `FizzNodes 📅🅕🅝/BatchScheduleNodes`
- Output node: `False`

The BatchValueScheduleLatentInput node is designed to process latent inputs in the context of batch scheduling. It focuses on handling and transforming latent data according to a value schedule, enabling dynamic adjustments and manipulations of latent vectors based on specified scheduling parameters.
## Input types
### Required
- **`text`**
    - The 'text' parameter is a string that specifies the key frames and their corresponding values for the value schedule. It plays a crucial role in determining how the latent inputs are transformed over time.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`num_latents`**
    - The 'num_latents' parameter represents the latent inputs to be processed. It is essential for defining the latent vectors that will be adjusted according to the value schedule.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`print_output`**
    - The 'print_output' parameter controls whether the scheduling results are printed. It allows for optional debugging or visualization of the value schedule's effect on the latent inputs.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - This output represents the scheduled values as a floating-point number, reflecting the dynamic adjustments made to the latent inputs.
    - Python dtype: `torch.Tensor`
- **`int`**
    - Comfy dtype: `INT`
    - This output provides the integer representation of the scheduled values, offering an alternative numerical perspective on the adjustments.
    - Python dtype: `List[int]`
- **`latent`**
    - Comfy dtype: `LATENT`
    - This output includes the transformed latent inputs, showcasing the result of the scheduling process on the latent vectors.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchValueScheduleLatentInput:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": True, "default": defaultValue}),
                             "num_latents": ("LATENT", ),
                             "print_output": ("BOOLEAN", {"default": False})}}

    RETURN_TYPES = ("FLOAT", "INT", "LATENT", )
    FUNCTION = "animate"

    CATEGORY = "FizzNodes 📅🅕🅝/BatchScheduleNodes"

    def animate(self, text, num_latents, print_output):
        num_elements = sum(tensor.size(0) for tensor in num_latents.values())
        max_frames = num_elements
        t = batch_get_inbetweens(batch_parse_key_frames(text, max_frames), max_frames)
        if print_output is True:
            print("ValueSchedule: ", t)
        return (t, list(map(int,t)), num_latents, )

```
