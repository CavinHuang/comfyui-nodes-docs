---
tags:
- AnimationScheduling
- Scheduling
---

# Image Select Schedule 📅🅕🅝
## Documentation
- Class name: `ImagesFromBatchSchedule`
- Category: `FizzNodes 📅🅕🅝/ScheduleNodes`
- Output node: `False`

This node is designed to generate a batch of images based on a predefined schedule. It leverages a batch value schedule list to select and export images from an input image batch, effectively creating a sequence or collection of images according to specified scheduling criteria. The functionality is inspired by and extends the capabilities of the ComfyUI-Image-Selector, facilitating advanced image batch processing and manipulation.
## Input types
### Required
- **`images`**
    - The input image batch from which images are to be selected and processed according to the batch schedule. This parameter is crucial for defining the source images for the scheduling operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text`**
    - The scheduling criteria or instructions provided as text, which dictate how images are selected and organized from the batch.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`current_frame`**
    - Specifies the current frame in the scheduling sequence, used to determine which images are selected.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_frames`**
    - The maximum number of frames to consider in the scheduling process, defining the upper limit of the batch processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`print_output`**
    - A boolean flag indicating whether to print the scheduling process's output for debugging or informational purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single image or a batch of images that have been selected and processed according to the input batch schedule. This collection of images is ready for further use or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImagesFromBatchSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "text": ("STRING", {"multiline": True, "default":defaultPrompt}),
                "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 999999.0, "step": 1.0, }),
                "max_frames": ("INT", {"default": 120.0, "min": 1.0, "max": 999999.0, "step": 1.0}),
                "print_output": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "animate"
    CATEGORY = "FizzNodes 📅🅕🅝/ScheduleNodes"

    def animate(self, images, text, current_frame, max_frames, print_output):
        inputText = str("{" + text + "}")
        inputText = re.sub(r',\s*}', '}', inputText)
        start_frame = 0
        animation_prompts = json.loads(inputText.strip())
        pos_cur_prompt, pos_nxt_prompt, weight = interpolate_prompt_series(animation_prompts, max_frames, 0, "",
                                                                           "", 0,
                                                                           0, 0, 0, print_output)
        selImages = selectImages(images,pos_cur_prompt[current_frame])
        return selImages

```
