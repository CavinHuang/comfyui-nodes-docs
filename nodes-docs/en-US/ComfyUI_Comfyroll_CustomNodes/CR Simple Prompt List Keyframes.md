---
tags:
- AnimationScheduling
- Scheduling
---

# CR Simple Prompt List Keyframes (Legacy)
## Documentation
- Class name: `CR Simple Prompt List Keyframes`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to generate a sequence of keyframes based on a list of simple prompts, intervals, and other animation parameters. It facilitates the creation of animated sequences by specifying how each prompt transitions over time, making it a crucial component for crafting dynamic visual narratives.
## Input types
### Required
- **`simple_prompt_list`**
    - A list of simple text prompts that describe each keyframe. This list is the foundation for generating the animated sequence, dictating the content and order of the animation.
    - Comfy dtype: `SIMPLE_PROMPT_LIST`
    - Python dtype: `List[str]`
- **`keyframe_interval`**
    - Specifies the interval between each keyframe in the animation, determining the pacing and length of the animated sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - Defines the number of times the animation sequence should loop, allowing for repeated cycles of the keyframe list.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`transition_type`**
    - Determines the type of transition between keyframes, affecting the animation's visual flow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`transition_speed`**
    - Controls the speed of transitions between keyframes, influencing the animation's tempo.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`transition_profile`**
    - Shapes the acceleration and deceleration of transitions, adding dynamism to the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`keyframe_format`**
    - Specifies the format for the keyframes, influencing how they are interpreted and rendered in the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`keyframe_list`**
    - Comfy dtype: `STRING`
    - The generated sequence of keyframes, ready for use in creating the animated sequence.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to documentation or help related to this node, providing additional information and guidance.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SimplePromptListKeyframes:
    @classmethod
    def INPUT_TYPES(s):
    
        #transition_types = ["Morph", "Dissolve", "Cross-Fade", "Jump Cut"]
        transition_types = ["Default"]
        #transition_speeds = ["Slow", "Medium", "Fast", "Custom"]
        transition_speeds = ["Default"]
        #transition_profiles = ["Sin Wave", "Sawtooth", "Custom"]
        transition_profiles = ["Default"]
        
        return {"required": {"simple_prompt_list": ("SIMPLE_PROMPT_LIST",),
                            "keyframe_interval": ("INT", {"default": 30, "min": 0, "max": 999, "step": 1,}),
                            "loops": ("INT", {"default": 1, "min": 1, "max": 1000}),
                            "transition_type": (transition_types,),
                            "transition_speed": (transition_speeds,),
                            "transition_profile": (transition_profiles,),
                            "keyframe_format": (["Deforum"],),
                },         
        }
    
    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("keyframe_list", "show_help", )
    FUNCTION = "make_keyframes"

    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def make_keyframes(self, simple_prompt_list, keyframe_interval, loops, transition_type, transition_speed, transition_profile, keyframe_format, ):
    
        keyframe_format = "Deforum"
        keyframe_list = list()
        
        #print(f"[TEST] CR Prompt List Keyframes: {prompt_list}") 
        
        # example output "\"1\": \"1girl, solo, long red hair\"",
        
        i = 0

        for j in range(1, loops + 1): 
            for index, prompt in enumerate(simple_prompt_list):
                if i == 0:
                    keyframe_list.extend(["\"0\": \"" + prompt + "\",\n"])
                    i+=keyframe_interval  
                    continue
                
                new_keyframe = "\"" + str(i) + "\": \"" + prompt + "\",\n"
                keyframe_list.extend([new_keyframe])
                i+=keyframe_interval 
        
        keyframes_out = " ".join(keyframe_list)[:-2]
              
        #print(f"[TEST] CR Simple Prompt List Keyframes: {keyframes_out}")   
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-simple-prompt-list-keyframes"

        return (keyframes_out, show_help, )

```
