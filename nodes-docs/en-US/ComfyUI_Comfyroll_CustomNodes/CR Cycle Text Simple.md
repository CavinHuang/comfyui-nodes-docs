---
tags:
- Text
---

# CR Cycle Text Simple (Legacy)
## Documentation
- Class name: `CR Cycle Text Simple`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to cycle through a list of text strings in a specified mode, allowing for dynamic text animation within a sequence. It supports sequential cycling through texts based on frame intervals and loop counts, making it suitable for creating text-based animations or dynamic text displays in various applications.
## Input types
### Required
- **`mode`**
    - Specifies the cycling mode, which determines how the text strings are cycled through. The mode 'Sequential' is supported, enabling the texts to be displayed one after another in order.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`frame_interval`**
    - The interval, in frames, between each text change. This parameter controls the speed of the text cycling animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - The number of times the entire text list is repeated. This affects the total duration of the text cycling animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The current frame number in the animation sequence. It is used to determine which text string should be displayed based on the frame interval and loops.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`text_1`**
    - The first text string to be included in the cycling animation. If empty, it will be skipped.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_2`**
    - The second text string to be included in the cycling animation. If empty, it will be skipped.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_3`**
    - The third text string to be included in the cycling animation. If empty, it will be skipped.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_4`**
    - The fourth text string to be included in the cycling animation. If empty, it will be skipped.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_5`**
    - The fifth text string to be included in the cycling animation. If empty, it will be skipped.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_list_simple`**
    - An optional list of text strings to be included in the cycling animation, in addition to the individual text inputs.
    - Comfy dtype: `TEXT_LIST_SIMPLE`
    - Python dtype: `List[str]`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The text string that is currently selected to be displayed based on the mode, frame interval, loops, and current frame.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the CR Cycle Text Simple node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CycleTextSimple:

    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["Sequential"]
    
        return {"required": {"mode": (modes,),
                             "frame_interval": ("INT", {"default": 30, "min": 0, "max": 999, "step": 1,}),         
                             "loops": ("INT", {"default": 1, "min": 1, "max": 1000}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                },
                "optional": {"text_1": ("STRING", {"multiline": False, "default": ""}),
                             "text_2": ("STRING", {"multiline": False, "default": ""}),
                             "text_3": ("STRING", {"multiline": False, "default": ""}),
                             "text_4": ("STRING", {"multiline": False, "default": ""}),               
                             "text_5": ("STRING", {"multiline": False, "default": ""}),
                             "text_list_simple": ("TEXT_LIST_SIMPLE",),
                },                                           
        }
    
    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "cycle_text"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def cycle_text(self, mode, frame_interval, loops, current_frame,
        text_1, text_2, text_3, text_4, text_5,
        text_list_simple=None ):
        
        # Initialize the list
        text_params = list()
        
        text_list = list() 
        if text_1 != "":
            text_list.append(text_1)
        if text_2 != "":     
            text_list.append(text_2)
        if text_3 != "":             
            text_list.append(text_3)
        if text_4 != "":             
            text_list.append(text_4)
        if text_5 != "": 
            text_list.append(text_5)
        
        # Extend text_params with text items
        for _ in range(loops):
            if text_list_simple:
                text_params.extend(text_list_simple)
            text_params.extend(text_list)     
        #print(f"[Debug] CR Cycle Text:{len(text_params)}")
        #print(f"[Debug] CR Cycle Text:{text_params}")
        
        if mode == "Sequential":
            # Calculate the index of the current text string based on the current_frame and frame_interval
            current_text_index = (current_frame // frame_interval) % len(text_params)
            #print(f"[Debug] CR Cycle Text:{current_text_index}")

            # Get the parameters of the current text            
            current_text_item = text_params[current_text_index]          
            #print(f"[Debug] CR Cycle Text
            show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-text-simple"

            return (current_text_item, show_help, )

```
