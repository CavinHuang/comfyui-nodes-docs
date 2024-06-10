---
tags:
- Animation
- Image
---

# CR Cycle Images Simple (Legacy)
## Documentation
- Class name: `CR Cycle Images Simple`
- Category: `🧩 Comfyroll Studio/🎥 Animation/💀 Legacy`
- Output node: `False`

This node is designed to cycle through a simple list of images in a sequential manner, based on the current frame and a specified frame interval. It allows for the creation of simple animations by iterating over a collection of images a specified number of times (loops).
## Input types
### Required
- **`mode`**
    - Specifies the cycling mode, which determines how images are cycled through. For this node, 'Sequential' mode is used to cycle images in order.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`frame_interval`**
    - Defines the number of frames to wait before transitioning to the next image in the sequence, allowing control over the animation speed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - Determines how many times the list of images will be cycled through, enabling repeated animations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`current_frame`**
    - Indicates the current frame number in the animation sequence, used to calculate which image to display.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image_1`**
    - The first image in the sequence to be cycled through.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_2`**
    - The second image in the sequence to be cycled through.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_3`**
    - The third image in the sequence to be cycled through.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_4`**
    - The fourth image in the sequence to be cycled through.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_5`**
    - The fifth image in the sequence to be cycled through.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_list_simple`**
    - An optional list of images to be cycled through, providing an alternative or additional set of images for the animation.
    - Comfy dtype: `IMAGE_LIST_SIMPLE`
    - Python dtype: `list`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The image to be displayed at the current frame of the animation.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and information about the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_CycleImagesSimple:

    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["Sequential"]
    
        return {"required": {"mode": (modes,),
                             "frame_interval": ("INT", {"default": 30, "min": 0, "max": 999, "step": 1,}),         
                             "loops": ("INT", {"default": 1, "min": 1, "max": 1000}),
                             "current_frame": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,})
                },
                "optional": {"image_1": ("IMAGE",),
                             "image_2": ("IMAGE",),
                             "image_3": ("IMAGE",),
                             "image_4": ("IMAGE",),              
                             "image_5": ("IMAGE",),
                             "image_list_simple": ("IMAGE_LIST_SIMPLE",)
                }                                           
        }
    
    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "cycle_image"
    CATEGORY = icons.get("Comfyroll/Animation/Legacy")

    def cycle_image(self, mode, frame_interval, loops, current_frame,
        image_1=None, image_2=None, image_3=None, image_4=None, image_5=None,
        image_list_simple=None ):
        
        # Initialize the list
        image_params = list()
        
        image_list = list()
        if image_1 != None:        
            image_list.append(image_1),
        if image_2 != None: 
            image_list.append(image_2),
        if image_3 != None: 
            image_list.append(image_3),
        if image_4 != None: 
            image_list.append(image_4),
        if image_5 != None: 
            image_list.append(image_5),
        
        # Extend image_params with image items
        for _ in range(loops):
            if image_list_simple:
                image_params.extend(image_list_simple)
            image_params.extend(image_list)     

        if mode == "Sequential":
            # Calculate the index of the current image string based on the current_frame and frame_interval
            current_image_index = (current_frame // frame_interval) % len(image_params)
            print(f"[Debug] CR Cycle Text:{current_image_index}")

            # Get the parameters of the current image            
            current_image_item = image_params[current_image_index]          
            show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Cycler-Nodes#cr-cycle-images-simple"
            return (current_image_item, show_help, )

```
