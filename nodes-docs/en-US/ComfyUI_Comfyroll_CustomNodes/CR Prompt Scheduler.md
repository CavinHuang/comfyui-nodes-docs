---
tags:
- AnimationScheduling
- Scheduling
---

# 📑 CR Prompt Scheduler
## Documentation
- Class name: `CR Prompt Scheduler`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📑 Schedulers`
- Output node: `False`

The CR Prompt Scheduler node is designed to manage and schedule animation prompts based on predefined rules and formats. It dynamically adjusts prompts and their attributes according to the current frame and specified scheduling mode, facilitating the creation of complex animations.
## Input types
### Required
- **`mode`**
    - Specifies the scheduling mode, which determines how prompts are selected and managed throughout the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`current_frame`**
    - Indicates the current frame of the animation, used to determine the appropriate prompt and its attributes based on the schedule.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`default_prompt`**
    - The default prompt to use when the scheduler is disabled or no other prompts are applicable.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`schedule_format`**
    - Defines the format of the schedule, allowing for compatibility with different scheduling syntaxes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`interpolate_prompt`**
    - Determines whether to interpolate between prompts when transitioning from one keyframe to another.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`schedule`**
    - The actual schedule data, containing the prompts and their corresponding frames.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `list[tuple[str, str]]`
- **`schedule_alias`**
    - A unique identifier for the schedule, used to manage and reference different scheduling configurations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`keyframe_list`**
    - A list of keyframes specifying the frames and associated prompts for animation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prepend_text`**
    - Text to prepend to the current and next prompts, enhancing the prompt's context or detail.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`append_text`**
    - Text to append to the current and next prompts, adding additional context or detail.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`current_prompt`**
    - Comfy dtype: `STRING`
    - The prompt to be used for the current frame.
    - Python dtype: `str`
- **`next_prompt`**
    - Comfy dtype: `STRING`
    - The prompt to be used for the next frame.
    - Python dtype: `str`
- **`weight`**
    - Comfy dtype: `FLOAT`
    - A weight value indicating the blend ratio between the current and next prompts.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A link to further documentation or help regarding the scheduler.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_PromptScheduler:

    @classmethod
    def INPUT_TYPES(s):
        modes = ["Default Prompt", "Keyframe List", "Schedule"]
        return {"required": {"mode": (modes,),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "default_prompt": ("STRING", {"multiline": False, "default": "default prompt"}),
                             "schedule_format": (["CR", "Deforum"],),
                             #"pingpong_keyframes": (["No", "Yes"],),
                             "interpolate_prompt": (["Yes", "No"],),
                },
                "optional": {"schedule": ("SCHEDULE",),
                             "schedule_alias": ("STRING", {"default prompt": "", "multiline": False}),
                             "keyframe_list": ("STRING", {"multiline": True, "default": "keyframe list"}), 
                             "prepend_text": ("STRING", {"multiline": True, "default": "prepend text"}),
                             "append_text": ("STRING", {"multiline": True, "default": "append text"}),                 
                }                    
        }
    
    RETURN_TYPES = ("STRING", "STRING", "FLOAT", "STRING", )
    RETURN_NAMES = ("current_prompt", "next_prompt", "weight", "show_help", )
    FUNCTION = "schedule"
    CATEGORY = icons.get("Comfyroll/Animation/Schedulers")

    def schedule(self, mode, prepend_text, append_text, current_frame, schedule_alias, default_prompt, schedule_format, interpolate_prompt, keyframe_list="", schedule=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-prompt-scheduler"

        schedule_lines = list()    
    
        if mode == "Default Prompt":
            print(f"[Info] CR Prompt Scheduler: Scheduler {schedule_alias} is disabled")
            return (default_prompt, default_prompt, 1.0, show_help, )

        if mode == "Keyframe List":
            if keyframe_list == "":
                print(f"[Error] CR Prompt Scheduler: No keyframe list found.")
                return ()
            else:
                lines = keyframe_list.split('\n')
                for line in lines:
                    # If deforum, convert to CR format
                    if schedule_format == "Deforum":
                        line = line.replace(":", ",")
                        line = line.rstrip(',')
                        line = line.lstrip()
                    # Strip empty lines
                    if not line.strip():
                        print(f"[Warning] CR Simple Prompt Scheduler. Skipped blank line at line {i}")
                        continue
                    schedule_lines.extend([(schedule_alias, line)])
                schedule = schedule_lines
        
        if mode == "Schedule":
            if schedule is None:
                print(f"[Error] CR Prompt Scheduler: No schedule found.")
                return ()
            # If deforum, convert to CR format   
            if schedule_format == "Deforum":
                for item in schedule:
                    alias, line = item
                    line = line.replace(":", ",")
                    line = line.rstrip(',')
                    schedule_lines.extend([(schedule_alias, line)])
                schedule = schedule_lines               
        
        current_prompt, next_prompt, current_keyframe, next_keyframe = prompt_scheduler(schedule, schedule_alias, current_frame)

        if current_prompt == "":
            print(f"[Warning] CR Simple Prompt Scheduler. No prompt found for frame. Schedules should start at frame 0.")
        else:        
            try:
                current_prompt_out = prepend_text + ", " + str(current_prompt) + ", " + append_text
                next_prompt_out = prepend_text + ", " + str(next_prompt) + ", " + append_text
                from_index = int(current_keyframe)
                to_index = int(next_keyframe)
            except ValueError:
                print(f"[Warning] CR Simple Text Scheduler. Invalid keyframe at frame {current_frame}")
              
        if from_index == to_index or interpolate_prompt == "No":
            weight_out = 1.0
        else:
            weight_out = (to_index - current_frame) / (to_index - from_index)        

        #if pingpong_keyframes == "Yes":
        #    temp = current_prompt_out
        #    current_prompt_out = next_prompt_out
        #    next_prompt_out = temp
        #    weight_out = 1 - weight_out
                
        return (current_prompt_out, next_prompt_out, weight_out, show_help, ) 

```
