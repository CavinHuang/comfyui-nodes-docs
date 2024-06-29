---
tags:
- AnimationScheduling
- Scheduling
---

# CR Prompt List Keyframes (Legacy)
## Documentation
- Class name: `CR Prompt List Keyframes`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to generate a list of keyframes based on a given list of prompts, each associated with specific animation parameters such as transition type, speed, and profile. It aims to facilitate the creation of detailed animation sequences by converting textual prompts into structured keyframe data.
## Input types
### Required
- **`prompt_list`**
    - A list of tuples, each containing a prompt and its associated animation parameters. This list is essential for generating the keyframe list, as it dictates the content and timing of each keyframe in the animation sequence.
    - Comfy dtype: `PROMPT_LIST`
    - Python dtype: `List[Tuple[str, str, int, str, int, int]]`
- **`keyframe_format`**
    - Specifies the format in which the keyframes are to be generated, influencing the structure and compatibility of the output with different animation tools.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`keyframe_list`**
    - Comfy dtype: `STRING`
    - The generated list of keyframes, structured according to the specified format, ready for use in animation sequences.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on how to use the node effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_PromptListKeyframes:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"prompt_list": ("PROMPT_LIST",),
                "keyframe_format": (["Deforum"],),
                }         
        }
    
    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("keyframe_list", "show_help", )
    FUNCTION = "make_keyframes"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def make_keyframes(self, prompt_list, keyframe_format):
    
        keyframe_format = "Deforum"
        keyframe_list = list()
        
        #print(f"[TEST] CR Animation Stack Keyframes: {prompt_list}") 
        
        # example output "\"0\": \"1girl, solo, long grey hair, grey eyes, black sweater, dancing\"",
        
        i = 0
            
        for index, prompt_tuple in enumerate(prompt_list):
            prompt, transition_type, transition_speed, transition_profile, keyframe_interval, loops = prompt_tuple
            
            # 1st frame
            if i == 0:
                keyframe_list.extend(["\"0\": \"" + prompt + "\",\n"])
                i+=keyframe_interval  
                continue
                
            new_keyframe = "\"" + str(i) + "\": \"" + prompt + "\",\n"
            keyframe_list.extend([new_keyframe])
            i+=keyframe_interval 
        
        keyframes_out = "".join(keyframe_list)[:-2]
        
        #print(f"[TEST] CR Prompt List Keyframes: {keyframes_out}")   
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-prompt-list-keyframes"

        return (keyframes_out, show_help, )

```
