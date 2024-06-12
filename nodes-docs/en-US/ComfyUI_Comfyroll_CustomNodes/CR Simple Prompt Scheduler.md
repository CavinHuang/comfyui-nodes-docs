---
tags:
- AnimationScheduling
- Scheduling
---

# 📑 CR Simple Prompt Scheduler
## Documentation
- Class name: `CR Simple Prompt Scheduler`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📑 Schedulers`
- Output node: `False`

The CR_SimplePromptScheduler node is designed to manage and schedule animation prompts based on a simple scheduling logic. It processes a list of keyframes and, depending on the scheduling mode and format, prepares a sequence of prompts for animation frames. This node supports different scheduling modes, including default prompts and keyframe lists, and can handle format conversions for compatibility with different animation systems.
## Input types
### Required
- **`keyframe_list`**
    - The list of keyframes to be scheduled. It is crucial for defining the sequence and timing of animation prompts. The format and content of this list directly influence the scheduling outcome and the generation of animation prompts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`current_frame`**
    - The current frame number for which the prompt is being scheduled. It determines the relevant prompt and keyframe information for the current point in the animation sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`keyframe_format`**
    - Specifies the format of the keyframes, allowing for conversion between different animation systems' formats. This parameter ensures compatibility and correct interpretation of the keyframe list.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`current_prompt`**
    - Comfy dtype: `STRING`
    - The prompt scheduled for the current frame, ready for use in generating the animation.
    - Python dtype: `str`
- **`next_prompt`**
    - Comfy dtype: `STRING`
    - The prompt scheduled for the next frame, providing a lookahead for animation generation.
    - Python dtype: `str`
- **`weight`**
    - Comfy dtype: `FLOAT`
    - A weight value indicating the relevance or influence of the current prompt in the context of animation blending or interpolation.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to documentation or help resources related to the CR_SimplePromptScheduler node, offering guidance and additional information.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SimplePromptScheduler:
        
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"keyframe_list": ("STRING", {"multiline": True, "default": "frame_number, text"}),  
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "keyframe_format": (["CR", "Deforum"],),
                },
        }
    
    RETURN_TYPES = ("STRING", "STRING", "FLOAT", "STRING", )
    RETURN_NAMES = ("current_prompt", "next_prompt", "weight", "show_help", )
    FUNCTION = "simple_schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedulers")

    def simple_schedule(self, keyframe_list, keyframe_format, current_frame):
        
        keyframes = list()
        
        if keyframe_list == "":
            print(f"[Error] CR Simple Prompt Scheduler. No lines in keyframe list") 
            return ()   
        lines = keyframe_list.split('\n')
        for line in lines:
            # If deforum, convert to CR format
            if keyframe_format == "Deforum":
                line = line.replace(":", ",")
                line = line.rstrip(',')
            if not line.strip():
                print(f"[Warning] CR Simple Prompt Scheduler. Skipped blank line at line {i}")
                continue                  
            keyframes.extend([("SIMPLE", line)])        
              
        #print(f"[Debug] CR Simple Prompt Scheduler. Calling function") 
        current_prompt, next_prompt, current_keyframe, next_keyframe = prompt_scheduler(keyframes, "SIMPLE", current_frame)

        if current_prompt == "":
            print(f"[Warning] CR Simple Prompt Scheduler. No prompt found for frame. Simple schedules must start at frame 0.")
        else:        
            try:
                current_prompt_out = str(current_prompt)
                next_prompt_out = str(next_prompt)
                from_index = int(current_keyframe)
                to_index = int(next_keyframe)
            except ValueError:
                print(f"[Warning] CR Simple Text Scheduler. Invalid keyframe at frame {current_frame}")
            
            if from_index == to_index:
                weight_out = 1.0
            else:
                weight_out = (to_index - current_frame) / (to_index - from_index)
            
            show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-simple-prompt-scheduler"

            return(current_prompt_out, next_prompt_out, weight_out, show_help, )

```
