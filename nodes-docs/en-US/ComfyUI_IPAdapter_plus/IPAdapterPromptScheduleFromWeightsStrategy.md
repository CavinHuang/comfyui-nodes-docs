---
tags:
- ControlNet
- Weight
---

# Prompt Schedule From Weights Strategy
## Documentation
- Class name: `IPAdapterPromptScheduleFromWeightsStrategy`
- Category: `ipadapter/weights`
- Output node: `False`

This node generates a schedule for prompts based on a given weights strategy, adjusting the prompts to fit the specified frame count and adding starting or ending frames if required. It aims to tailor the prompt distribution over a sequence of frames, ensuring alignment with the animation or image generation process.
## Input types
### Required
- **`weights_strategy`**
    - Defines the strategy for distributing weights across frames, including the total number of frames, and whether to add starting or ending frames. It's crucial for determining how the prompts are scheduled and distributed.
    - Comfy dtype: `WEIGHTS_STRATEGY`
    - Python dtype: `Dict[str, Union[int, bool]]`
- **`prompt`**
    - The initial prompt or series of prompts, separated by new lines, to be scheduled according to the weights strategy. It allows for dynamic adjustment of the prompt content over the frames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`prompt_schedule`**
    - Comfy dtype: `STRING`
    - The generated schedule of prompts, formatted as a string, detailing the prompt assignments for each frame based on the weights strategy.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterPromptScheduleFromWeightsStrategy():
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "weights_strategy": ("WEIGHTS_STRATEGY",),
            "prompt": ("STRING", {"default": "", "multiline": True }),
            }}
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt_schedule", )
    FUNCTION = "prompt_schedule"
    CATEGORY = "ipadapter/weights"

    def prompt_schedule(self, weights_strategy, prompt=""):
        frames = weights_strategy["frames"]
        add_starting_frames = weights_strategy["add_starting_frames"]
        add_ending_frames = weights_strategy["add_ending_frames"]
        frame_count = weights_strategy["frame_count"]

        out = ""

        prompt = [p for p in prompt.split("\n") if p.strip() != ""]

        if len(prompt) > 0 and frame_count > 0:
            # prompt_pos must be the same size as the image batch
            if len(prompt) > frame_count:
                prompt = prompt[:frame_count]
            elif len(prompt) < frame_count:
                prompt += [prompt[-1]] * (frame_count - len(prompt))

            if add_starting_frames > 0:
                out += f"\"0\": \"{prompt[0]}\",\n"
            for i in range(frame_count):
                out += f"\"{i * frames + add_starting_frames}\": \"{prompt[i]}\",\n"
            if add_ending_frames > 0:
                out += f"\"{frame_count * frames + add_starting_frames}\": \"{prompt[-1]}\",\n"

        return (out, )

```
