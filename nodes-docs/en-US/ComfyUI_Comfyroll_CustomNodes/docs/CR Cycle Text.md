---
tags:
- Text
---

# CR Cycle Text (Legacy)
## Documentation
- Class name: `CR Cycle Text`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

The CR Cycle Text node is designed to cycle through a list of text strings based on a specified mode, frame interval, and number of loops. It dynamically selects and outputs text strings for animation or display purposes, allowing for sequential or custom cycling patterns.
## Input types
### Required
- **`mode`**
    - Specifies the cycling mode, such as 'Sequential', which determines how text strings are selected and cycled through during execution.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text_list`**
    - A list of text strings to be cycled through. This list forms the basis of the cycling operation, with each string potentially being displayed or used in sequence or according to the specified mode.
    - Comfy dtype: `TEXT_LIST`
    - Python dtype: `List[str]`
- **`frame_interval`**
    - The interval between frames, used to calculate the current text string to display based on the current frame. This parameter influences the pace at which text strings are cycled through.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - The number of times the text list is looped through. This affects the total duration of the cycling operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The current frame number, used in conjunction with the frame interval to determine the current text string to display.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The currently selected text string based on the cycling mode, frame interval, and current frame.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the CR Cycle Text node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CycleText:

    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["Sequential"]
    
        return {"required": {"mode": (modes,),
                             "text_list": ("TEXT_LIST",),
                             "frame_interval": ("INT", {"default": 30, "min": 0, "max": 999, "step": 1,}),         
                             "loops": ("INT", {"default": 1, "min": 1, "max": 1000}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                },
        }
    
    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "cycle_text"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def cycle_text(self, mode, text_list, frame_interval, loops, current_frame,):
        
        # Initialize the list
        text_params = list()

        # Extend text_params with text_list items
        if text_list:
            for _ in range(loops):
                text_params.extend(text_list)
            #print(f"[Debug] CR Cycle Text:{text_params}")

        if mode == "Sequential":
            # Calculate the index of the current text string based on the current_frame and frame_interval
            current_text_index = (current_frame // frame_interval) % len(text_params)
            #print(f"[Debug] CR Cycle Text:{current_text_index}")

            # Get the parameters of the current text            
            current_text_params = text_params[current_text_index]
            print(f"[Debug] CR Cycle Text:{current_text_params}")
            text_alias, current_text_item = current_text_params            
            #print(f"[Debug] CR Cycle Text:{current_text_item}")
            
            show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-text"

            return (current_text_item, show_help, )

```
