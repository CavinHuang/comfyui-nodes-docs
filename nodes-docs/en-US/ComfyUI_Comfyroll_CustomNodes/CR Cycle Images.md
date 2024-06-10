---
tags:
- Animation
- Image
---

# CR Cycle Images (Legacy)
## Documentation
- Class name: `CR Cycle Images`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to cycle through a sequence of images based on specified parameters, allowing for the creation of animations or slideshows. It supports looping through the images multiple times and selecting images in a sequential order, providing a dynamic visual experience.
## Input types
### Required
- **`mode`**
    - Specifies the cycling mode, which determines how images are selected during the animation. 'Sequential' mode cycles through images in the order they are provided.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image_list`**
    - A list of images to be cycled through. Each item in the list represents an image and its associated parameters, enabling complex animations.
    - Comfy dtype: `IMAGE_LIST`
    - Python dtype: `List[Tuple[str, Any]]`
- **`frame_interval`**
    - The interval between frames, which controls the speed of the animation. A lower value results in a faster animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - Determines how many times the sequence of images is repeated, allowing for continuous animations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - The current frame number in the animation sequence. It is used to calculate which image to display at any given time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The current image to be displayed based on the cycling logic. It changes over time as the animation progresses.
    - Python dtype: `Any`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CycleImages:

    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["Sequential"]
    
        return {"required": {"mode": (modes,),
                             "image_list": ("IMAGE_LIST",),
                             "frame_interval": ("INT", {"default": 30, "min": 0, "max": 999, "step": 1,}),         
                             "loops": ("INT", {"default": 1, "min": 1, "max": 1000}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                },
        }
    
    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "cycle"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def cycle(self, mode, image_list, frame_interval, loops, current_frame,):
    
        # Initialize the list
        image_params = list()

        # Extend image_params with image_list items
        if image_list:
            for _ in range(loops):
                image_params.extend(image_list)

        if mode == "Sequential":
            # Calculate the index of the current image string based on the current_frame and frame_interval
            current_image_index = (current_frame // frame_interval) % len(image_params)
            print(f"[Debug] CR Cycle Image:{current_image_index}")

            # Get the parameters of the current image            
            current_image_params = image_params[current_image_index]
            image_alias, current_image_item = current_image_params            
            
            show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-images"

            return (current_image_item, show_help, ) 

```
